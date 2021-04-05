import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#ffffff'
	},
	menuItem: {
		flexDirection: 'row',
		paddingVertical: 10,
		paddingHorizontal: 30,
	},
	menuItemText: {
		color: '#656565',
		marginLeft: 10,
		fontWeight: '600',
		fontSize: 16,
		lineHeight: 26,
	},
	restaurantsContainer: {
		flex: 1,
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-around',
		margin: 10,
		marginTop: 20
	},
	indRestaurantContainer: {
		marginBottom: 20
	},
	chosenRestaurantContainer: {
		justifyContent: 'center'
	},
	textContainer: {
		width: 125,
		marginTop: 5,
		marginLeft: 10
	},
	image: {
		height: 100,
		width: 150,
		borderRadius: 15,
	},
	eventNameText: {
		fontSize: 24,
		fontWeight: 'bold',
		color: '#e95530',
		fontFamily: 'PurplePurse',
		margin: 10
	},
	voteText: {
		color: '#656565',
		fontWeight: '600',
		fontSize: 14,
	},
	restaurantTitle: {
		color: '#e6a80c',
		fontWeight: '600',
		fontSize: 14,
	},
});
