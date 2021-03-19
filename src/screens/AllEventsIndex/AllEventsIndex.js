import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MyEventsScreen from './MyEventsScreen/MyEventsScreen'
import EventsHostedScreen from './EventsHostedScreen/EventsHostedScreen'
import EventsInvitedToScreen from './EventsInvitedToScreen/EventsInvitedToScreen'

const EventsBase = createStackNavigator();

export default function AllEventsIndex() {

    return (
        <EventsBase.Navigator initialRouteName={MyEventsScreen} screenOptions={{headerShown: false, animationEnabled: false}}>
            <EventsBase.Screen name='My Events' component={MyEventsScreen} />
            <EventsBase.Screen name='Events Hosted' component={EventsHostedScreen} />
            <EventsBase.Screen name='Events Invited To' component={EventsInvitedToScreen} />
        </EventsBase.Navigator>
    )
}