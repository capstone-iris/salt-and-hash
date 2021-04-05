import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	container: {
		backgroundColor: '#ffffff',
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignContent: 'center'
	},
    buttonContainer: {
        alignItems: 'center',
		justifyContent: 'center',
        alignSelf: 'center'
    },
    button: {
		backgroundColor: '#e95531',
		height: 48,
		borderRadius: 5,
		alignItems: 'center',
		justifyContent: 'center',
		width: 275
    },
    buttonText: {
        color: 'white',
		fontSize: 16,
		fontWeight: 'bold'
    },
    restaurantContainer: {
        margin: 10
    },
    restaurantHeaderContainer: {
        justifyContent: 'flex-start',
        alignContent: 'flex-start',
        alignSelf: 'flex-start'
    },
    restaurantHeaderText: {
        fontSize: 24,
		fontWeight: 'bold',
		color: '#e95530',
		fontFamily: 'QuicksandBold'
    },
    indRestaurantContainer: {
        justifyContent: 'center',
        alignContent: 'center',
        margin: 10
    },
    image: {
        width: 340,
        height: 175
    },
    indRestaurantTextBody: {
		fontSize: 16,
        color: '#656565'
    },
    indRestaurantHeader: {
        fontSize: 20,
		fontWeight: 'bold',
		color: '#e95530',
		fontFamily: 'QuicksandBold'
    },
    indRestaurantHyperlink: {
        fontSize: 15,
        color: '#df817f'
    },
    activeRestaurantDetailsContainer: {
        marginLeft: 21
    },
    borderLine: {
        borderBottomColor: '#656565',
        borderBottomWidth: .5
    }
})
