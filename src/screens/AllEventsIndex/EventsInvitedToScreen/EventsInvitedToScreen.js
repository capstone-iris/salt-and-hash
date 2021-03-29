import React, { useState, useEffect } from 'react';
import { Text, SafeAreaView, TouchableOpacity } from 'react-native';
import styles from './styles'
import RestaurantSwipeScreen from '../../RestaurantsIndex/RestaurantSwipeScreen/RestaurantSwipeScreen'
import { useNavigation } from '@react-navigation/native';
import { firebase } from './../../../firebase/config';



export default function EventsInvitedToScreen(){
  const navigation = useNavigation();
  const [usersData, setUsersData] = useState([]);
  const [ guestsData, setGuestsData ] = useState([]);
  const [eventsData, setEventsData] = useState([]);



	useEffect(() => {
		async function fetchUser() {
      if (!firebase.auth().currentUser) {
        return;
      }
      const currentUser = await firebase.auth().currentUser.uid;
			let result = [];

			const usersCollection = firebase.firestore().collection('users');

			usersCollection.get().then((snapshot) => {
				snapshot.docs.forEach((doc) => {
					if (doc.exists === true && doc.data().id !== null) {
          result.push(doc.data())
					}
        });
        result = result.filter((user) => user.id === currentUser)

      console.log('user data', usersData)
				setUsersData(result);
			});

    }
  

    fetchUser();

    async function fetchGuests() {


        const userPhoneNumber = usersData[0].phoneNumber;

      const guestsRef = await firebase
            .firestore()
            .collection('eventGuests')
            .doc('5z56qNBt1Q3WPjQBeskc')              
            .collection('eventGuests')
            .where('phoneNumber', '==', userPhoneNumber)
            .onSnapshot((snapshot) => {
              const result2 = [];
              snapshot.forEach((doc) => {
              result2.push(doc.data());
              });
          
              setGuestsData(result2);
              console.log('guests data', guestsData)
            });
           
    }
    fetchGuests()

    async function fetchEvents() {
  const eventInvitedTo = guestsData[0].eventId

      const eventsRef = await firebase
			.firestore()
			.collection('events')
			.where('docId', '==', eventInvitedTo)
			.onSnapshot((snapshot) => {
			  const result3 = [];
			  snapshot.forEach((doc) => {
				result3.push(doc.data());
			  });
		
        setEventsData(result3);
        console.log('events data', eventsData)
      });
    }
    fetchEvents()

    
  }, []);

  

return (
    <SafeAreaView style={styles.container}>
        <Text>
        {'\n'}
        Events Invited To Screen
        {'\n'}
        </Text>
        {eventsData.map((event, index) => {
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
			
        <Text onPress={() => navigation.navigate('Restaurant Swipe')}>
        {'\n'}{'\n'}VOTE RESTAURANTS</Text>
    </SafeAreaView>
  );
}
