import React from 'react';

import {
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
// import styles from './styles'
import { firebase } from '../../../firebase/config';

const timestamp = firebase.firestore.FieldValue.serverTimestamp();
const currentUser = firebase.auth().currentUser.uid


export default class CreateEventForm extends React.Component {
  
  constructor() {
    super();
    this.eventsRef = firebase.firestore().collection('events');
    this.state = {
      name: '',
      date: '',
      eventStartTime: '',
      description: '',
      votingDeadline: '',
      eventEndTime: '',
      isLoading: false,
    };
  }

  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };

  storeEvent() {
    if (this.state.name === '') {
      alert('Please fill in event name!');
    } else {
      this.setState({
        isLoading: true,
      });
      this.eventsRef
        .add({
          name: this.state.name,
          date: this.state.date,
          eventStartTime: this.state.eventStartTime,
          description: this.state.description,
          votingDeadline: this.state.votingDeadline,
          eventEndTime: this.state.eventEndTime,
          eventCreated: timestamp,
          userId: currentUser
        })
        .then((res) => {
          this.setState({
            name: '',
            date: '',
            eventStartTime: '',
            description: '',
            votingDeadline: '',
            eventEndTime: '',
            isLoading: false,
          });
        
        })
        .catch((e) => {
          console.error('Error found: ', e);
          this.setState({
            isLoading: false,
          });
        });
    }
  }

  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E"/>
        </View>
      )
    }
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.inputContainer}>
            <View>
              <Text style={styles.title}>Create An Event</Text>
            </View>
            <TextInput
              style={styles.textInput}
              placeholder='Event Name'
              maxLength={20}
              value={this.state.name}
              onChangeText={(val) => this.inputValueUpdate(val, 'name')}
            />
            <TextInput
              style={styles.textInput}
              placeholder='Date Dropdown'
              maxLength={20}
              value={this.state.date}
              onChangeText={(val) => this.inputValueUpdate(val, 'date')}
            />
            <View style={styles.eventTime}>
              <TextInput
                style={styles.textInput}
                placeholder='Time'
                maxLength={20}
                value={this.state.eventStartTime}
                onChangeText={(val) =>
                  this.inputValueUpdate(val, 'eventStartTime')
                }
              />
              <TextInput
                style={styles.textInput}
                placeholder='Event End Time'
                maxLength={20}
                value={this.state.eventEndTime}
                onChangeText={(val) =>
                  this.inputValueUpdate(val, 'eventEndTime')
                }
              />
              <TextInput
                style={styles.textInput}
                placeholder='Voting Deadline'
                maxLength={20}
                value={this.state.votingDeadline}
                onChangeText={(val) =>
                  this.inputValueUpdate(val, 'votingDeadline')
                }
              />
            </View>
            <TextInput
              style={styles.textInput}
              placeholder='Restaurant Selections Dropdown'
              maxLength={20}
            />
            <TextInput
              style={styles.textInput}
              multiline={true}
              placeholder='Write a description...'
              maxLength={200}
              height={90}
              value={this.state.description}
              onChangeText={(val) => this.inputValueUpdate(val, 'description')}
            />
            <Text style={styles.preferences}>Optional Preferences</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.storeEvent()}
            >
              <Text style={styles.submitBtn}>Submit</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  inputContainer: {
    padding: 10,
  },
  textInput: {
    borderColor: '#CCCCCC',
    borderWidth: 1,
    // borderTopWidth: 1,
    // borderBottomWidth: 1,
    height: 40,
    fontSize: 18,
    paddingLeft: 10,
    paddingRight: 10,
    margin: 5,
  },
  preferences: {
    fontWeight: 'bold',
    fontSize: 20,
    margin: 5,
  },
  title: {
    fontSize: 35,
    padding: 5,
  },
  button: {
    backgroundColor: '#ddb39d',
    margin: 50,
    marginTop: 20,
    height: 48,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: 250,
  },
  submitBtn: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

