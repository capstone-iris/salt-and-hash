import React, { useState, useEffect } from 'react';
import {
	Text,
	SafeAreaView,
	View,
	ScrollView,
	TouchableOpacity,
	Button,
	// Image,
	ImageBackground
} from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { firebase } from './../../../firebase/config';
import { EventSubscriptionVendor } from 'react-native';

let result;

export default function EventsHostedScreen() {
	const navigation = useNavigation();
	const [eventsData, setEventsData] = useState([]);

	useEffect(() => {
		// Check if currentUser exists to avoid errors
		if (!firebase.auth().currentUser) {
			return;
		}

		const currentUser = firebase.auth().currentUser.uid;

		// Create subscription to listen for changes
		const unsubscribe = firebase

			.firestore()
			.collection('events')
			.where('userId', '==', currentUser)
			.onSnapshot((snapshot) => {
				const result = [];
				snapshot.forEach((doc) => {
					result.push(doc.data());
				});

				setEventsData(result);
			});

		// Remove the listener when component unmounts
		return () => unsubscribe();
		// Add currentUser to useEffect dependency array, so useEffect runs when it changes
	}, [firebase.auth().currentUser]);

	return (
		<SafeAreaView style={styles.mainContainer}>


			{eventsData < 1 ?

					(
						<View style={styles.firstContainer}>
							<View styles={styles.buttonContainer}>
								<TouchableOpacity style={styles.button}>
									<Text style={styles.buttonText} onPress={() => navigation.navigate('Create Event Index')}>
										Create An Event
									</Text>
								</TouchableOpacity>
							</View>
						</View>
					)

					:

					(
						<View style={styles.secondContainer}>
							<Text style={styles.txtHeader}>Events you're hosting: </Text>
						<TouchableOpacity style={styles.addEventContainer} onPress={() => navigation.navigate('Create Event Index')}>
							<Text style={styles.createBtnTxt}>Create An Event</Text>
						</TouchableOpacity>

						<ScrollView style={styles.innerContainer}>
						<View style={styles.eventContainer}>
							{eventsData.map((event, index) => {
								return (
									<TouchableOpacity
										style={styles.singleEventContainer}
										key={index}
										onPress={() =>
											navigation.navigate('Single Event', { event })
										}
									>
										<ImageBackground source={{uri: 'https://loremflickr.com/320/240/food'}} style={{width: '100%', height: '100%', flex: 1}}>
										</ImageBackground>
										<Text style={styles.txt}>{event.name.toUpperCase()}</Text>
									</TouchableOpacity>
								);
							})}
						</View>
						</ScrollView>
						</View>
					)}
		</SafeAreaView>
	);
}
