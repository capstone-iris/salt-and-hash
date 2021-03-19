import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AllRestaurantsScreen from './AllRestaurantsScreen/AllRestaurantsScreen'
import SingleRestaurantScreen from './SingleRestaurantScreen/SingleRestaurantScreen'

const RestaurantsBase = createStackNavigator();

export default function AllRestaurantsIndex() {

    return (
        <RestaurantsBase.Navigator initialRouteName={AllRestaurantsScreen} screenOptions={{headerShown: false, animationEnabled: false}}>
            <RestaurantsBase.Screen name='Restaurants' component={AllRestaurantsScreen} />
            <RestaurantsBase.Screen name='Single Restaurant' component={SingleRestaurantScreen} />
        </RestaurantsBase.Navigator>
    )
}