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
		marginBottom: 25,
		backgroundColor: '#fab59e',
	},
	indRestaurantInsideContainer: {
		margin: 10
	},
	restaurantsContainer: {
		alignItems: 'center',
		justifyContent: 'center'
	},
	restaurantsTextHeader: {
		fontSize: 16,
		fontWeight: 'bold'
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
	indRestaurantText: {
		margin: 10,
	},
	image: {
		height: 120,
		width: 120,
		borderRadius: 10,
		borderWidth: 3,
		borderColor: 'maroon',
	},
	button: {
		backgroundColor: '#ddb39d',
		margin: 10,
		marginTop: 20,
		height: 48,
		borderRadius: 5,
		alignItems: 'center',
		justifyContent: 'center',
		width: 250,
	},
	Btn: {
		color: 'white',
		fontSize: 16,
		fontWeight: 'bold',
	}
});
