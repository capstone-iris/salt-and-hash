import React from 'react';
import { Text, SafeAreaView } from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';

export default function ProfileScreen() {
	const navigation = useNavigation();
	return (
		<SafeAreaView style={styles.container}>
			<Text onPress={() => navigation.navigate('Single Event')}>
				{'\n'}
				Events Hosted Screen Link to My Events Screen | Link to Events Invited
				To Screen
			</Text>
		</SafeAreaView>
	);
}
