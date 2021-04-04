import React, { Component } from 'react';
import { SafeAreaView, View, Linking } from 'react-native';
import styles from './styles';
import { firebase } from '../../firebase/config';
import {
	Avatar,
	Title,
	Caption,
	Text,
	TouchableRipple,
} from 'react-native-paper';
import { AntDesign, MaterialCommunityIcons, Entypo, MaterialIcons } from '@expo/vector-icons';

export default class ProfileScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			users: [],
			eventsData: []
		};
	}

	async componentDidMount() {
		await this.fetchData()
		this.getUsers();
	}

	getUsers = () => {
		const usersRef = firebase.firestore().collection('users');
		let currentUser = firebase.auth().currentUser.uid;

		usersRef.get().then((snapshot) => {
			snapshot.docs.forEach((doc) => {
				if (currentUser === doc.data().id) this.setState({ users: doc.data() });
			});
		});
	};

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

			await firebase
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

	onSignOut = () => {
		firebase
			.auth()
			.signOut()
			.then(() => {
				console.log('Signed Out');
			})
			.catch((e) => {
				console.error('Sign Out Error', e);
			});
	};

	render() {
		const user = this.state.users;
		const { hostedEventsData } = this.props
		return (
			<SafeAreaView style={styles.container}>
				<View style={styles.userInfoContainer}>
				<View style={styles.userInfoSection}>
					<View
						style={{
							flexDirection: 'row',
							marginTop: 30,
							alignItems: 'center',
						}}
					>
						<MaterialCommunityIcons name='account-circle-outline' color='#ffffff' size={60} />
					
						<View style={{ marginLeft: 20 }}>
							<Title style={styles.title}>{user.fullName}</Title>
						</View>
					</View>
				</View>

				<View style={styles.userInfoSection}>
					<View style={styles.row}>
						<Entypo name='phone' size={20} color='#ffffff' />
						<Text style={{ color: '#ffffff', marginLeft: 20 }}>
							{user.phoneNumber}
						</Text>
					</View>
					<View style={styles.row}>
						<MaterialIcons name='email' size={20} color='#ffffff' />
						<Text style={{ color: '#ffffff', marginLeft: 20 }}>
							{user.email}
						</Text>
					</View>
					</View>
				</View>

				<View style={styles.infoBoxWrapper}>
					<View style={styles.infoBox}>
						<Title style={{color: '#ffffff'}}>{hostedEventsData.length}</Title>
						<Caption style={{color: '#ffffff'}}>Hosted Events</Caption>
					</View>
					<View style={styles.infoBox}>
						<Title style={{color: '#ffffff'}}>{this.state.eventsData.length}</Title>
						<Caption style={{color: '#ffffff'}}>Events Attending</Caption>
					</View>
				</View>

				<View style={styles.hr}></View>

				<View style={styles.menuWrapper}>
					<TouchableRipple onPress={() => {}}>
						<View style={styles.menuItem}>
							<AntDesign name='hearto' color='#e95632' size={25} />
							<Text style={styles.menuItemText}>Your Favorites</Text>
						</View>
					</TouchableRipple>
					<TouchableRipple onPress={() => {Linking.openURL('https://venmo.com/')}}>
						<View style={styles.menuItem}>
							<AntDesign name='creditcard' color='#e95632' size={25} />
							<Text style={styles.menuItemText}>Payment</Text>
						</View>
					</TouchableRipple>
					<TouchableRipple onPress={() => {}}>
						<View style={styles.menuItem}>
							<AntDesign name='bells' color='#e95632' size={25} />
							<Text style={styles.menuItemText}>Notifications</Text>
						</View>
					</TouchableRipple>
					<TouchableRipple onPress={() => {}}>
						<View style={styles.menuItem}>
							<MaterialCommunityIcons name='account-box-outline' color='#e95632' size={25} />
							<Text style={styles.menuItemText}>Support</Text>
						</View>
					</TouchableRipple>
					<TouchableRipple onPress={this.onSignOut}>
						<View style={styles.menuItem}>
							<AntDesign name='logout' color='#e95632' size={25} />
							<Text style={styles.menuItemText}>Sign Out</Text>
						</View>
					</TouchableRipple>
				</View>
			</SafeAreaView>
		);
	}
}
