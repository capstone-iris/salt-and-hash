import React from 'react';
import { Text, SafeAreaView, TouchableOpacity } from 'react-native';

import styles from './styles'
import RestaurantSwipeScreen from '../../RestaurantsIndex/RestaurantSwipeScreen/RestaurantSwipeScreen'
import { useNavigation } from '@react-navigation/native';

export default function EventsInvitedToScreen(){
  const navigation = useNavigation();
return (
    <SafeAreaView style={styles.container}>
        <Text>
        {'\n'}
        Events Invited To Screen
        {'\n'}
        </Text>

        <Text onPress={() => navigation.navigate('Restaurant Swipe')}>VOTE RESTAURANTS</Text>

    </SafeAreaView>
  );

}
