import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
	Text,
	SafeAreaView,
	ScrollView,
	View,
	TouchableOpacity,
	ActivityIndicator,
	Alert,
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { firebase } from '../../../../firebase/config';
import styles from './styles';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Sae } from 'react-native-textinput-effects';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { FontAwesome } from '@expo/vector-icons';
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
		this.inputValueUpdate(selectedDate, 'date');
	};

	onChangeEventStartTime = (event, selectedDate) => {
		console.log('event endTimeChange +++', selectedDate);
		const currentDate = selectedDate || date;
		const showFlag = Platform.OS === 'ios';
		this.setState({ show: showFlag });
		this.inputValueUpdate(selectedDate, 'eventStartTime');
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
			alert('Please add an event name!');
		} else if (this.state.description === '') {
			alert('Please add an event description!');
		} else {
			Alert.alert('Event successfully created!');
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
			firebase
				.firestore()
				.collection('events')
				.where('docId', '==', documentId)
				.onSnapshot((snapshot) => {
					let event;
					snapshot.forEach((doc) => {
						event = doc.data();
					});
					console.log('EVENT==>', event);
					this.props.navigation.navigate('Add Restaurants to Event', {
						event: event,
					});
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
				<View style={styles.createEventHeader}>
					<Text style={styles.title}>CREATE AN EVENT</Text>
				</View>
				<ScrollView>
					<View style={styles.inputContainer}>
						<Sae
							style={{ marginLeft: 10, marginRight: 30, marginBottom: 5 }}
							labelStyle={{ color: '#e95530' }}
							inputStyle={{ fontSize: 20, color: '#656565' }}
							label={'Event Name'}
							iconClass={FontAwesomeIcon}
							iconName={'calendar-check-o'}
							iconColor={'#e95530'}
							inputPadding={16}
							labelHeight={20}
							borderHeight={2}
							autoCapitalize={'none'}
							autoCorrect={false}
							onChangeText={(val) => this.inputValueUpdate(val, 'name')}
						/>
						<Sae
							style={{ marginLeft: 10, marginRight: 30 }}
							labelStyle={{ color: '#e95530' }}
							inputStyle={{ fontSize: 20, color: '#656565' }}
							label={'Event Description'}
							iconClass={FontAwesomeIcon}
							iconName={'pencil'}
							iconColor={'#e95530'}
							inputPadding={16}
							labelHeight={20}
							borderHeight={2}
							autoCapitalize={'none'}
							autoCorrect={false}
							onChangeText={(val) => this.inputValueUpdate(val, 'description')}
						/>
						{/* <View style={styles.break1}></View> */}
						{/* <View style={styles.break2}><FontAwesome name='circle' color='#e6a80c'/></View> */}
						{/* <View style={styles.break3}></View> */}
						<View style={{ marginTop: 20, marginBottom: 20 }}>
							<View style={styles.indInputContainer}>
								<Text style={styles.text}>Event Date: </Text>
								<View style={styles.dateTimePicker}>
									<DateTimePicker
										testID='datePicker'
										value={this.state.date}
										mode='date'
										is24Hour={true}
										display='default'
										onChange={this.onChange}
										placeholder='Select a date'
									/>
								</View>
							</View>
							<View style={styles.indInputContainer}>
								<Text style={styles.text}>Event Start Time: </Text>
								<View style={styles.dateTimePicker}>
									<DateTimePicker
										testID='timePicker'
										value={this.state.eventStartTime}
										mode='time'
										is24Hour={true}
										display='default'
										onChange={this.onChangeEventStartTime}
										placeholder='Start time'
										style={{ width: 100 }}
									/>
								</View>
							</View>
							<View style={styles.indInputContainer}>
								<Text style={styles.text}>Event End Time: </Text>
								<View style={styles.dateTimePicker}>
									<DateTimePicker
										testID='timePicker'
										value={this.state.eventEndTime}
										mode='time'
										is24Hour={true}
										display='default'
										onChange={this.onChangeEventEndTime}
										placeholder='End time'
										// style={{ marginHorizontal: 10 }}
									/>
								</View>
							</View>
							<View style={styles.indInputContainer}>
								<Text style={styles.text}>Votes Due By: </Text>
								<View style={styles.dateTimePicker}>
									<DateTimePicker
										testID='datePicker'
										value={this.state.votingDeadline}
										mode='date'
										is24Hour={true}
										display='default'
										onChange={this.onChangeVotingDeadline}
										placeholder='Votes Due By'
										// style={{ marginHorizontal: 10 }}
									/>
								</View>
							</View>
						</View>
					</View>
					<View style={styles.buttonContainer}>
						<TouchableOpacity
							style={styles.button}
							onPress={() => this.storeEvent()}
						>
							<Text style={styles.createBtn}>Create Event</Text>
						</TouchableOpacity>
					</View>
				</ScrollView>
			</SafeAreaView>
		);
	}
}
export default withNavigation(CreateEventMainScreen);
