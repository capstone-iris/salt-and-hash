import React, { useState, useEffect } from 'react';
import {
	Text,
	SafeAreaView,
	View,
	ScrollView,
	TouchableOpacity,
	Button,
} from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { firebase } from './../../../firebase/config';

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
			console.log('eventsData hosted', eventsData)

		// Remove the listener when component unmounts
		return () => unsubscribe();
		// Add currentUser to useEffect dependency array, so useEffect runs when it changes
	}, [firebase.auth().currentUser]);

	return (
		<SafeAreaView style={styles.container}>
		
			
				<View style={styles.eventsContainer}>
					{eventsData < 1 ? 
						
						(
						<View styles={styles.buttonContainer}>
							<TouchableOpacity style={styles.button}>
								<Text style={styles.buttonText} onPress={() => navigation.navigate('Create Event Index')}>
									Create An Event
								</Text>
							</TouchableOpacity>
						</View>
					) 
					
					: 
					
					(
						<ScrollView style={{ backgroundColor: '#ffffff' }}>

						<TouchableOpacity style={styles.addEventContainer} onPress={() => navigation.navigate('Create Event Index')}>
							<Text style={styles.addEvent}>+</Text>
							<Text style={styles.createEventText}>Create An Event</Text>
						</TouchableOpacity>

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
										<Text style={styles.txt}>{event.name}</Text>
									</TouchableOpacity>
								);
							})}
						</View>
						</ScrollView>
					)}
				</View>
			</SafeAreaView>
	);
}

