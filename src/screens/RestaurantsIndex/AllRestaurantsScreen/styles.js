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
        alignSelf: "center",
        margin: 30
    },
    restaurantContainer: {
        margin: 25
    },
    indRestaurantContainer: {
        marginBottom: 25,
        backgroundColor: '#fab59e'
    },
    indRestaurantText: {
        margin: 10
    },
    image: {
        height: 120,
        width: 120,
        borderRadius: 10,
        borderWidth: 3,
        borderColor: 'maroon'
    },
})