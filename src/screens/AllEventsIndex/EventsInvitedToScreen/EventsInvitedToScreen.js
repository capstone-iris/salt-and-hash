import React, { useState, useEffect } from 'react';
import {
	Text,
	SafeAreaView,
	TouchableOpacity,
	View,
	ScrollView,
} from 'react-native';
import styles from './styles';
import RestaurantSwipeScreen from '../../RestaurantsIndex/RestaurantSwipeScreen/RestaurantSwipeScreen';
import { useNavigation } from '@react-navigation/native';
import { firebase } from './../../../firebase/config';

export default class EventsInvitedToScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			eventsData: [],
		};
		this.fetchData = this.fetchData.bind(this);
	}

	async componentDidMount() {
		await this.fetchData();
	}

	async fetchData() {
		try {
			if (!firebase.auth().currentUser) {
				return;
			}
			const currentUser = await firebase.auth().currentUser.uid;
			let userResult;
			let guestsResult = [];
			let eventsResult = [];

			const userData = await firebase
				.firestore()
				.collection('users')
				.where('id', '==', currentUser)
				.get();
			userData.docs.forEach((doc) => {
				userResult = doc.data();
				console.log('doc.data', doc.data());
			});
			/// making call to FB to get user information for current User
			// .onSnapshot((snapshot) => {
			//   snapshot.forEach((doc) => {
			//     userResult = doc.data();
			//     console.log('inside snapshot', userResult)
			//   })
			//   console.log('inside onsnapshot', userResult)
			// });
			console.log('userResult', userResult);
			//  console.log('userData', userData)
			///taking current Users information (phone number) - finding reference to events user is invited to via the eventGuests collection
			const guestsData = await firebase
				.firestore()
				.collection('eventGuests')
				.doc(userResult.phoneNumber)
				.collection('eventsInvitedTo')
				.get();
			guestsData.docs.forEach((doc) => {
				guestsResult.push(doc.data());
			});
			console.log('guestResult', guestsResult);

			// .onSnapshot((snapshot) => {
			//   snapshot.forEach((doc) => {
			//     guestsResult.push(doc.data());
			//     console.log('guestsResult', guestsResult)
			//   })
			guestsResult.forEach(async (event) => {
				/// taking all of the events from events collection that the user phone Number is associated with/invited to and adding to events Data on state
				const eventsInvitedTo = await firebase
					.firestore()
					.collection('events')
					.where('docId', '==', event.eventId)
					.get();
				eventsInvitedTo.docs.forEach((doc) => {
					eventsResult.push(doc.data());
				});
				console.log('eventsResult1', eventsResult);
				// .onSnapshot((snapshot) => {
				//   snapshot.forEach((doc) => {
				//     eventsResult.push(doc.data());
				//   });
				this.setState({ eventsData: eventsResult });
				console.log('eventsResult2', eventsResult);
			});
			// });
			// });
			// })
		} catch (error) {
			console.log(error);
		}
	}

	render() {
		const { navigation } = this.props;
		return (
			<SafeAreaView style={styles.mainContainer}>
				{this.state.eventsData.length < 1 ? (
					<View style={styles.firstContainer}>
						<View styles={styles.buttonContainer}>
							<Text style={{ color: 'black' }}>
								You haven't been invited to any events yet.{' '}
							</Text>
							<TouchableOpacity style={styles.addEventContainer}>
								<Text
									style={styles.buttonText}
									onPress={() => navigation.navigate('Create Event Index')}
								>
									Create one and invite friends!
								</Text>
							</TouchableOpacity>
						</View>
					</View>
				) : (
					<View style={styles.secondContainer}>
						{/* <Text>Events you have been invited too!</Text> */}
						<ScrollView style={styles.innerContainer}>
							<View style={styles.eventContainer}>
								{this.state.eventsData.map((event, index) => {
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
						</ScrollView>
					</View>
				)}
			</SafeAreaView>
		);
	}
}
