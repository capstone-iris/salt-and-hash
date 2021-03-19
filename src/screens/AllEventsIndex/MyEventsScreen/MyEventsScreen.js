import React from "react";
import { Text, SafeAreaView } from 'react-native';
import styles from './styles'

export default function ProfileScreen({navigation}){

return (
    <SafeAreaView style={styles.container}>
        <Text>
        {'\n'}
        My Events Screen<br />
        Link to Events Hosted Screen | Link to Events Invited To Screen
        </Text>
  </SafeAreaView>
  );
}



