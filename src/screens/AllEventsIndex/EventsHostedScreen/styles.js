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
		// backgroundColor: '#f4e3b8'
	},
	secondContainer: {
		flex: 1,
		// backgroundColor: '#f4e3b8'
	},
	innerContainer: {
		// backgroundColor: '#f4e3b8'
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
		margin: 10,
		backgroundColor: '#ffffff',
		height: 160,
		width: 150,
		borderRadius: 8,
		borderColor: '#EBEBEB',
		borderWidth: 2,
		justifyContent: 'center',
		overflow: 'hidden',
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
		display: 'flex',
		alignItems: 'center'
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
		fontSize: 18,
		fontWeight: 'bold',
		textAlign: 'center',
		color:  '#E95531',
		margin: 5,
		fontFamily: 'QuicksandBold',
		padding: 3,
		// position: 'absolute',
    // bottom: 0,

	},
	addEvent: {
		textAlign: 'center',
		fontSize: 25,
		color: 'white',
		fontWeight: 'bold',
	},
	addEventContainer: {
		backgroundColor: '#2a9d8f',
		height: 40,
		width: 150,
		borderRadius: 5,
		justifyContent: 'center',
		alignSelf: 'center',
		margin: 10
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
		marginLeft: 15,
		marginRight: 15,
		// backgroundColor: '#f4e3b8',
		justifyContent: 'space-between',
		alignContent: 'center'
	},
	createBtnTxt: {
		fontSize: 14,
		fontWeight: 'bold',
		textAlign: 'center',
		color: 'white',
		margin: 5,
		fontFamily: 'QuicksandBold',
		padding: 3,
	},
	txtHeader: {
		fontSize: 18,
		fontWeight: 'bold',
		textAlign: 'center',
		color: '#E95531',
		marginTop: 10,
		fontFamily: 'QuicksandBold',
		padding: 3,
	}
});
