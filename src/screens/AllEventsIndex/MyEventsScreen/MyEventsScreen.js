// import * as React from 'react';
import React, { useState, useEffect } from 'react';
import { View, useWindowDimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import CreateEventIndex from '../CreateEventIndex/CreateEventIndex';
import EventsHostedScreen from '../EventsHostedScreen/EventsHostedScreen';
import EventsInvitedToScreen from '../EventsInvitedToScreen/EventsInvitedToScreen';
import { firebase } from './../../../firebase/config';
// import styles from './styles';


export default function MyEventsScreen({ navigation }) {
	const layout = useWindowDimensions();
  const [usersData, setUsersData] = useState([]);
	const [invitedEventsData, setInvitedEventsData] = useState([]);

	const [index, setIndex] = useState(0);
	const [routes] = useState([
		{ key: 'create', title: 'CREATE' },
		{ key: 'hosted', title: 'HOST' },
		{ key: 'invited', title: 'ATTEND' },
	]);

	useEffect(()=>{
		if (!firebase.auth().currentUser) {
			return;
		}
		const currentUser = firebase.auth().currentUser.uid;

		// Create subscription to listen for changes
		const unsubscribe = firebase

			.firestore()
			.collection('users')
			.where('id', '==', currentUser)
			.onSnapshot((snapshot) => {
				let result = [];
				snapshot.forEach((doc) => {
					result = doc.data();
				});
				setUsersData(result);
			});
		return () => unsubscribe();
	}, []);

	useEffect(()=>{

			console.log('in eventGuests useEffect..')
			let result = [];
			const guestsRef = firebase
			.firestore()
			.collection('eventGuests')
			.doc(usersData.phoneNumber)
			.collection('eventsInvitedTo')
			.onSnapshot((snapshot) => {
				snapshot.forEach((doc) => {
					result.push(doc.data());
				});
				setInvitedEventsData(result)
				});

	}, [usersData]);


	// console.log('usersData MyEventsScreen ==>', usersData)

  // console.log('invitedEventsData MyEventsScreen ==>', invitedEventsData)
console.log('userData==>', usersData)

	const renderScene = ({ route }) => {
		switch (route.key) {
			case 'create':
				return <CreateEventIndex currentUser={usersData}  />;
			case 'hosted':
				return <EventsHostedScreen currentUser={usersData} />;
			case 'invited':
				return <EventsInvitedToScreen invitedEventsData={invitedEventsData}/>;
			default:
				return null;
		}
	};


	return (
		<TabView
			style={{ marginTop: 20 }}
			navigationState={{ index, routes }}
			renderScene={renderScene}
			onIndexChange={setIndex}
			initialLayout={{ width: layout.width, height: layout.height }}
			renderTabBar={(props) => (
				<TabBar
					{...props}
					style={{ backgroundColor: '#e6a80c', color: '#e95531' }}
					indicatorStyle={{ backgroundColor: '#e95531' }}
				/>
			)}
		/>
	);
}

// import React from 'react';
// import { Text, SafeAreaView } from 'react-native';
// import styles from './styles';

// export default function ProfileScreen({ navigation }) {
// 	return (
// 		<SafeAreaView style={styles.container}>
// 			<Text>
// 				{'\n'}
// 				My Events Screen{'\n'}

// 			</Text>

// 			<View flex={false} row>
//             {tabs.map(tab => this.renderTab(tab))}
// 			</View>

// 			<Text onPress={() => navigation.navigate('Restaurant Swipe')}>
// 			Vote Restuarants {'\n'}
// 			</Text>
// 			<Text onPress={() => navigation.navigate('Create Event Form')}>
// 			Create Event {'\n'}
// 			</Text>

// 			<Text>	Link to Events Hosted Screen | Link to Events Invited To Screen</Text>
// 		</SafeAreaView>
// 	);
// }
