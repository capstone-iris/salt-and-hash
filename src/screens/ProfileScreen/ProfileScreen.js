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

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class ProfileScreen extends Component {
	constructor() {
		super();
		this.state = {
			users: {},
		};
	}

	componentDidMount() {
		firebase
			.database()
			.ref('users')
			.on('value', (querySnapShot) => {
				let data = querySnapShot.val() ? querySnapShot.val() : {};
				let usersItems = { ...data };
				this.setState({ users: usersItems });
			});
	}

	// const data = firebase
	// 	.firestore()
	// 	.collection('users')
	// 	.get()
	// 	.then((snapshot) => {
	// 		snapshot.docs.forEach((doc) => {
	// 			doc;
	// 		});
	// 	});

	// console.log(data);

	// getUsers = () => {
	// 	const usersRef = firebase.firestore().collection('users');

	// 	usersRef.get().then((snapshot) => {
	// 		snapshot.docs.forEach((doc) => {
	// 			console.log(doc.data());
	// 		});
	// 	});
	// };

	// getUsers();

	// const usersCollection = firebase.database().ref('users');
	// usersCollection.on('value', (snapshot) => {
	// 	const data = snapshot.val();
	// 	console.log(snapshot);
	// });

	// const [email, setEmail] = React.useState('');

	// React.useEffect(() => {
	// 	let userEmail = firebase.auth().currentUser.email;
	// 	setEmail(userEmail);
	// 	console.log('User email is', userEmail);
	// }, []);

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
		console.log(this.state);
		return (
			<SafeAreaView style={styles.container}>
				<View style={styles.userInfoSection}>
					<View
						style={{
							flexDirection: 'row',
							marginTop: 30,
							alignItems: 'center',
						}}
					>
						<Avatar.Image
							source={{
								uri:
									'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUTBClYADFs5Xv7s0Uu3_1eXFalW-VzKMp74KcMmwDuYJwGdyeFpSSNB6x1w&usqp=CAc',
							}}
							size={80}
						/>
						<View style={{ marginLeft: 20 }}>
							<Title style={styles.title}>John Doe</Title>
							<Caption style={styles.caption}>@j_doe</Caption>
						</View>
					</View>
				</View>

				<View style={styles.userInfoSection}>
					<View style={styles.row}>
						<Icon name='map-marker-radius' size={20} color='#777777' />
						<Text style={{ color: '#777777', marginLeft: 20 }}>
							Fort Lauderdale, FL
						</Text>
					</View>
					<View style={styles.row}>
						<Icon name='phone' size={20} color='#777777' />
						<Text style={{ color: '#777777', marginLeft: 20 }}>
							+(850) 675-4567
						</Text>
					</View>
					<View style={styles.row}>
						<Icon name='email' size={20} color='#777777' />
						<Text style={{ color: '#777777', marginLeft: 20 }}>
							johndoe@email.com
						</Text>
					</View>
				</View>

				<View style={styles.infoBoxWrapper}>
					<View style={styles.infoBox}>
						<Title>1</Title>
						<Caption>Hosted Events</Caption>
					</View>
					<View style={styles.infoBox}>
						<Title>4</Title>
						<Caption>Invited Events</Caption>
					</View>
				</View>

				<View style={styles.menuWrapper}>
					<TouchableRipple onPress={() => {}}>
						<View style={styles.menuItem}>
							<Icon name='heart-outline' color='#FF6347' size={25} />
							<Text style={styles.menuItemText}>Your Favorites</Text>
						</View>
					</TouchableRipple>
					<TouchableRipple onPress={() => {}}>
						<View style={styles.menuItem}>
							<Icon name='credit-card-outline' color='#FF6347' size={25} />
							<Text style={styles.menuItemText}>Payment</Text>
						</View>
					</TouchableRipple>
					<TouchableRipple onPress={() => {}}>
						<View style={styles.menuItem}>
							<Icon name='bell-outline' color='#FF6347' size={25} />
							<Text style={styles.menuItemText}>Notifications</Text>
						</View>
					</TouchableRipple>
					<TouchableRipple onPress={() => {}}>
						<View style={styles.menuItem}>
							<Icon name='account-check-outline' color='#FF6347' size={25} />
							<Text style={styles.menuItemText}>Support</Text>
						</View>
					</TouchableRipple>
					<TouchableRipple onPress={this.onSignOut}>
						<View style={styles.menuItem}>
							<Icon name='logout' color='#FF6347' size={25} />
							<Text style={styles.menuItemText}>Sign out</Text>
						</View>
					</TouchableRipple>
				</View>
			</SafeAreaView>
		);
	}
}

// import React from 'react';
// import styles from './styles';
// import {
// 	SafeAreaView,
// 	View,
// 	Image,
// 	StyleSheet,
// 	TouchableOpacity,
// 	ScrollView,
// } from 'react-native';
// import { Text, TouchableRipple } from 'react-native-paper';

// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// export default function SingleEventScreen({ navigation }) {
// 	return (
// 		<SafeAreaView style={styles.container}>
// 			<Text style={styles.eventNameText}>Event Name</Text>
// 			<View style={(styles.menuWrapper, { marginTop: 40 })}>
// 				<View>
// 					<View style={styles.menuItem}>
// 						<Icon name='calendar-range' color='#FF6347' size={25} />
// 						<Text style={styles.menuItemText}>Date</Text>
// 					</View>
// 				</View>
// 				<View>
// 					<View style={styles.menuItem}>
// 						<Icon name='clock-outline' color='#FF6347' size={25} />
// 						<Text style={styles.menuItemText}>Time</Text>
// 					</View>
// 				</View>
// 				<View>
// 					<View style={styles.menuItem}>
// 						<Icon name='information-outline' color='#FF6347' size={25} />
// 						<Text style={styles.menuItemText}>Description</Text>
// 					</View>
// 				</View>
// 				<TouchableRipple onPress={() => {}}>
// 					<View style={styles.menuItem}>
// 						<Icon name='map-marker-radius' color='#FF6347' size={25} />
// 						<Text style={styles.menuItemText}>Location</Text>
// 					</View>
// 				</TouchableRipple>

// 				<ScrollView>
// 					<View style={styles.imageContainer}>
// 						<TouchableOpacity activeOpacity={0.5} onPress={() => {}}>
// 							<Image
// 								style={styles.image}
// 								source={{
// 									uri: 'https://picsum.photos/seed/picsum/596/354',
// 								}}
// 							/>
// 						</TouchableOpacity>
// 						<TouchableOpacity activeOpacity={0.5} onPress={() => {}}>
// 							<Image
// 								style={styles.image}
// 								source={{
// 									uri: 'https://picsum.photos/seed/picsum/536/354',
// 								}}
// 							/>
// 						</TouchableOpacity>
// 						<TouchableOpacity activeOpacity={0.5} onPress={() => {}}>
// 							<Image
// 								style={styles.image}
// 								source={{
// 									uri: 'https://picsum.photos/seed/picsum/536/354',
// 								}}
// 							/>
// 						</TouchableOpacity>
// 						<TouchableOpacity activeOpacity={0.5} onPress={() => {}}>
// 							<Image
// 								style={styles.image}
// 								source={{
// 									uri: 'https://picsum.photos/seed/picsum/536/354',
// 								}}
// 							/>
// 						</TouchableOpacity>
// 						<TouchableOpacity activeOpacity={0.5} onPress={() => {}}>
// 							<Image
// 								style={styles.image}
// 								source={{
// 									uri: 'https://picsum.photos/seed/picsum/536/354',
// 								}}
// 							/>
// 						</TouchableOpacity>
// 						<TouchableOpacity activeOpacity={0.5} onPress={() => {}}>
// 							<Image
// 								style={styles.image}
// 								source={{
// 									uri: 'https://picsum.photos/seed/picsum/536/354',
// 								}}
// 							/>
// 						</TouchableOpacity>
// 						<TouchableOpacity activeOpacity={0.5} onPress={() => {}}>
// 							<Image
// 								style={styles.image}
// 								source={{
// 									uri: 'https://picsum.photos/seed/picsum/536/354',
// 								}}
// 							/>
// 						</TouchableOpacity>
// 						<TouchableOpacity activeOpacity={0.5} onPress={() => {}}>
// 							<Image
// 								style={styles.image}
// 								source={{
// 									uri: 'https://picsum.photos/seed/picsum/536/354',
// 								}}
// 							/>
// 						</TouchableOpacity>
// 						<TouchableOpacity activeOpacity={0.5} onPress={() => {}}>
// 							<Image
// 								style={styles.image}
// 								source={{
// 									uri: 'https://picsum.photos/seed/picsum/536/354',
// 								}}
// 							/>
// 						</TouchableOpacity>
// 						<TouchableOpacity activeOpacity={0.5} onPress={() => {}}>
// 							<Image
// 								style={styles.image}
// 								source={{
// 									uri: 'https://picsum.photos/seed/picsum/536/354',
// 								}}
// 							/>
// 						</TouchableOpacity>
// 						<TouchableOpacity activeOpacity={0.5} onPress={() => {}}>
// 							<Image
// 								style={styles.image}
// 								source={{
// 									uri: 'https://picsum.photos/seed/picsum/536/354',
// 								}}
// 							/>
// 						</TouchableOpacity>
// 					</View>
// 				</ScrollView>
// 			</View>
// 		</SafeAreaView>
// 	);
// }

// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 		backgroundColor: '#eee1db',
// 		color: 'black',
// 	},
// 	menuWrapper: {
// 		marginTop: 10,
// 	},
// 	menuItem: {
// 		flexDirection: 'row',
// 		paddingVertical: 15,
// 		paddingHorizontal: 30,
// 	},
// 	menuItemText: {
// 		color: '#777777',
// 		marginLeft: 20,
// 		fontWeight: '600',
// 		fontSize: 16,
// 		lineHeight: 26,
// 	},
// 	imageContainer: {
// 		flex: 1,
// 		flexDirection: 'row',
// 		flexWrap: 'wrap',
// 		justifyContent: 'space-around',
// 		margin: 10,
// 		marginTop: 20,
// 		height: 850,
// 	},
// 	image: {
// 		height: 100,
// 		width: 100,
// 		marginBottom: 20,
// 		borderRadius: 15,
// 	},
// 	eventNameText: {
// 		color: 'black',
// 		fontWeight: '600',
// 		fontSize: 25,
// 		textAlign: 'center',
// 		marginTop: 25,
// 	},
// });
