import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';

import {
	Text,
	SafeAreaView,
	ScrollView,
	TextInput,
	View,
	TouchableOpacity,
	ActivityIndicator,
	Alert,
	Button,
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { firebase } from '../../../../firebase/config';
import styles from './styles';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

const timestamp = firebase.firestore.FieldValue.serverTimestamp();

// const CreateEventMainScreen = () => {
// 	const [date, setDate] = useState(new Date(1598051730000));
// 	const [mode, setMode] = useState('date');
// 	const [show, setShow] = useState(false);

// 	const onChange = (event, selectedDate) => {
// 		const currentDate = selectedDate || date;
// 		setShow(Platform.OS === 'ios');
// 		setDate(currentDate);
// 	};

// 	const showMode = (currentMode) => {
// 		setShow(true);
// 		setMode(currentMode);
// 	};

// 	const showDatepicker = () => {
// 		showMode('date');
// 	};

// 	const showTimepicker = () => {
// 		showMode('time');
// 	};

// 	return (
// 		<View>
// 			<View>
// 				<Button onPress={showDatepicker} title='Show date picker!' />
// 			</View>
// 			<View>
// 				<Button onPress={showTimepicker} title='Show time picker!' />
// 			</View>
// 			{show && (
// 				<DateTimePicker
// 					testID='dateTimePicker'
// 					value={date}
// 					mode={mode}
// 					is24Hour={true}
// 					display='default'
// 					onChange={onChange}
// 				/>
// 			)}
// 		</View>
// 	);
// };

// export default withNavigation(CreateEventMainScreen);

// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 		justifyContent: 'center',
// 		alignItems: 'center',
// 		backgroundColor: '#F5FCFF',
// 	},
// 	button: {
// 		width: 250,
// 		height: 50,
// 		backgroundColor: '#330066',
// 		borderRadius: 30,
// 		justifyContent: 'center',
// 		marginTop: 15,
// 	},
// 	text: {
// 		fontSize: 18,
// 		color: 'white',
// 		textAlign: 'center',
// 	},
// });

class CreateEventMainScreen extends React.Component {
	constructor() {
		super();
		this.eventsRef = firebase.firestore().collection('events');
		this.state = {
			mode: '',
			show: false,
			name: '',
			date: new Date(),
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
						{/* <TextInput
							style={styles.textInput}
							placeholder='Date Dropdown'
							maxLength={20}
							value={this.state.date}
							onChangeText={(val) => this.inputValueUpdate(val, 'date')}
						/> */}
						<View>
							<DateTimePicker
								testID='datePicker'
								value={this.state.date}
								mode='date'
								is24Hour={true}
								display='default'
								onChange={this.onChange}
							/>
						</View>
						<View>
							<DateTimePicker
								testID='TimePicker'
								value={this.state.eventStartTime}
								mode='time'
								is24Hour={true}
								display='default'
								onChange={this.onChange}
							/>
						</View>

						<View>
							<DateTimePicker
								testID='TimePicker'
								value={this.state.eventEndTime}
								mode='time'
								is24Hour={true}
								display='default'
								onChange={this.onChangeEventEndTime}
							/>
						</View>

						<View>
							<DateTimePicker
								testID='TimePicker'
								value={this.state.votingDeadline}
								mode='date'
								is24Hour={true}
								display='default'
								onChange={this.onChangeVotingDeadline}
							/>
						</View>

						<View style={styles.eventTime}>
							{/* <TextInput
								style={styles.textInput}
								placeholder='Time'
								maxLength={20}
								value={this.state.eventStartTime}
								onChangeText={(val) =>
									this.inputValueUpdate(val, 'eventStartTime')
								}
							/> */}
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

						<TouchableOpacity
							style={styles.button}
							onPress={() => this.storeEvent()}
						>
							<Text style={styles.Btn}>Create Event</Text>
						</TouchableOpacity>
					</View>
				</ScrollView>
			</SafeAreaView>
		);
	}
}

export default withNavigation(CreateEventMainScreen);
