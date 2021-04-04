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
	modalContainer:{
		flex:1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	modalView: {
		marginTop: 150,
		marginLeft:20,
		marginRight:20,
		height: 200,
		backgroundColor: "white",
		borderRadius: 10,
		padding: 10,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
		width: 0,
		height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
	},
	centeredView: {
		flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
	backgroundColor: '#ffffff'
	},
	modalForm:{
		// flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    marginTop: 20

	},
	modalButton: {
		flex: 1,
    justifyContent: "center",
    alignItems: "center",
		width:250,
		height:50,
		// marginLeft: 30,
		marginTop: 10,
		padding: 5,
		backgroundColor: '#eb5634'
	},
	modalInput: {
		flex: 1,
    justifyContent: "center",
    alignItems: "center",
		width: 300

	},
	input: {
		padding: 5,
		textAlign: 'center'
	},
	modalButtonText: {
		fontSize: 16,
		fontWeight: 'bold',
		color: 'white'
	},
		dateTimePicker: {
		marginTop: 15
	}
});
