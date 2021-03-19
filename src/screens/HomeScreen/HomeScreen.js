import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';
import RestaurantsIndex from '../RestaurantsIndex/RestaurantsIndex';
import ProfileScreen from '../ProfileScreen/ProfileScreen';
import AllEventsIndex from '../AllEventsIndex/AllEventsIndex'

const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
  return (
    <Tab.Navigator tabBarOptions={{
      showIcon: true,
      activeTintColor: '#a46950',
      activeBackgroundColor: '#eee1db',
      inactiveTintColor: '#999999',
      inactiveBackgroundColor: '#eee1db',
          style: {
                backgroundColor: '#eee1db',
                paddingBottom: 7,
                paddingTop: 7
          }
   }}>
      <Tab.Screen name="Events" component={AllEventsIndex} options={{tabBarIcon: ({color}) => (<Icon name="calendar-alt" size={20} color={color} />)}}/>
      <Tab.Screen name="Restaurants" component={RestaurantsIndex} options={{tabBarIcon: ({color}) => (<Icon name="utensils" size={20} color={color} />)}}/>
      <Tab.Screen name="Profile" component={ProfileScreen} options={{tabBarIcon: ({color}) => (<Icon name="user-circle" size={20} color={color} />)}}/>
    </Tab.Navigator>
  );
}

export default function HomeScreen() {

    return (
        <BottomTabNavigator>
        </BottomTabNavigator>
    )
}