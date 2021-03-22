import React from "react";
import { Text, SafeAreaView, TouchableOpacity } from 'react-native';
import styles from './styles'

export default function ProfileScreen({navigation}){

return (
    <SafeAreaView style={styles.container}>
        <Text>
        {'\n'}
        Events Invited To Screen
        Link to My Events Screen | Link to Events Hosted Screen 
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Restaurant Swipe')}>
            <Button>
              Choose 
            </Button>
            </TouchableOpacity>
  </SafeAreaView>
  );
}



