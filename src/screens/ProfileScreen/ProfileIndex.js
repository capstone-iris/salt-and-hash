import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import UpdateProfileScreen from '../ProfileScreen/UpdateProfile';
import ProfileScreen from './ProfileScreen'


const UpdateProfileBase = createStackNavigator();

export default function ProfileIndex() {

    return (
        <UpdateProfileBase.Navigator initialRouteName={ProfileScreen} screenOptions={{headerShown: false, animationEnabled: false}}>
            		<UpdateProfileBase.Screen name='Update Profile' component={UpdateProfileScreen} />
				</UpdateProfileBase.Navigator>       
    )
}
