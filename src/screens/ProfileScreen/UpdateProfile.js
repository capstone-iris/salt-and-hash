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
import { firebase } from '../../firebase/config';


export default class UpdateProfileScreen extends React.Component {
  
  constructor() {
    super();
    const currentUser = firebase.auth().currentUser.uid;
    const user = {};
    this.userRef = firebase.firestore().collection('users')
    this.state = {
        email: '',
        fullName: '',
        phoneNumber: ''
    };
  }


  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };

  async updateUser() {
    // if (this.state.name === '') {
    //   alert('Please fill in event name!');
    // } else {
    //   this.setState({
    //     isLoading: true,
    //   });

    if (!firebase.auth().currentUser) {
        return;
    }
    const currentUser = firebase.auth().currentUser.uid;
    let userResult;
    const userData = await firebase
        .firestore()
        .collection('users').doc(currentUser)
    //     .where('id', '==', currentUser)
    //     .get();
    //     console.log(userData)
    // userData.docs.forEach((doc) => {
    //     userResult = doc.data();
    //     console.log('useresult', userResult)
    // });
    //   userResult
        .update({
          fullName: this.state.fullName,
          email: this.state.email,
          phoneNumber: this.state.phoneNumber
        })
        .then((res) => {
          this.setState({
            fullName: '',
            email: '',
            phoneNumber: ''
          });
        
        })
        .catch((e) => {
          console.error('Error found: ', e);
        });
    }
  

  render() {
    // if(this.state.isLoading){
    //   return(
    //     <View style={styles.preloader}>
    //       <ActivityIndicator size="large" color="#9E9E9E"/>
    //     </View>
    //   )
    // }
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.inputContainer}>
            <View>
              <Text style={styles.title}>Update Info</Text>
            </View>
            <TextInput
              style={styles.textInput}
              placeholder='Full Name'
              maxLength={20}
              value={this.state.fullName}
              onChangeText={(val) => this.inputValueUpdate(val, 'fullName')}
            />
            <TextInput
              style={styles.textInput}
              placeholder='Email'
              maxLength={20}
              value={this.state.email}
              onChangeText={(val) => this.inputValueUpdate(val, 'email')}
            />
            <TextInput
            style={styles.textInput}
            placeholder='Phone Number'
            maxLength={20}
            value={this.state.phoneNumber}
            onChangeText={(val) => this.inputValueUpdate(val, 'phoneNumber')}
          />
            
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.updateUser()}
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

