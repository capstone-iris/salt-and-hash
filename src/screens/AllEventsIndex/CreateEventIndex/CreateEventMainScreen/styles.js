import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	inputContainer: {
		padding: 10,
	},
	textInput: {
		borderColor: '#CCCCCC',
		borderWidth: 1,
		// borderTopWidth: 1,
		// borderBottomWidth: 1,
		height: 40,
		fontSize: 18,
		paddingLeft: 10,
		paddingRight: 10,
		margin: 5,
	},
	text: {
		fontSize: 18,
		color: 'grey',
	},
	preferences: {
		fontWeight: 'bold',
		fontSize: 20,
		margin: 5,
	},
	title: {
		fontSize: 35,
		padding: 5,
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
