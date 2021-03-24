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
        width: 250
    },
    button: {
        backgroundColor: '#ddb39d',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        height: 48,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center',
        width: 250
    },
    buttonTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: "bold"
    },
    footerView: {
        alignItems: "center",
        marginTop: 10
    },
    footerText: {
        fontSize: 16,
        color: '#2e2e2d'
    },
    footerLink: {
        color: "#ddb39d",
        fontWeight: "bold",
        fontSize: 16
    },
    restaurant: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'space-evenly',
        backgroundColor: '#eee1db',
        flexDirection: 'row'
    },
    image: {
        height: 120,
        width: 120,
        borderRadius: 10,
        borderWidth: 3,
        borderColor: 'maroon'
    },
    singleBlock: {
        flexDirection: 'column',
        margin: 10,
        marginTop: 30
    },
    hostedEventsTab: {
        flex: 1,
        backgroundColor: '#ff4081'
    },
    invitedEventsTab: {
        flex: 1,
        backgroundColor: '#673ab7'
    },
    createEventsTab: {

    }
})
