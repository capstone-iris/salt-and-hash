import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CreateEventMainScreen from './CreateEventMainScreen/CreateEventMainScreen';
import AddRestaurantsToEventScreen from './AddRestaurantsToEventScreen/AddRestaurantsToEventScreen';
import AddGuestsToEventScreen from './AddGuestsToEventScreen/AddGuestsToEventScreen';
import SingleEventScreen from '../SingleEventScreen/SingleEventScreen'

const CreateEventBase = createStackNavigator();

export default function AllEventsIndex() {

    return (
        <CreateEventBase.Navigator initialRouteName={CreateEventMainScreen} screenOptions={{headerShown: false, animationEnabled: false}}>
            <CreateEventBase.Screen name='Create Event' component={CreateEventMainScreen} />
            <CreateEventBase.Screen name='Add Restaurants to Event' component={AddRestaurantsToEventScreen} />
            <CreateEventBase.Screen name='Single Event' component={SingleEventScreen} />
        </CreateEventBase.Navigator>
    )
}
