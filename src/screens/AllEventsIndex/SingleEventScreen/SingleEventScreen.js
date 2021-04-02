import React, { useState, useEffect } from 'react';
import styles from './styles';
import {
	SafeAreaView,
	View,
	Image,
	TouchableOpacity,
	ScrollView,
	Button
} from 'react-native';
import { Text, TouchableRipple } from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import * as base from '../../../../secrets.js';
import { firebase } from './../../../firebase/config';
import AddGuestsToEventScreen from '../CreateEventIndex/AddGuestsToEventScreen/AddGuestsToEventScreen.js'
import { Alert } from 'react-native';
import EventsHostedScreen from '../EventsHostedScreen/EventsHostedScreen'

export default function SingleEventScreen({ route }) {
	const { event } = route.params;


	const navigation = useNavigation();
	const [restaurantsData, setRestaurantsData] = useState([]);
	const eventsCollection = firebase.firestore().collection('events');
	const currentUser = firebase.auth().currentUser.uid;

	function convertDateTime(ss, type) {
		console.log('ss +++', ss);
		let date_ob = new Date(ss * 1000);
		let date = ('0' + date_ob.getDate()).slice(-2);
		let year = date_ob.getFullYear();
		let monthNames = [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December',
		];

		let hours = date_ob.getHours();
		let minutes = date_ob.getMinutes();
		let amPm = hours >= 12 ? 'pm' : 'am';
		hours = hours % 12;
		hours = hours ? hours : 12; // the hour '0' should be '12'
		minutes = minutes < 10 ? '0' + minutes : minutes;
		let time = hours + ':' + minutes + ' ' + amPm;

		return type == 'date'
			? monthNames[date_ob.getMonth()] + ' ' + date + ', ' + year
			: time;
	}


	function fetchImage (photoRef)  {
		const ref = photoRef
			const url = 'https://maps.googleapis.com/maps/api/place/photo?';
			const maxWidth = '&maxwidth=600';
			const photoReference = `&photoreference=${ref}`;
			const key = `&key=${base.GOOGLE_PLACES_API}`; //insert key here
			const fetchImageUrl = url + maxWidth + photoReference + key;
			return fetchImageUrl;
		};

	const deleteAlert=()=>
	Alert.alert(
		"Are you sure you want to delete this event?",
		" ",
		[
			{
				text: "Cancel",
				onPress: () => console.log("Cancel Pressed"),
				style: "cancel"
			},
			{ text: "OK", onPress: () => deleteEvent()}
		]
	);

	function deleteEvent(){
		firebase.firestore().collection('events').doc(event.docId).delete()
		navigation.navigate('My Events')

	}



	useEffect(() => {

		// async function fetchData() {
		console.log('in fetch data')
			const unsubscribe = firebase
			.firestore()
			.collection('eventRestaurants')
			.doc(event.docId)
			.collection('eventRestaurants')
			.onSnapshot((snapshot) => {
				const result = [];
				snapshot.forEach((doc) => {
				result.push(doc.data());
			});
			setRestaurantsData(result);
			});
			return () => unsubscribe();
	}, []);


	return (
		<SafeAreaView style={styles.container}>
			<Text style={styles.eventNameText}>{event.name}</Text>
			<View style={(styles.menuWrapper, { marginTop: 20 })}>
				<View>
					<View style={styles.menuItem}>
						<Icon name='calendar-range' color='#FF6347' size={25} />
						<Text style={styles.menuItemText}>
							{convertDateTime(event.date.seconds, 'date')}
						</Text>
					</View>
				</View>
				<View>
					<View style={styles.menuItem}>
						<Icon name='clock-outline' color='#FF6347' size={25} />
						<Text style={styles.menuItemText}>
							{convertDateTime(event.eventStartTime.seconds, 'time')} -{' '}
							{convertDateTime(event.eventEndTime.seconds, 'time')}
						</Text>
					</View>
				</View>
				<View>
					<View style={styles.menuItem}>
						<Icon name='timer-sand' color='#FF6347' size={25} />
						<Text style={styles.menuItemText}>
							Voting Deadline:{' '}
							{convertDateTime(event.votingDeadline.seconds, 'date')}
						</Text>
					</View>
				</View>
				<View>
					<View style={styles.menuItem}>
						<Icon name='information-outline' color='#FF6347' size={25} />
						<Text style={styles.menuItemText}>{event.description}</Text>
					</View>
				</View>
				<TouchableRipple onPress={() => {}}>
					<View style={styles.menuItem}>
						<Icon name='map-marker-radius' color='#FF6347' size={25} />
						<Text style={styles.menuItemText}>Pending...</Text>
					</View>
				</TouchableRipple>

				{currentUser === event.userId ?
				<SafeAreaView>
					<AddGuestsToEventScreen eventId={event.docId}/>
				</SafeAreaView>
				: null
				}

				{currentUser === event.userId ?
					<Button onPress={deleteAlert} title='Delete Event'>
					</Button>
				: null
				}

				<ScrollView>
					<View style={styles.imageContainer}>
						{restaurantsData.map((restaurant, index) => {
							 return (

						<TouchableOpacity
							activeOpacity={0.5}
							key={index}
							onPress={() => navigation.navigate('Restaurant Swipe', {restaurantsData: restaurantsData, eventId:event.docId, navigation: navigation})}
						>
							<Image
								style={styles.image}
								source={{
									uri: fetchImage(restaurant.photo),
								}}
							/>
							<Text>{restaurant.name}</Text>
							<Text>Votes: {restaurant.votes}</Text>
						</TouchableOpacity>
						)})}
					</View>
				</ScrollView>
			</View>
		</SafeAreaView>
	);
}
