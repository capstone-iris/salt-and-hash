import React, { useState, useEffect } from 'react';
import { View, useWindowDimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import CreateEventIndex from '../CreateEventIndex/CreateEventIndex';
import EventsHostedScreen from '../EventsHostedScreen/EventsHostedScreen';
import EventsInvitedToScreen from '../EventsInvitedToScreen/EventsInvitedToScreen';
import { firebase } from './../../../firebase/config'

export default function MyEventsScreen({ navigation }) {

	const layout = useWindowDimensions();
	const [usersData, setUsersData] = useState([]);

	const [index, setIndex] = useState(0);
	const [routes] = useState([
		{ key: 'hosted', title: 'HOST' },
		{ key: 'invited', title: 'ATTEND' },
	]);


	useEffect(() => {
		if (!firebase.auth().currentUser) {
			return;
		}
		const currentUser = firebase.auth().currentUser.uid;

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

	const renderScene = ({ route }) => {
		switch (route.key) {
			case 'create':
				return <CreateEventIndex  />;
			case 'hosted':
				return <EventsHostedScreen />;
			case 'invited':
				return <EventsInvitedToScreen navigation={navigation} />;
			default:
				return null;
		}
	};

	return (
		<TabView
			// style={{ marginTop: 20 , backgroundColor: '#e76f51'}}
			navigationState={{ index, routes }}
			renderScene={renderScene}
			onIndexChange={setIndex}
			initialLayout={{ width: layout.width, height: layout.height }}
			renderTabBar={(props) => (
				<TabBar
					{...props}
					style={{ backgroundColor: '#e95531', color: '#FFFFF', paddingTop:40 }}
					indicatorStyle={{ backgroundColor: '#FBF2A0', height:4, borderBottomColor:'#e76f51', borderBottomWidth: 1 }}
					labelStyle={{fontFamily: 'QuicksandBold', fontSize: 16}}
				/>
			)}
		/>
	);
}
