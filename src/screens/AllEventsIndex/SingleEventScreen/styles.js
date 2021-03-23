import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#eee1db',
		color: 'black',
	},
	menuWrapper: {
		marginTop: 10,
	},
	menuItem: {
		flexDirection: 'row',
		paddingVertical: 10,
		paddingHorizontal: 30,
	},
	menuItemText: {
		color: '#777777',
		marginLeft: 10,
		fontWeight: '600',
		fontSize: 16,
		lineHeight: 26,
	},
	imageContainer: {
		flex: 1,
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-around',
		margin: 10,
		marginTop: 20,
		height: 850,
	},
	image: {
		height: 100,
		width: 100,
		marginBottom: 20,
		borderRadius: 15,
	},
	eventNameText: {
		color: 'black',
		fontWeight: '600',
		fontSize: 25,
		textAlign: 'center',
		marginTop: 25,
	},
});
