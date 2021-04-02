import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	container: {
		backgroundColor: '#ffffff',
		flex: 1
	},
    headerText: {
        margin: 10,
		fontSize: 24,
		fontWeight: 'bold',
		color: '#e95530',
		fontFamily: 'PurplePurse'
    },
    firstButtonContainer: {
        alignItems: 'center',
		justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: '#ffffff'
    },
    secondButtonContainer: {
        alignItems: 'center',
		justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: '#ffffff',
        marginBottom: 15
    },
    firstButton: {
		backgroundColor: '#e95531',
		height: 48,
		borderRadius: 5,
		alignItems: 'center',
		justifyContent: 'center',
		width: 275
    },
    secondButton: {
		backgroundColor: '#e95531',
		height: 48,
		borderRadius: 5,
		alignItems: 'center',
		justifyContent: 'center',
		width: 300
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
		fontFamily: 'PurplePurse'
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
		fontFamily: 'PurplePurse',
        marginTop: 10
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