import React, {useEffect, useState} from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import RestaurantsIndex from '../RestaurantsIndex/RestaurantsIndex';
import ProfileScreen from '../ProfileScreen/ProfileScreen';
import AllEventsIndex from '../AllEventsIndex/AllEventsIndex';
import { useNavigation } from '@react-navigation/native';
import { firebase } from '../../firebase/config'

const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
	// const navigation = useNavigation();
	const [hostedEventsData, setHostedEventsData] = useState([]);
	const [invitedEventsData, setInvitedEventsData] = useState([]);

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

				setHostedEventsData(result);
			});

		// Remove the listener when component unmounts
		return () => unsubscribe();
		// Add currentUser to useEffect dependency array, so useEffect runs when it changes
	}, [firebase.auth().currentUser]);

	useEffect(() => {

	async function fetchData() {
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
				console.log('doc.data', doc.data());
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
					console.log('====result', guestsResult);

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
						setInvitedEventsData({ eventsResult });
						// console.log('eventsResult2', eventsResult);
					}
					console.log('invitedevents state', invitedEventsData)
				});
		} catch (error) {
			console.log(error);
		}
	}
	}, [])


	
	return (
		<Tab.Navigator
			tabBarOptions={{
				showIcon: true,
				activeTintColor: '#e95530',
				activeBackgroundColor: '#ffffff',
				inactiveTintColor: '#656565',
				inactiveBackgroundColor: '#ffffff',
				style: {
					backgroundColor: '#ffffff',
					paddingBottom: 7,
					paddingTop: 7,
				},
			}}
		>
			<Tab.Screen
				name='Events'
				component={AllEventsIndex}
				options={{
					tabBarIcon: ({ color }) => (
						<MaterialIcons name='event' size={20} color={color} />
					),
				}}
			/>
			<Tab.Screen
				name='Restaurants'
				component={RestaurantsIndex}
				options={{
					tabBarIcon: ({ color }) => (
						<MaterialIcons name='restaurant-menu' size={20} color={color} />
					),
				}}
			/>
			<Tab.Screen
				name='Profile'
				children={()=><ProfileScreen hostedEventsData={hostedEventsData} invitedEventsData={invitedEventsData}/>}
				// children={()=><ProfileScreen hostedEventsData={hostedEventsData}/>}

				// component={ProfileScreen}
				options={{
					tabBarIcon: ({ color }) => (
						<FontAwesome name='user' size={20} color={color} />
					),
				}}
			/>
		</Tab.Navigator>
	);
}

export default function HomeScreen() {
	return <BottomTabNavigator></BottomTabNavigator>;
}
