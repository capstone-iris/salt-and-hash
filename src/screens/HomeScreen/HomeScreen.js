import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import RestaurantsIndex from '../RestaurantsIndex/RestaurantsIndex';
import ProfileScreen from '../ProfileScreen/ProfileScreen';
import AllEventsIndex from '../AllEventsIndex/AllEventsIndex';

const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
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
				component={ProfileScreen}
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
