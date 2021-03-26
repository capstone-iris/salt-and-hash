import * as React from 'react';
import { View, useWindowDimensions, Text, SafeAreaView } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import CreateEventIndex from '../CreateEventIndex/CreateEventIndex';
import EventsHostedScreen from '../EventsHostedScreen/EventsHostedScreen';
import EventsInvitedToScreen from '../EventsInvitedToScreen/EventsInvitedToScreen';
// import styles from './styles';

// const HostedEvents = () => (
// 	<View style={{ flex: 1, backgroundColor: '#ddb39d' }} />
// );

// const SecondRoute = () => (
// 	<View style={{ flex: 1, backgroundColor: '#673ab7' }} />
// );

// const CreateRoute = () => (
// 	<View style={{ flex: 1, backgroundColor: '#673ab7' }} />
// );

export default function MyEventsScreen({ navigation }) {
	const layout = useWindowDimensions();

	const [index, setIndex] = React.useState(0);
	const [routes] = React.useState([
		{ key: 'hosted', title: 'Hosted Events' },
		{ key: 'invited', title: 'Invited Events' },
		{ key: 'create', title: 'Create Event' },
	]);

	const renderScene = SceneMap({
		hosted: EventsHostedScreen,
		invited: EventsInvitedToScreen,
		create: CreateEventIndex,
	});

	return (
		<TabView
			style={{ marginTop: 30 }}
			navigationState={{ index, routes }}
			renderScene={renderScene}
			onIndexChange={setIndex}
			initialLayout={{ width: layout.width, height: layout.height }}
			renderTabBar={(props) => (
				<TabBar
					{...props}
					style={{ backgroundColor: '#eee1db' }}
					indicatorStyle={{ backgroundColor: '#a46950' }}
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
