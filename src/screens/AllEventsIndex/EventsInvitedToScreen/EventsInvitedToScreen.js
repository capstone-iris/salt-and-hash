import React, { useState, useEffect } from 'react';
import {
	Text,
	SafeAreaView,
	TouchableOpacity,
	View,
	ScrollView,
	ImageBackground
} from 'react-native';
import styles from './styles';
// import RestaurantSwipeScreen from '../../RestaurantsIndex/RestaurantSwipeScreen/RestaurantSwipeScreen';
// import { useNavigation } from '@react-navigation/native';
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
			const userData = await firebase
				.firestore()
				.collection('users')
				.where('id', '==', currentUser)
				.get();
			userData.docs.forEach((doc) => {
				userResult = doc.data();
			});

			firebase
				.firestore()
				.collection('eventGuests')
				.doc(userResult.phoneNumber)
				.collection('eventsInvitedTo')
				.onSnapshot(async (guestsData) => {
					// reset guestResult on each snapshot to void duplication
					// only need the snapshot on the guestData to see if new numbers where add
					let guestsResult = [];
					guestsData.docs.forEach((doc) => {
						guestsResult.push(doc.data());
					});
					let eventsResult = [];

					for (let i = 0; i < guestsResult.length; i++) {
						const event = guestsResult[i];
						const eventsInvitedTo = await firebase
							.firestore()
							.collection('events')
							.where('docId', '==', event.eventId)
							.get();
						eventsInvitedTo.docs.forEach((doc) => {
							eventsResult.push(doc.data());
						});
						this.setState({ eventsData: eventsResult });
					}
				});
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
							<Text style={styles.text}>
								You haven't been invited to any events yet.{' '}
							</Text>
						</View>
					</View>
				) : (
					<View style={styles.secondContainer}>
						<Text style={styles.txtHeader}>Events you're attending: </Text>
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
}
