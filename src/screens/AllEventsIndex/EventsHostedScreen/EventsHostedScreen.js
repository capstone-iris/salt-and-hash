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
		<ScrollView style={{ backgroundColor: '#eee1db' }}>
			<SafeAreaView style={styles.container}>
				<View style={styles.eventsContainer}>
					{eventsData < 1 ? (
						<View styles={{ marginTop: 100 }}>
							<Text style={styles.txt}>You don't have any hosted events. </Text>
							<TouchableOpacity style={styles.button}>
								<Text
									style={styles.Btn}
									onPress={() => navigation.navigate('Create Event Index')}
								>
									Please Create An Event
								</Text>
							</TouchableOpacity>
						</View>
					) : (
						<View
							style={{
								flexDirection: 'row',
								flexWrap: 'wrap',
								marginTop: 80,
								backgroundColor: '#eee1db',
							}}
						>
							<TouchableOpacity
								style={styles.AddEventContainer}
								activeOpacity={0.5}
								onPress={() => navigation.navigate('Create Event Index')}
							>
								<View opacity={5}>
									<Text style={styles.addEvent}>+</Text>
									<Text style={styles.CreateEventText}>Create Event</Text>
								</View>
							</TouchableOpacity>

							{eventsData.map((event, index) => {
								return (
									<TouchableOpacity
										style={styles.singleEventContainer}
										activeOpacity={0.5}
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
					)}
				</View>
			</SafeAreaView>
		</ScrollView>
	);
}

