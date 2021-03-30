import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#eee1db',
		color: 'black',
	},
	logo: {
		height: 120,
		width: 90,
		alignSelf: 'center',
		margin: 30,
	},
	input: {
		height: 48,
		borderRadius: 5,
		overflow: 'hidden',
		backgroundColor: 'white',
		marginTop: 10,
		marginBottom: 10,
		marginLeft: 30,
		marginRight: 30,
		paddingLeft: 16,
		width: 250,
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
	footerView: {
		alignItems: 'center',
		marginTop: 10,
	},
	footerText: {
		fontSize: 16,
		color: '#2e2e2d',
	},
	footerLink: {
		color: '#ddb39d',
		fontWeight: 'bold',
		fontSize: 16,
	},
	restaurant: {
		flex: 1,
		alignItems: 'flex-start',
		justifyContent: 'space-evenly',
		backgroundColor: '#eee1db',
		flexDirection: 'row',
	},
	image: {
		height: 120,
		width: 120,
		borderRadius: 10,
		borderWidth: 3,
		borderColor: 'maroon',
	},
	singleBlock: {
		flexDirection: 'column',
		margin: 10,
		marginTop: 30,
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
	inputContainer:{
		alignItems: 'center',
		justifyContent: 'center',

	},
	modalContainer:{
		flex:1,
		// alignItems: 'center',
		// justifyContent: 'center',
	},
	modalView: {
		marginTop: 250,
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
    margin: 20
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

	},
	input: {
		padding: 5,
		textAlign: 'center'
	},
	modalButtonText: {
		fontSize: 16,
		fontWeight: 'bold',
		color: 'white'
	}
});
