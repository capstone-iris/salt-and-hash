import React from 'react';
import {
	Text,
	SafeAreaView,
	ScrollView,
	TextInput,
	View,
	TouchableOpacity,
	Alert
} from 'react-native';
import { firebase } from '../../../../firebase/config';
// import { withNavigation } from 'react-navigation';
import styles from './styles';
import Communications from 'react-native-communications';
import CreateEventMainScreen from '../CreateEventMainScreen/CreateEventMainScreen';

const timestamp = firebase.firestore.FieldValue.serverTimestamp();

export default class CreateEventForm extends React.Component {
	constructor() {
		super();
		this.eventGuestsRef = firebase.firestore().collection('eventGuests');
		this.state = {
			name: '',
			date: '',
			eventStartTime: '',
			description: '',
			votingDeadline: '',
			eventEndTime: '',
			isLoading: false,
		};
	}

	setPhoneNumber = (text) => {
		if(text.length < 11) {
			return this.setState({phoneNumber: text})
		} else {
			Alert.alert('Enter only a 10-digit phone number!');
	   }
	}

	setGuestList = (eventId, phoneNumber) => {
		this.eventGuestsRef.doc(phoneNumber).collection('eventsInvitedTo').doc(eventId)
					.set({
						phoneNumber: phoneNumber,
						eventId: eventId
					})
					.then(() => 
						this.setState(
							{restaurantCounter: this.state.restaurantCounter + 1}))
					.catch((e) => {
						console.error('Error found: ', e)
					})
		Alert.alert('Friend successfully entered!');
		Communications.text(phoneNumber,`Hello, friend! I'd love to invite you to join me for an event! Download the ExpoGo app, sign-up, RSVP, and vote for a restaurant! Instructions: https://bit.ly/2Py12XG`);
	}

	// createNewEvent = () => {
	// 	this.props.navigation.navigate('Create Event')
	// }

	render() {
		const eventId = this.props.route.params.eventId
		
		return (
			<SafeAreaView style={styles.container}>
				<ScrollView>
					<View style={styles.inputContainer}>
						<TextInput
							style={styles.input}
							placeholder='Enter Guest Phone Number'
							placeholderTextColor='#aaaaaa'
							onChangeText={(text) => this.setPhoneNumber(text)}
							underlineColorAndroid='transparent'
							autoCapitalize='none'
							value={this.state.phoneNumber}
							maxLength={10}
							clearButtonMode='always'
						/>
						<TouchableOpacity style={styles.button} onPress={() => {
							this.setGuestList(eventId, this.state.phoneNumber)}} >
								<Text style={styles.Btn}>Invite Friend Over Text</Text>
						</TouchableOpacity>
					</View>
				</ScrollView>
			</SafeAreaView>
		);
	}
}

// <TouchableOpacity style={styles.button} >
// <Text style={styles.Btn}>Create New Event</Text>
// </TouchableOpacity>
// onPress={() => this.createNewEvent()}
// export default withNavigation(CreateEventMainScreen);