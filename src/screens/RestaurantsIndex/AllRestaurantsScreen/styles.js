import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	container: {
		backgroundColor: '#ffffff',
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignContent: 'center',
		flexDirection: 'row'
	},
	buttonContainer: {
		justifyContent: 'center'
	},
	restaurantContainer: {
		margin: 25,
		backgroundColor: '#ffffff'
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
		justifyContent: 'center',
		marginTop: 25
	},
	restaurantsTextHeader: {
		fontSize: 16,
		fontWeight: 'bold',
		color: '#e95530'
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
		backgroundColor: '#e95531',
		margin: 10,
		marginTop: 20,
		height: 48,
		borderRadius: 5,
		alignItems: 'center',
		justifyContent: 'center',
		width: 275,
	},
	Btn: {
		color: 'white',
		fontSize: 16,
		fontWeight: 'bold',
	}
});
