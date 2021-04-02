import React from 'react';
import {
	Text,
	View,
	TouchableOpacity,
	Alert,
	Modal,
	SafeAreaView
} from 'react-native';
import {Input, Button, Label, Form, Item , Root} from 'native-base'
import { firebase } from '../../../../firebase/config';
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
			visibleModal: false
		};
		this.renderModalContent = this.renderModalContent.bind(this)
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
							{restaurantCounter: this.state.restaurantCounter + 1,
								visibleModal: false,
								// phoneNumber: ''
							}))
					.catch((e) => {
						console.error('Error found: ', e)
					})
		Alert.alert('Friend successfully entered!');
		Communications.text(phoneNumber,`Hello, friend! I'd love to invite you to join me for an event! Download the ExpoGo app, sign-up, RSVP, and vote for a restaurant! Instructions: https://bit.ly/2Py12XG`);


	}

	renderModalContent(){
		const {eventId} = this.props
		return (

		<Root style={{backgroundColor: '#ffffff'}}>
			<View style={styles.modalView} >
				<Form style={styles.modalForm}>
					{/* <Text>Enter Phone Number</Text> */}
					<Item fixedLabel style={styles.modalInput}>
						{/* <Label>Phone Number</Label> */}
						<Input
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
					</Item>
					<Button style={styles.modalButton}
						onPress={() => {
							this.setGuestList(eventId, this.state.phoneNumber)}
						}
					>
					<Text style={styles.modalButtonText}>Invite Friend</Text>
					</Button>
					<Button style={styles.modalButton}
						onPress={() => {
							this.setState({
								visibleModal: false,
							})
						}}
					>
					<Text style={styles.modalButtonText}>Close</Text>
					</Button>
				</Form>
			</View>
			</Root>
		)
	}

	render() {

		return (
			<SafeAreaView style={styles.container}>

				{this.state.visibleModal ? 

					<View style={{backgroundColor: '#ffffff'}}>
					<Modal transparent={true} visible={this.state.visibleModal} animationType="slide">
						{this.renderModalContent()}
					</Modal>
					</View>
				
					: 

					<View style={{backgroundColor: '#ffffff'}}>
					<TouchableOpacity style={styles.button} onPress={() => {
						this.setState({
							visibleModal: true,
						})}}>
						<Text style={styles.buttonText}>Invite Friends Over Text</Text>
					</TouchableOpacity>
					</View>

				}

			</SafeAreaView>
		);
	}
}

// <View style={styles.centeredView} onPress={() => {
// 	this.setState({
// 		visibleModal: false,
// 	})s
// }}>
// </View>