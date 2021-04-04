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
<<<<<<< HEAD
		justifyContent: 'center',
		paddingTop: 20,

=======
		justifyContent: 'center'
>>>>>>> 4dd8127fd619fd9263c781d33242f9b2d86f6bdc
	},
});
