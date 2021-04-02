import React, { Component } from 'react';
import { SafeAreaView, View } from 'react-native';
import styles from './styles';
import { firebase } from '../../firebase/config';
import {
	Avatar,
	Title,
	Caption,
	Text,
	TouchableRipple,
} from 'react-native-paper';
import { AntDesign, MaterialCommunityIcons, Entypo, MaterialIcons } from '@expo/vector-icons';

export default class ProfileScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			users: [],
		};
		console.log('props', props)

	}

	componentDidMount() {
		this.getUsers();
	}

	getUsers = () => {
		const usersRef = firebase.firestore().collection('users');
		let currentUser = firebase.auth().currentUser.uid;

		usersRef.get().then((snapshot) => {
			snapshot.docs.forEach((doc) => {
				if (currentUser === doc.data().id) this.setState({ users: doc.data() });
			});
		});
	};

	onSignOut = () => {
		firebase
			.auth()
			.signOut()
			.then(() => {
				console.log('Signed Out');
			})
			.catch((e) => {
				console.error('Sign Out Error', e);
			});
	};

	render() {
		const user = this.state.users;
		const { hostedEventsData, invitedEventsData } = this.props
		console.log('invitedevents', invitedEventsData)
		return (
			<SafeAreaView style={styles.container}>
				<View style={styles.userInfoContainer}>
				<View style={styles.userInfoSection}>
					<View
						style={{
							flexDirection: 'row',
							marginTop: 30,
							alignItems: 'center',
						}}
					>
						<MaterialCommunityIcons name='account-circle-outline' color='#ffffff' size={60} />
						{/* <Avatar.Image
							source={{
								uri:
									'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUTBClYADFs5Xv7s0Uu3_1eXFalW-VzKMp74KcMmwDuYJwGdyeFpSSNB6x1w&usqp=CAc',
							}}
							size={80}
						/> */}
						<View style={{ marginLeft: 20 }}>
							<Title style={styles.title}>{user.fullName}</Title>
						</View>
					</View>
				</View>

				<View style={styles.userInfoSection}>
					<View style={styles.row}>
						<Entypo name='phone' size={20} color='#ffffff' />
						<Text style={{ color: '#ffffff', marginLeft: 20 }}>
							{user.phoneNumber}
						</Text>
					</View>
					<View style={styles.row}>
						<MaterialIcons name='email' size={20} color='#ffffff' />
						<Text style={{ color: '#ffffff', marginLeft: 20 }}>
							{user.email}
						</Text>
					</View>
					</View>
				</View>

				<View style={styles.infoBoxWrapper}>
					<View style={styles.infoBox}>
						<Title style={{color: '#ffffff'}}>{hostedEventsData.length}</Title>
						<Caption style={{color: '#ffffff'}}>Hosted Events</Caption>
					</View>
					<View style={styles.infoBox}>
						<Title style={{color: '#ffffff'}}>{invitedEventsData.length}</Title>
						{/* <Title style={{color: '#ffffff'}}>3</Title> */}
						<Caption style={{color: '#ffffff'}}>Events Attending</Caption>
					</View>
				</View>

				<View style={styles.hr}></View>

				<View style={styles.menuWrapper}>
					<TouchableRipple onPress={() => {}}>
						<View style={styles.menuItem}>
							<AntDesign name='hearto' color='#e95632' size={25} />
							<Text style={styles.menuItemText}>Your Favorites</Text>
						</View>
					</TouchableRipple>
					<TouchableRipple onPress={() => {}}>
						<View style={styles.menuItem}>
							<AntDesign name='creditcard' color='#e95632' size={25} />
							<Text style={styles.menuItemText}>Payment</Text>
						</View>
					</TouchableRipple>
					<TouchableRipple onPress={() => {}}>
						<View style={styles.menuItem}>
							<AntDesign name='bells' color='#e95632' size={25} />
							<Text style={styles.menuItemText}>Notifications</Text>
						</View>
					</TouchableRipple>
					<TouchableRipple onPress={() => {}}>
						<View style={styles.menuItem}>
							<MaterialCommunityIcons name='account-box-outline' color='#e95632' size={25} />
							<Text style={styles.menuItemText}>Support</Text>
						</View>
					</TouchableRipple>
					<TouchableRipple onPress={this.onSignOut}>
						<View style={styles.menuItem}>
							<AntDesign name='logout' color='#e95632' size={25} />
							<Text style={styles.menuItemText}>Sign Out</Text>
						</View>
					</TouchableRipple>
				</View>
			</SafeAreaView>
		);
	}
}
