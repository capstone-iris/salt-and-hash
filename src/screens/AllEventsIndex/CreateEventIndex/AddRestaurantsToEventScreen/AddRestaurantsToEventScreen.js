import React from 'react';

import {
	Text,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	TextInput,
	View,
	TouchableOpacity,
	ActivityIndicator,
	Button,
} from 'react-native';
import { firebase } from '../../../../firebase/config';

const timestamp = firebase.firestore.FieldValue.serverTimestamp();

export default class CreateEventForm extends React.Component {
	constructor() {
		super();

		this.eventsRef = firebase.firestore().collection('events');
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

	
	// const eventRestaurantsRef = firebase.firestore().collection('eventRestaurants');
	// eventRestaurantsRef.doc().set(Hello).add()






	inputValueUpdate = (val, prop) => {
		const state = this.state;
		state[prop] = val;
		this.setState(state);
	};

	storeEvent() {
		if (this.state.name === '') {
			alert('Please fill in event name!');
		} else {
			this.setState({
				isLoading: true,
			});
			this.eventsRef.doc(this.state.name)
				.set({
					name: this.state.name,
					date: this.state.date,
					eventStartTime: this.state.eventStartTime,
					description: this.state.description,
					votingDeadline: this.state.votingDeadline,
					eventEndTime: this.state.eventEndTime,
					eventCreated: timestamp,
				})
				.then((res) => {
					this.setState({
						name: '',
						date: '',
						eventStartTime: '',
						description: '',
						votingDeadline: '',
						eventEndTime: '',
						isLoading: false,
					});
				})
				.catch((e) => {
					console.error('Error found: ', e);
					this.setState({
						isLoading: false,
					});
				});
		}
	}

	render() {
		
		return (
			<SafeAreaView style={styles.container}>
				<ScrollView>
					<View style={styles.inputContainer}>
						<View>
						<Text>Add Restaurants to Event Screen</Text>
						</View>
					</View>
				</ScrollView>
			</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
	inputContainer: {
		padding: 10,
	},
	textInput: {
		borderColor: '#CCCCCC',
		borderWidth: 1,
		// borderTopWidth: 1,
		// borderBottomWidth: 1,
		height: 40,
		fontSize: 18,
		paddingLeft: 10,
		paddingRight: 10,
		margin: 5,
	},
	preferences: {
		fontWeight: 'bold',
		fontSize: 20,
		margin: 5,
	},
	title: {
		fontSize: 35,
		padding: 5,
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
	preloader: {
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		position: 'absolute',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
