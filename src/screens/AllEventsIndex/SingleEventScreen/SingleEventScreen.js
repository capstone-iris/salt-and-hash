import React, { useState, useEffect } from 'react';
import styles from './styles';
import {
	SafeAreaView,
	View,
	ScrollView,
	Button,
	TouchableOpacity,
	Image,
	ImageBackground
} from 'react-native';
import { Text, TouchableRipple } from 'react-native-paper';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as base from '../../../../secrets.js';
import { firebase } from './../../../firebase/config';
import AddGuestsToEventScreen from '../CreateEventIndex/AddGuestsToEventScreen/AddGuestsToEventScreen.js';
import { Alert } from 'react-native';
import EditEventForm from './EditEventForm'

export default function SingleEventScreen({ route }) {
	const { event } = route.params;

	const navigation = useNavigation();
	const [restaurantsData, setRestaurantsData] = useState([]);
	const [eventsData, setEventsData] = useState(event);
	const eventsCollection = firebase.firestore().collection('events');
	const currentUser = firebase.auth().currentUser.uid;

	function convertDateTime(ss, type) {
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

	function fetchImage(photoRef) {
		const ref = photoRef;
		const url = 'https://maps.googleapis.com/maps/api/place/photo?';
		const maxWidth = '&maxwidth=600';
		const photoReference = `&photoreference=${ref}`;
		const key = `&key=${base.GOOGLE_PLACES_API}`; //insert key here
		const fetchImageUrl = url + maxWidth + photoReference + key;
		return fetchImageUrl;
	}

	const deleteAlert = () =>
		Alert.alert('Are you sure you want to delete this event?', ' ', [
			{
				text: 'Cancel',
				onPress: () => console.log('Cancel Pressed'),
				style: 'cancel',
			},
			{ text: 'OK', onPress: () => deleteEvent() },
		]);

	function deleteEvent() {
		firebase.firestore().collection('events').doc(event.docId).delete();
		navigation.navigate('My Events');
	}

	function isDeadLine(date) {
		const today = new Date();
		const deadline = new Date(date);
		if (today.getTime() > deadline.getTime()) {
			return true;
		}
		return false;
	}

	useEffect(() => {
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

	const maxVotes = restaurantsData.length
		? restaurantsData.reduce((prev, current) =>
				prev.votes > current.votes ? prev : current
		  )
		: {};

		return (
			<SafeAreaView style={styles.container}>
				<Text style={styles.eventNameText}>{event.name.toUpperCase()}</Text>
					<View style={styles.imageContainer}>
							<Image source={{uri: 'https://loremflickr.com/320/240/food'}} style={{width:'100%', height: 220}}/>
					</View>
				<ScrollView>
				<View style={{ marginBottom: 35 , marginTop: 20}}>
					<View>
						<View style={styles.menuItem}>
							<MaterialCommunityIcons
								name='calendar-range'
								color='#FF6347'
								size={25}
							/>
							<Text style={styles.menuItemText}>
								{convertDateTime(event.date.seconds, 'date')}
							</Text>
						</View>
					</View>
					<View>
						<View style={styles.menuItem}>
							<MaterialCommunityIcons
								name='clock-outline'
								color='#FF6347'
								size={25}
							/>
							<Text style={styles.menuItemText}>
								{convertDateTime(event.eventStartTime.seconds, 'time')} -{' '}
								{convertDateTime(event.eventEndTime.seconds, 'time')}
							</Text>
						</View>
					</View>
					<View>
						<View style={styles.menuItem}>
							<MaterialCommunityIcons
								name='timer-sand'
								color='#FF6347'
								size={25}
							/>
							<Text style={styles.menuItemText}>
								Voting Deadline:{' '}
								{convertDateTime(event.votingDeadline.seconds, 'date')}
							</Text>
						</View>
					</View>
					<View>
						<View style={styles.menuItem}>
							<Ionicons name='information-outline' color='#FF6347' size={25} />
							<Text style={styles.menuItemText}>{event.description}</Text>
						</View>
					</View>
					<View>
						<TouchableRipple onPress={() => {}}>
							<View style={styles.menuItem}>
								<MaterialCommunityIcons
									name='map-marker-radius'
									color='#FF6347'
									size={25}
								/>
								<Text style={styles.menuItemText}>
									{isDeadLine(
										convertDateTime(event.votingDeadline.seconds, 'date')
									)
										? maxVotes.name
										: 'Event location is pending...'}
								</Text>
							</View>
						</TouchableRipple>
					</View>
					<View>
						{currentUser === event.userId ? (
							<View style={{ marginTop: 15}}>
								<AddGuestsToEventScreen eventId={event.docId} />
							</View>
						) : null}
					</View>
				</View>
				{isDeadLine(convertDateTime(event.votingDeadline.seconds, 'date'))
				? <View style={styles.chosenRestContainer}>
						<Text style={styles.chosenRestText}> Your chosen restaurant</Text>
					</View>
				:	<View style={{marginTop: -20}}>
						<Text style={styles.menuItemText}>Restaurant Selections:</Text>
					 </View>
				}
				<ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
					<View style={styles.restaurantsContainer}>
							{isDeadLine(
										convertDateTime(event.votingDeadline.seconds, 'date')
									) ?
									<View style={styles.chosenContainer}>

									<View style={styles.chosenRestaurantContainer}>
										<ImageBackground
											style={styles.chosenImage}
											source={{
												uri: fetchImage(maxVotes.photo),
											}}
										>
											<View style={styles.chosenTextContainer}>
												<Text style={styles.restNameText}>{maxVotes.name}</Text>
											</View>

										</ImageBackground>
								</View>
								</View>:
									restaurantsData.map((restaurant, index) => {
								 return (
									<View key={index} style={styles.indRestaurantContainer}>
									<TouchableOpacity
										activeOpacity={0.5}
										key={index}
										onPress={() => navigation.navigate('Restaurant Swipe', {restaurantsData: restaurantsData, eventId:event.docId})}
									>
										<ImageBackground
											style={styles.image}
											source={{
												uri: fetchImage(restaurant.photo),
											}}
										>
										<Text style={styles.voteText}>{restaurant.votes} Votes</Text>
										</ImageBackground>
									</TouchableOpacity>
									<View style={styles.textContainer}>
										<Text style={styles.restaurantTitle}>{restaurant.name}</Text>
									</View>
								</View>
							);
						})}
						</View>
					</ScrollView>
					{currentUser === event.userId ? (
							<View style={{marginTop: -30}}>
								<EditEventForm event={event} convertDateTime={convertDateTime}/>
								<Button onPress={deleteAlert} title='Delete Event'></Button>
							</View>
						) : null}
				</ScrollView>
			</SafeAreaView>
		);
}
