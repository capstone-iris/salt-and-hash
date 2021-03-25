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

import { firebase } from './../../../firebase/config';

export default function SingleEventScreen({route}) {
	const { event } = route.params;
	const navigation = useNavigation();
	const [eventsData, setEventsData] = useState([]);
	const eventsCollection = firebase.firestore().collection('events');

	// useEffect(() => {
	// 	async function fetchData() {
	// 		const currentUser = await firebase.auth().currentUser.uid;

	// 		let data = await eventsCollection.get();
	// 		let result = [];

	// 		data.forEach((element) => {
	// 			if (element.exists == true && element.data().userId != null) {
	// 				if (element.data().userId === currentUser) {
	// 					result.push(element.data());
	// 				}
	// 			}
	// 		});
	// 		setEventsData(result);
	// 		console.log(result);
	// 	}

	// 	fetchData();
	// }, []);

	return (

		<SafeAreaView style={styles.container}>
			<Text style={styles.eventNameText}>
				{event.name}
			</Text>
			<View style={(styles.menuWrapper, { marginTop: 20 })}>
				<View>
					<View style={styles.menuItem}>
						<Icon name='calendar-range' color='#FF6347' size={25} />
						<Text style={styles.menuItemText}>
							{event.date}
						</Text>
					</View>
				</View>
				<View>
					<View style={styles.menuItem}>
						<Icon name='clock-outline' color='#FF6347' size={25} />
						<Text style={styles.menuItemText}>
							{event.eventStartTime } -{' '}
							{event.eventEndTime }
						</Text>
					</View>
				</View>
				<View>
					<View style={styles.menuItem}>
						<Icon name='timer-sand' color='#FF6347' size={25} />
						<Text style={styles.menuItemText}>
							Voting Deadline:{' '}
							{event.votingDeadline }
						</Text>
					</View>
				</View>
				<View>
					<View style={styles.menuItem}>
						<Icon name='information-outline' color='#FF6347' size={25} />
						<Text style={styles.menuItemText}>
							{event.description}
						</Text>
					</View>
				</View>
				<TouchableRipple onPress={() => {}}>
					<View style={styles.menuItem}>
						<Icon name='map-marker-radius' color='#FF6347' size={25} />
						<Text style={styles.menuItemText}>Pending...</Text>
					</View>
				</TouchableRipple>

				<ScrollView>
					<View style={styles.imageContainer}>
						<TouchableOpacity
							activeOpacity={0.5}
							onPress={() => navigation.navigate('Restaurant Swipe')}
						>
							<Image
								style={styles.image}
								source={{
									uri: 'https://picsum.photos/seed/picsum/596/354',
								}}
							/>
						</TouchableOpacity>
						<TouchableOpacity
							activeOpacity={0.5}
							onPress={() => navigation.navigate('Restaurant Swipe')}
						>
							<Image
								style={styles.image}
								source={{
									uri: 'https://picsum.photos/seed/picsum/536/354',
								}}
							/>
						</TouchableOpacity>
						<TouchableOpacity
							activeOpacity={0.5}
							onPress={() => navigation.navigate('Restaurant Swipe')}
						>
							<Image
								style={styles.image}
								source={{
									uri: 'https://picsum.photos/seed/picsum/536/354',
								}}
							/>
						</TouchableOpacity>
						<TouchableOpacity
							activeOpacity={0.5}
							onPress={() => navigation.navigate('Restaurant Swipe')}
						>
							<Image
								style={styles.image}
								source={{
									uri: 'https://picsum.photos/seed/picsum/536/354',
								}}
							/>
						</TouchableOpacity>
						<TouchableOpacity
							activeOpacity={0.5}
							onPress={() => navigation.navigate('Restaurant Swipe')}
						>
							<Image
								style={styles.image}
								source={{
									uri: 'https://picsum.photos/seed/picsum/536/354',
								}}
							/>
						</TouchableOpacity>
						<TouchableOpacity
							activeOpacity={0.5}
							onPress={() => navigation.navigate('Restaurant Swipe')}
						>
							<Image
								style={styles.image}
								source={{
									uri: 'https://picsum.photos/seed/picsum/536/354',
								}}
							/>
						</TouchableOpacity>
						<TouchableOpacity
							activeOpacity={0.5}
							onPress={() => navigation.navigate('Restaurant Swipe')}
						>
							<Image
								style={styles.image}
								source={{
									uri: 'https://picsum.photos/seed/picsum/536/354',
								}}
							/>
						</TouchableOpacity>
						<TouchableOpacity
							activeOpacity={0.5}
							onPress={() => navigation.navigate('Restaurant Swipe')}
						>
							<Image
								style={styles.image}
								source={{
									uri: 'https://picsum.photos/seed/picsum/536/354',
								}}
							/>
						</TouchableOpacity>
						<TouchableOpacity
							activeOpacity={0.5}
							onPress={() => navigation.navigate('Restaurant Swipe')}
						>
							<Image
								style={styles.image}
								source={{
									uri: 'https://picsum.photos/seed/picsum/536/354',
								}}
							/>
						</TouchableOpacity>
						<TouchableOpacity
							activeOpacity={0.5}
							onPress={() => navigation.navigate('Restaurant Swipe')}
						>
							<Image
								style={styles.image}
								source={{
									uri: 'https://picsum.photos/seed/picsum/536/354',
								}}
							/>
						</TouchableOpacity>
						<TouchableOpacity
							activeOpacity={0.5}
							onPress={() => navigation.navigate('Restaurant Swipe')}
						>
							<Image
								style={styles.image}
								source={{
									uri: 'https://picsum.photos/seed/picsum/536/354',
								}}
							/>
						</TouchableOpacity>
					</View>
				</ScrollView>
			</View>
		</SafeAreaView>
	);
}
