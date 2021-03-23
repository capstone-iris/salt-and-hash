import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	container: {
		backgroundColor: '#fed8b1',
		flex: 1,
		flexDirection: 'row'
	},
	buttonContainer: {
		justifyContent: 'center'
	},
	restaurantContainer: {
		margin: 25,
	},
	indRestaurantContainer: {
		flex: 1,
		marginBottom: 25,
		backgroundColor: '#fab59e'
	},
	indRestaurantInsideContainer: {
		margin: 10
	},
	restaurantsContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		margin: 10
	},
	restaurantsTextHeader: {
		fontSize: 16,
		fontWeight: 'bold'
	},
	restaurantsText: {
		fontSize: 14
	},
	indRestaurantTextHeader: {
		fontSize: 16,
		fontWeight: 'bold',
	},
	indRestaurantTextBody: {
		fontSize: 15
	},
	activeRestaurantDetailsContainer: {
		marginLeft: 21
	},
	image: {
		height: 120,
		width: 120,
		borderRadius: 10,
		borderWidth: 3,
		borderColor: 'maroon',
	},
	voteContainer: {
		flex: 1,
		flexDirection: 'row'
	}
});
