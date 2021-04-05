import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#e95531',
		color: 'black',
	},
	userInfoContainer: {
		backgroundColor: '#e95530',
	},
	userInfoSection: {
		paddingHorizontal: 30,
		marginBottom: 25,
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		color: '#ffffff',
		fontFamily: 'QuicksandBold'
	},
	caption: {
		fontSize: 14,
		lineHeight: 14,
		fontWeight: '500',
	},
	row: {
		flexDirection: 'row',
		marginBottom: 10,
	},
	infoBoxWrapper: {
		// borderBottomColor: '#ffffff',
		// borderBottomWidth: 1,
		// borderTopColor: '#ffffff',
		// borderTopWidth: 1,
		flexDirection: 'row',
		// height: 80,
		backgroundColor: '#e95531',
		justifyContent: 'space-around',
		// flex: 1,
		paddingBottom: -50

	},
	infoBox: {
		width: '50%',
		height: 90,
		alignItems: 'center',
		justifyContent: 'center',
		borderColor: '#e95531',
		borderWidth: 3,
		borderRadius: 8,
		backgroundColor: '#e6a80c',
		margin: 5,
	},
	hr: {
		 borderBottomWidth: 1,
		 borderBottomColor: '#e95531'
	},
	menuWrapper: {
		marginTop:5,
		backgroundColor: '#ffffff',
		height: 340,
		margin: 10,
		borderRadius: 10
	},
	menuItem: {
		flexDirection: 'row',
		paddingVertical: 13,
		paddingHorizontal: 30,
	},
	menuItemText: {
		color: '#656565',
		marginLeft: 20,
		fontWeight: '600',
		fontSize: 16,
		lineHeight: 26,
	},
});
