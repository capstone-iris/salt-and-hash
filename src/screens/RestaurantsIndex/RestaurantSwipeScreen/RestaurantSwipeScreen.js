import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import CarouselCards from './CarouselCards';

export default function RestaurantSwipeScreen({route}) {
	const { restaurantsData, eventId } = route.params
	console.log('route params', route.params)
		return (
		<SafeAreaView style={styles.container}>
			<CarouselCards restaurantsData={restaurantsData} eventId={eventId}/>
		</SafeAreaView>
	);
}
const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center'
	},
});
