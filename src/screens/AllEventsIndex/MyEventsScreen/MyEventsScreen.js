import React from 'react';
import { Text, SafeAreaView } from 'react-native';
import styles from './styles';

export default function ProfileScreen({ navigation }) {
	return (
		<SafeAreaView style={styles.container}>
			<Text onPress={() => navigation.navigate('Restaurant Swipe')}>
				{'\n'}
				My Events Screen{'\n'}
				Link to Events Hosted Screen | Link to Events Invited To Screen
			</Text>
		</SafeAreaView>
	);
}
