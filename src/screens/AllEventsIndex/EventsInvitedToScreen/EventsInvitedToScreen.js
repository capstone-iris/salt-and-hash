import React, { useState, useEffect } from 'react';
import { Text, SafeAreaView, TouchableOpacity } from 'react-native';
import styles from './styles';
import RestaurantSwipeScreen from '../../RestaurantsIndex/RestaurantSwipeScreen/RestaurantSwipeScreen';
import { useNavigation } from '@react-navigation/native';
import { firebase } from './../../../firebase/config';

export default function EventsInvitedToScreen() {
	const navigation = useNavigation();
	const [usersData, setUsersData] = useState([]);
	const [guestsData, setGuestsData] = useState([]);
	const [eventsData, setEventsData] = useState([]);

	useEffect(() => {
		async function fetchUser() {
			if (!firebase.auth().currentUser) {
				return;
			}
			const currentUser = firebase.auth().currentUser.uid;
			let result = [];

			const unsubscribe = firebase
				.firestore()
				.collection('users')
				.where('id', '==', currentUser)
				.onSnapshot((snapshot) => {
					snapshot.forEach((doc) => {
						result.push(doc.data());
					});
					setUsersData(result);
					console.log('in fetchuser', usersData);
				});
			return () => unsubscribe();
		}
		fetchUser();
	}, []);

	useEffect(() => {
		async function fetchGuests() {
			let result = [];

			const guestsRef = await firebase
				.firestore()
				.collection('eventGuests')
				.doc(usersData[0].phoneNumber)
				.collection('eventsInvitedTo');
			guestsRef.get().then((snapshot) => {
				snapshot.docs.forEach((doc) => {
					result.push(doc.data());
				});
				setGuestsData(result);
				console.log('in fetch guests', guestsData);
			});
		}
		fetchGuests();
	}, []);

	useEffect(() => {
		async function fetchEvents() {
			let result = [];

			guestsData.forEach(async (event) => {
				const eventsRef = await firebase
					.firestore()
					.collection('events')
					.where('docId', '==', event.eventId)
					.onSnapshot((snapshot) => {
						snapshot.forEach((doc) => {
							result.push(doc.data());
						});
					});
			});
			setEventsData(result);
			console.log('in fetchEvents', eventsData);
		}
		fetchEvents();
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
		</SafeAreaView>
	);
}
