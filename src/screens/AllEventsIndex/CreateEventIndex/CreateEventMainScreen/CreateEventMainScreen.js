import React from 'react';

import {
	Text,
	SafeAreaView,
	ScrollView,
	TextInput,
	View,
	TouchableOpacity,
	ActivityIndicator,
	Alert
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { firebase } from '../../../../firebase/config';
import styles from './styles'

const timestamp = firebase.firestore.FieldValue.serverTimestamp();

class CreateEventMainScreen extends React.Component {
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

	inputValueUpdate = (val, prop) => {
		const state = this.state;
		state[prop] = val;
		this.setState(state);
	};

	storeEvent = () => {
		if (this.state.name === '') {
			alert('Please fill in event name!');
		} else {
			Alert.alert('Event successfully added!')
			this.setState({
				isLoading: true,
			});
			const document = this.eventsRef.doc();
			const documentId = document.id;
			this.eventsRef.doc(documentId)
				.set({
					name: this.state.name,
					date: this.state.date,
					eventStartTime: this.state.eventStartTime,
					description: this.state.description,
					votingDeadline: this.state.votingDeadline,
					eventEndTime: this.state.eventEndTime,
					eventCreated: timestamp,
				})
				.then(() => {
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
				})
			this.props.navigation.navigate('Add Restaurants to Event', { eventId: documentId })
		}
	}

	render() {

		if (this.state.isLoading) {
			return (
				<View style={styles.preloader}>
					<ActivityIndicator size='large' color='#9E9E9E' />
				</View>
			);
		}
		
		return (
			<SafeAreaView style={styles.container}>
				<ScrollView>
					<View style={styles.inputContainer}>
						<View>
							<Text style={styles.title}>Create An Event</Text>
						</View>
						<TextInput
							style={styles.textInput}
							placeholder='Event Name'
							maxLength={20}
							value={this.state.name}
							onChangeText={(val) => this.inputValueUpdate(val, 'name')}
						/>
						<TextInput
							style={styles.textInput}
							placeholder='Date Dropdown'
							maxLength={20}
							value={this.state.date}
							onChangeText={(val) => this.inputValueUpdate(val, 'date')}
						/>
						<View style={styles.eventTime}>
							<TextInput
								style={styles.textInput}
								placeholder='Time'
								maxLength={20}
								value={this.state.eventStartTime}
								onChangeText={(val) =>
									this.inputValueUpdate(val, 'eventStartTime')
								}
							/>
							<TextInput
								style={styles.textInput}
								placeholder='Event End Time'
								maxLength={20}
								value={this.state.eventEndTime}
								onChangeText={(val) =>
									this.inputValueUpdate(val, 'eventEndTime')
								}
							/>
							<TextInput
								style={styles.textInput}
								placeholder='Voting Deadline'
								maxLength={20}
								value={this.state.votingDeadline}
								onChangeText={(val) =>
									this.inputValueUpdate(val, 'votingDeadline')
								}
							/>
						</View>
						<TextInput
							style={styles.textInput}
							multiline={true}
							placeholder='Write a description...'
							maxLength={200}
							height={90}
							value={this.state.description}
							onChangeText={(val) => this.inputValueUpdate(val, 'description')}
						/>
						<TouchableOpacity style={styles.button}>
							<Text style={styles.Btn} onPress={() => {}}>
								Preview Invitation
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.button}
							onPress={() => this.storeEvent()}
						>
							<Text style={styles.Btn}>Save Event</Text>
						</TouchableOpacity>
					</View>
				</ScrollView>
			</SafeAreaView>
		);
	}
}

export default withNavigation(CreateEventMainScreen);