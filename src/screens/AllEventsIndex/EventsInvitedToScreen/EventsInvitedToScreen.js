import React from "react";
import { Text, SafeAreaView } from 'react-native';
import styles from './styles'

export default function ProfileScreen({navigation}){

return (
    <SafeAreaView style={styles.container}>
        <Text>
        {'\n'}
        Events Invited To Screen<br />
        Link to My Events Screen | Link to Events Hosted Screen 
        </Text>
  </SafeAreaView>
  );
}



