import React, { useState, useEffect } from 'react';
import { Text, SafeAreaView, TouchableOpacity } from 'react-native';
import styles from './styles';
import RestaurantSwipeScreen from '../../RestaurantsIndex/RestaurantSwipeScreen/RestaurantSwipeScreen';
import { useNavigation } from '@react-navigation/native';
import { firebase } from './../../../firebase/config';

export default function EventsInvitedToScreen(props) {

  const {invitedEventsData} = props
	const navigation = useNavigation();

  const [eventsData, setEventsData] = useState([]);

  console.log('PROPS IN EventsInvitedToScreen==>', props)

useEffect(()=>{

     firebase
      .firestore()
      .collection('events')
      .onSnapshot((snapshot) => {
        let result = [];
        snapshot.forEach((doc) => {
          result.push(doc.data());
        });
        setEventsData(result);
      });

},[])


  const invitedEvents = [];

  for(let i = 0; i < eventsData.length; i++){
    let event = eventsData[i]
    for(let j = 0; j < invitedEventsData.length; j++){
     let invitedEvent = invitedEventsData[j]
     if(event.docId === invitedEvent.eventId){
       invitedEvents.push(event)
     }
    }
  }

  console.log('invitedEvents Array ==> ',invitedEvents)


  return (
    <SafeAreaView style={styles.container}>
      <Text>
        {'\n'}
        Events Invited To Screen
        {'\n'}
      </Text>
      {invitedEvents.map((event, index) => {
        return (
          <TouchableOpacity
            style={styles.singleEventContainer}
            activeOpacity={0.5}
            key={index}
            onPress={() => navigation.navigate('Single Event', { event })}
          >
            <Text style={styles.txt}>{event.name}</Text>
          </TouchableOpacity>
        );
      })}
    </SafeAreaView>
  );
}
