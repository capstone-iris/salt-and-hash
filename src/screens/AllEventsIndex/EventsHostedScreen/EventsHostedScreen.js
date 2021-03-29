import React, { useState, useEffect } from 'react';
import {
	Text,
	SafeAreaView,
	View,
	FlatList,
	TouchableOpacity,
	Button,
} from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { firebase } from './../../../firebase/config';

let result;

export default function ProfileScreen() {
	const navigation = useNavigation();
	const [eventsData, setEventsData] = useState([]);

	// useEffect(() => {
	// 	async function fetchData() {
	// 		const currentUser = await firebase.auth().currentUser.uid;
	// 		result = [];

	// 		const eventsCollection = firebase.firestore().collection('events');

	// 		eventsCollection.get().then((snapshot) => {
	// 			snapshot.docs.forEach((doc) => {
	// 				if (doc.exists === true && doc.data().userId !== null) {
	// 					if (doc.data().userId === currentUser) {
	// 						result.push(doc.data());
	// 					}
	// 				}
	// 				setEventsData(result);
	// 			});
	// 		});
	// 	}
	// 	fetchData();
	// }, []);

	useEffect(() => {
		
			const currentUser = firebase.auth().currentUser.uid;
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

			return () => unsubscribe();
			// Add currentUser to useEffect dependency array, so useEffect runs when it changes
			}, [firebase.auth().currentUser]);
	
	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.eventsContainer}>
				{eventsData < 1 ? (
					<View>
						<Text style={styles.txt}> You don't have any hosted events. </Text>
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
	);
}
