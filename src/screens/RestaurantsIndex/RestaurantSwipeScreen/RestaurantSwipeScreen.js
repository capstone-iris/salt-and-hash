import React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import CarouselCards from './CarouselCards';

export default function RestaurantSwipeScreen({route}) {
	const { restaurantsData, eventId } = route.params
		return (
		<SafeAreaView style={styles.container}>
			<CarouselCards restaurantsData={restaurantsData} eventId={eventId}/>
		</SafeAreaView>
	);
}
const styles = StyleSheet.create({
	container: {
		backgroundColor: '#e95531',
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',

	},
});
