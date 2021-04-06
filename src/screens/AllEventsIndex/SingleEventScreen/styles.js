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
		fontFamily:'QuicksandBold'
	},
	restaurantsContainer: {
		flex: 1,
		flexDirection: 'row',
		// flexWrap: 'wrap',
		justifyContent: 'space-around',
		margin: 5,
		height: 200,
		// marginBottom: 5
	},
	indRestaurantContainer: {
		margin: 10,
		marginTop:20,
		// borderWidth:1,


	},
	textContainer: {
		width: 125,
		// marginTop: 5,
		// marginLeft: 10,
		// borderWidth: 2,
		flex: 1,
		justifyContent: 'flex-end'
	},
	restNameText: {
		fontFamily: 'QuicksandBold',
		color: '#ffffff',
		fontSize: 25
	},
	image: {
		height: '100%',
		width: '100%',
		borderRadius: 5,
		overflow: 'hidden',
	},
	eventNameText: {
		fontSize: 24,
		fontWeight: 'bold',
		color: '#e95530',
		fontFamily: 'QuicksandBold',
		textAlign: 'center',
		margin: 10,
	},
	voteText: {
		fontFamily: 'QuicksandBold',
		color: '#FFF',
		fontWeight: '600',
		fontSize: 14,
		position: 'absolute',
    bottom: 0,
		padding: 5
	},
	restaurantTitle: {
		color: '#e6a80c',
		fontWeight: '600',
		fontSize: 14,
		fontFamily: 'QuicksandBold',
		// borderColor: 'black',
		// borderWidth: 1,
		marginBottom: -10
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
	},
	imageContainer:{
		shadowColor: "#000",
		shadowOffset: {
		width: 0,
		height: 4
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
		// marginBottom: 8
	},
	chosenRestaurantHeader: {
		fontFamily: 'QuicksandBold',
		textAlign:'center',
		fontSize: 20,
		backgroundColor: '#e95530',
		color: 'white'
	},
	chosenRestaurantContainer: {

		height: 130,
		width: 250,
		borderRadius: 5,
		overflow: 'hidden',
		marginLeft: 60,
		marginTop: 10,
		// position: 'relative'


	},
	chosenRestaurantText: {
		fontFamily: 'QuicksandBold',
		color: 'white',
		position: 'absolute',
    bottom: 0,
		// padding: 5,
		fontSize: 16
	},
	chosenImage: {
		width: 300,
		height: '100%',
		overflow: 'hidden',

	},
	chosenRestContainer: {
		backgroundColor: '#e95531',
		height: 40,
		flex: 1,
		justifyContent: 'center'
	},
	chosenRestText:{
		fontFamily: 'QuicksandBold',
		color: '#ffffff',
		textAlign: 'center',
		fontSize: 18
	},
});
