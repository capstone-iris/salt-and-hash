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

		// Remove the listener when component unmounts
		return () => unsubscribe();
		// Add currentUser to useEffect dependency array, so useEffect runs when it changes
	}, [firebase.auth().currentUser]);

	return (
		<ScrollView>
			<SafeAreaView style={styles.container}>
				<View style={styles.eventsContainer}>
					{eventsData < 1 ? (
						<View>
							<Text style={styles.txt}>
								{' '}
								You don't have any hosted events.{' '}
							</Text>
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
						eventsData.map((event, index) => {
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
						})
					)}
				</View>
			</SafeAreaView>
		</ScrollView>
	);
}
