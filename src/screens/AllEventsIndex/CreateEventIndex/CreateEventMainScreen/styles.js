import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	container: {
		backgroundColor: '#ffffff',
		flex: 1,
		justifyContent: 'center'
	},
	inputContainer: {
		padding: 10,
	},
	indInputContainer: {
		flexDirection: 'row',
		marginLeft: 10,
		marginRight: 10,
		// marginBottom: 20,
		marginTop: 20,
		color: '#000000',
		alignItems: 'center',
		justifyContent: 'space-between',
		borderWidth: 1,
		borderColor:'#DADADA',
		padding:5,
		width: 320,
		shadowOffset: { width: 5, height: 6 },
  shadowColor: '#DADADA',
  shadowOpacity: .9,
  elevation: 3,
	backgroundColor: '#ffffff'

	},
	dateTimePicker: {
		width: 120,
		// borderWidth: 2
	},
	break1: {
		marginBottom: 20,
		marginTop: 20
	},
	break2: {
		alignContent: 'center',
		justifyContent: 'center',
		alignSelf: 'center'
	},
	break3: {
		marginTop: 10,
		marginBottom: 10
	},
	text: {
		fontSize: 16,
		color: '#656565',
		fontFamily: 'QuicksandBold'
	},
	preferences: {
		fontWeight: 'bold',
		fontSize: 20,
		margin: 5,
	},
	title: {
		padding: 5,
		fontSize: 24,
		fontWeight: 'bold',
		color: '#ffffff',
		fontFamily: 'QuicksandBold',
		// textAlign:'center',
		position: 'absolute',
		bottom: 0,
		marginLeft: 75,
		marginBottom: 5
	},
	createEventHeader:{
		backgroundColor: '#e95530',
		height: 100,
		marginTop: -45

	},
	buttonContainer: {
		justifyContent: 'center',
		alignContent: 'center',
		alignSelf: 'center'
	},
	button: {
		backgroundColor: '#2a9d8f',
		margin: 10,
		marginTop: 20,
		height: 48,
		borderRadius: 5,
		alignItems: 'center',
		justifyContent: 'center',
		width: 275,
	},
	createBtn: {
		fontFamily: 'QuicksandBold',
		color: '#ffffff',
		fontSize: 16,
	},
	preloader: {
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		position: 'absolute',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
