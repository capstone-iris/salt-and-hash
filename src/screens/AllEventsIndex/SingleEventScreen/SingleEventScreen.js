import React, { useState, useEffect } from 'react';
import styles from './styles';
import {
	SafeAreaView,
	View,
	Image,
	TouchableOpacity,
	ScrollView,
} from 'react-native';
import { Text, TouchableRipple } from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import * as base from '../../../../secrets.js';
import { firebase } from './../../../firebase/config';
import AddGuestsToEventScreen from '../CreateEventIndex/AddGuestsToEventScreen/AddGuestsToEventScreen.js'

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

	useEffect(() => {

	async function fetchData() {
		console.log('in fetch data')

			const restaurantData = await firebase
			  .firestore()
			  .collection('eventRestaurants')
			  .doc(event.docId)
			  .collection('eventRestaurants')
			  .get();
			result = [];
			restaurantData.forEach((element) => {
			  result.push(element.data());
			});
			setRestaurantsData(result);

			  };

		  fetchData();
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
				// <Text style={styles.menuItemText}>Invite Friends</Text>

				<SafeAreaView>

					<AddGuestsToEventScreen eventId={event.docId}/>

				</SafeAreaView>
				: null
				}

				<ScrollView>
					<View style={styles.imageContainer}>
						{restaurantsData.map((restaurant, index) => {
							 return (

						<TouchableOpacity
							activeOpacity={0.5}
							key={index}
							onPress={() => navigation.navigate('Restaurant Swipe', {restaurantsData: restaurantsData})}
						>
							<Image
								style={styles.image}
								source={{
									uri: fetchImage(restaurant.photo),
								}}
							/>
							<Text>{restaurant.name}</Text>
						</TouchableOpacity>
						)})}
					<Text>Hello</Text>
					</View>
				</ScrollView>
			</View>
		</SafeAreaView>
	);
}
