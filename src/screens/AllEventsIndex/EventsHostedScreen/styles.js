import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	mainContainer: {
		flex: 1,
		backgroundColor: '#ffffff'
	},
	firstContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#ffffff'
	},
	secondContainer: {
		flex: 1,
		backgroundColor: '#ffffff'
	},
	innerContainer: {
		backgroundColor: '#ffffff'
	},
	button: {
		backgroundColor: '#ddb39d',
		marginLeft: 30,
		marginRight: 30,
		marginTop: 20,
		height: 48,
		borderRadius: 5,
		alignItems: 'center',
		justifyContent: 'center',
		width: 250,
	},
	buttonTitle: {
		color: 'white',
		fontSize: 16,
		fontWeight: 'bold',
	},
	singleEventContainer: {
		margin: 12,
		backgroundColor: '#656565',
		height: 80,
		width: 150,
		borderRadius: 10,
		justifyContent: 'center'
	},
	eventsContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignItems: 'center',
		marginTop: 30,
	},
	restaurantsTextHeader: {
		fontSize: 16,
		fontWeight: 'bold',
	},
	singleEventTextHeader: {
		fontSize: 16,
		fontWeight: 'bold',
	},
	buttonContainer: {
		justifyContent: 'center',
		alignContent: 'center',
		alignSelf: 'center'
	},
	button: {
		backgroundColor: '#e95530',
		height: 48,
		borderRadius: 5,
		alignItems: 'center',
		justifyContent: 'center',
		width: 250,
	},
	buttonText: {
		color: 'white',
		fontSize: 16,
		fontWeight: 'bold',
		textAlign: 'center',
		justifyContent: 'center',
	},
	txt: {
		fontSize: 16,
		fontWeight: 'bold',
		textAlign: 'center',
		color: 'white'
	},
	addEvent: {
		textAlign: 'center',
		fontSize: 25,
		color: 'white',
		fontWeight: 'bold',
	},
	addEventContainer: {
		backgroundColor: '#e95530',
		height: 80,
		width: 150,
		borderRadius: 10,
		justifyContent: 'center',
		alignSelf: 'center',
		marginTop: 20
	},
	createEventText: {
		textAlign: 'center',
		color: 'white',
		fontSize: 16,
		fontWeight: 'bold',
	},
	eventContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		marginTop: 30,
		backgroundColor: '#ffffff',
		justifyContent: 'center',
		alignContent: 'center'
	}
});
