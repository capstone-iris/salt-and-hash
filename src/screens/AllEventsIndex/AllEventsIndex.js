import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MyEventsScreen from './MyEventsScreen/MyEventsScreen'
import EventsHostedScreen from './EventsHostedScreen/EventsHostedScreen'
import EventsInvitedToScreen from './EventsInvitedToScreen/EventsInvitedToScreen'
import RestaurantSwipeScreen from '../RestaurantsIndex/RestaurantSwipeScreen/RestaurantSwipeScreen'
import CreateEventIndex from './CreateEventIndex/CreateEventIndex'
import SingleEventScreen from './SingleEventScreen/SingleEventScreen';
import EditEventForm from './SingleEventScreen/EditEventForm'
import AddRestaurantsToEventScreen from './CreateEventIndex/AddRestaurantsToEventScreen/AddRestaurantsToEventScreen'
import styles from './EventsHostedScreen/styles';

const EventsBase = createStackNavigator();

export default function AllEventsIndex() {


    return (
        <EventsBase.Navigator initialRouteName={MyEventsScreen} screenOptions={{headerShown: false, animationEnabled: false}}>
            <EventsBase.Screen name='My Events' component={MyEventsScreen} />
            <EventsBase.Screen name='Events Hosted' component={EventsHostedScreen} />
            <EventsBase.Screen name='Events Invited To' component={EventsInvitedToScreen} />
      			<EventsBase.Screen name='Single Event' component={SingleEventScreen} />
            <EventsBase.Screen name='Restaurant Swipe' component={RestaurantSwipeScreen} />
            <EventsBase.Screen name='Create Event Index' component={CreateEventIndex} />
            <EventsBase.Screen name='Edit Event Form' component={EditEventForm} />
            <EventsBase.Screen name='Add Restaurants to Event' component={AddRestaurantsToEventScreen} />
        </EventsBase.Navigator>
    )
}


