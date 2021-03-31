import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#ffffff',
		color: 'black',
	},
	userInfoContainer: {
		backgroundColor: '#e95530'
	},
	userInfoSection: {
		paddingHorizontal: 30,
		marginBottom: 25
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		color: '#ffffff'
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
		borderBottomColor: '#ffffff',
		borderBottomWidth: 1,
		borderTopColor: '#ffffff',
		borderTopWidth: 1,
		flexDirection: 'row',
		height: 100,
		backgroundColor: '#e6a80c'
	},
	infoBox: {
		width: '50%',
		alignItems: 'center',
		justifyContent: 'center',
		borderRightColor: '#ffffff',
		borderRightWidth: 1,
	},
	hr: {
		 borderBottomWidth: 3,
		 borderBottomColor: '#e95530'
	},
	menuWrapper: {
		marginTop: 10,
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
