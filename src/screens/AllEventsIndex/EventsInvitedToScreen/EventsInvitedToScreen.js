import React, { useState, useEffect } from 'react';
import { Text, SafeAreaView, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import RestaurantSwipeScreen from '../../RestaurantsIndex/RestaurantSwipeScreen/RestaurantSwipeScreen';
import { useNavigation } from '@react-navigation/native';
import { firebase } from './../../../firebase/config';

export default class EventsInvitedToScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eventsData: [],
    };
   console.log('PROPS', this.props)
    this.fetchData = this.fetchData.bind(this)
  }

 async componentDidMount() {
   await this.fetchData()
  }

  async fetchData() {
      try {
      if (!firebase.auth().currentUser) {
        return;
      }
      const currentUser = await firebase.auth().currentUser.uid;
      let userResult;
      let guestsResult = [];
      let eventsResult = [];
  
      const userData = await firebase
        .firestore()
        .collection('users')
        .where('id', '==', currentUser)
        .onSnapshot((snapshot) => {
          snapshot.forEach((doc) => {
            userResult = doc.data();
          })
            firebase.firestore()
          .collection('eventGuests')
          .doc(userResult.phoneNumber)
          .collection('eventsInvitedTo')
          .onSnapshot((snapshot) => {
            console.log('inguestsdata')
            snapshot.forEach((doc) => {
              guestsResult.push(doc.data());
            })
            console.log('guestsResult', guestsResult)
              guestsResult.forEach(async (event) => {
                     await firebase
                      .firestore()
                      .collection('events')
                      .where('docId', '==', event.eventId)
                      .onSnapshot((snapshot) => {
                        snapshot.forEach((doc) => {
                          eventsResult.push(doc.data());
                        });
                        this.setState({eventsData: eventsResult})

            });
          });
        });
      })
          } catch (error) {
            console.log(error)
      }
    }
 
  render() {
    return (
      <SafeAreaView style={styles.container}>
        {this.state.eventsData.length < 1 ? (
          <View styles={{ marginTop: 100 }}>
            <Text style={styles.txt}>You haven't been invited to any events yet. </Text>
            <TouchableOpacity style={styles.button}>
              <Text
                style={styles.Btn}
                onPress={() => navigation.navigate('Create Event Index')}
                >
                Create one and invite friends!
              </Text>
            </TouchableOpacity>
          </View>
         ) : (
          <View style={styles.container}>
            <Text>
              {'\n'}
              Events Invited To Screen
              {'\n'}
            </Text>
            {this.state.eventsData.map((event, index) => {
              return (
                <TouchableOpacity
                style={styles.singleEventContainer}
                activeOpacity={0.5}
                key={index}
                onPress={() => this.props.navigation.navigate('Single Event', { event })}
                >
                  <Text style={styles.txt}>{event.name}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
         )}
      </SafeAreaView>
    );
  }


 

 