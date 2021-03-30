import { useNavigation } from '@react-navigation/native';
import React from 'react';

import {
	Text,
	SafeAreaView,
	ScrollView,
	TextInput,
	View,
	TouchableOpacity,
	ActivityIndicator,
	Alert,
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { firebase } from '../../../../firebase/config';
import styles from './styles';
import DateTimePicker from '@react-native-community/datetimepicker';

const timestamp = firebase.firestore.FieldValue.serverTimestamp();

class CreateEventMainScreen extends React.Component {
	constructor() {
		super();
		this.eventsRef = firebase.firestore().collection('events');
		this.state = {
			mode: '',
			show: false,
			name: '',
			date: new Date(), // not allowing me have '' or false to use placeholders
			eventStartTime: new Date(),
			description: '',
			votingDeadline: new Date(),
			eventEndTime: new Date(),
			isLoading: false,
		};
	}

	onChange = (event, selectedDate) => {
		const currentDate = selectedDate || date;
		const showFlag = Platform.OS === 'ios';
		this.setState({ show: showFlag });
		this.inputValueUpdate(
			selectedDate,
			this.state.mode === 'date' ? 'date' : 'eventStartTime'
		);
	};

	onChangeEventEndTime = (event, selectedDate) => {
		console.log('event endTimeChange +++', selectedDate);
		const currentDate = selectedDate || date;
		const showFlag = Platform.OS === 'ios';
		this.setState({ show: showFlag });
		this.inputValueUpdate(selectedDate, 'eventEndTime');
	};

	onChangeVotingDeadline = (event, selectedDate) => {
		console.log('event endTimeChange +++', selectedDate);
		const currentDate = selectedDate || date;
		const showFlag = Platform.OS === 'ios';
		this.setState({ show: showFlag });
		this.inputValueUpdate(selectedDate, 'votingDeadline');
	};

	showMode = (currentMode) => {
		this.setState({ show: true });
		this.setState({ mode: currentMode });
	};

	showDatepicker = () => {
		this.showMode('date');
	};

	showTimepicker = () => {
		this.showMode('time');
	};

	inputValueUpdate = (val, prop) => {
		const state = this.state;
		state[prop] = val;
		this.setState(state);
	};

	storeEvent = () => {
		const currentUser = firebase.auth().currentUser.uid;

		if (this.state.name === '') {
			alert('Please fill in event name!');
		} else {
			Alert.alert('Event successfully added!');
			this.setState({
				isLoading: true,
			});
			const document = this.eventsRef.doc();
			const documentId = document.id;
			this.eventsRef
				.doc(documentId)
				.set({
					name: this.state.name,
					date: this.state.date,
					eventStartTime: this.state.eventStartTime,
					description: this.state.description,
					votingDeadline: this.state.votingDeadline,
					eventEndTime: this.state.eventEndTime,
					eventCreated: timestamp,
					userId: currentUser,
					docId: documentId,
				})
				.then(() => {
					this.setState({
						mode: '',
						show: false,
						name: '',
						date: new Date(),
						eventStartTime: new Date(),
						description: '',
						votingDeadline: new Date(),
						eventEndTime: new Date(),
						isLoading: false,
					});
				})
				.catch((e) => {
					console.error('Error found: ', e);
					this.setState({
						isLoading: false,
					});
				});
			this.props.navigation.navigate('Add Restaurants to Event', {
				eventId: documentId,
			});
		}
	};

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

						<View style={{ marginHorizontal: 8 }}>
							<Text style={styles.text}>Date </Text>
							<DateTimePicker
								testID='datePicker'
								value={this.state.date}
								mode='date'
								is24Hour={true}
								display='default'
								onChange={this.onChange}
								placeholder='Select a date'
								style={{ marginHorizontal: 10 }}
							/>
						</View>

						<View style={{ marginHorizontal: 8 }}>
							<Text style={styles.text}>Start Time </Text>
							<DateTimePicker
								testID='timePicker'
								value={this.state.eventStartTime}
								mode='time'
								is24Hour={true}
								display='default'
								onChange={this.onChange}
								placeholder='Start time'
								style={{ marginHorizontal: 10 }}
							/>
						</View>

						<View style={{ marginHorizontal: 8 }}>
							<Text style={styles.text}>End Time </Text>
							<DateTimePicker
								testID='timePicker'
								value={this.state.eventEndTime}
								mode='time'
								is24Hour={true}
								display='default'
								onChange={this.onChangeEventEndTime}
								placeholder='End time'
								style={{ marginHorizontal: 10 }}
							/>
						</View>

						<View style={{ marginHorizontal: 8 }}>
							<Text style={styles.text}>Votes Due By </Text>
							<DateTimePicker
								testID='datePicker'
								value={this.state.votingDeadline}
								mode='date'
								is24Hour={true}
								display='default'
								onChange={this.onChangeVotingDeadline}
								placeholder='Votes Due By'
								style={{ marginHorizontal: 10 }}
							/>
						</View>
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

					<TouchableOpacity
						style={styles.button}
						onPress={() => this.storeEvent()}
					>
						<Text style={styles.Btn}>Create Event</Text>
					</TouchableOpacity>
				</ScrollView>
			</SafeAreaView>
		);
	}
}

export default withNavigation(CreateEventMainScreen);
