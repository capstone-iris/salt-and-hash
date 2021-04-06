import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar, StyleSheet, View, Text, Image } from 'react-native';
import { firebase } from './src/firebase/config';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
	LoginScreen,
	HomeScreen,
	RegistrationScreen,
	ActivityIndicatorScreen,
} from './src/screens';
import * as Font from 'expo-font';
import AppIntroSlider from 'react-native-app-intro-slider';
import { decode, encode } from 'base-64';

if (!global.btoa) {
	global.btoa = encode;
}
if (!global.atob) {
	global.atob = decode;
}

const LoggedInBase = createStackNavigator();
const LoggedOutBase = createStackNavigator();

const styles = StyleSheet.create({
	slide: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		padding: 20,
		backgroundColor: '#eb5634',
	},
	title: {
		fontSize: 26,
		color: 'white',
		fontWeight: 'bold',
		textAlign: 'center',
		marginBottom: 20,
	},
	text: {
		color: '#faa307',
		fontSize: 20,
		marginTop: 10,
		textAlign: 'center',
	},
	image: {
		width: 200,
		height: 200,
		resizeMode: 'contain',
		borderRadius: 50,
	},
});

const slides = [
	{
		key: 'k1',
		title: 'Welcome to\nSalt & Hash!',
		text: 'The new way to host events',
		image: require('./assets/saltAndHashLogo.png'),
		titleStyle: styles.title,
		textStyle: styles.text,
		imageStyle: styles.image,
		backgroundColor: '#eee1db',
	},
	{
		key: 'k2',
		title: 'Be A Host',
		text: 'Host events, choose restaurants,\n& invite friends to vote',
		image: require('./assets/introSlider_SelectRestaurants.jpg'),
		titleStyle: styles.title,
		textStyle: styles.text,
		imageStyle: styles.image,
		backgroundColor: '#F4B1BA',
	},
	{
		key: 'k3',
		title: 'Be A Guest',
		text:
			'Vote for your favorite restaurants & cuisines, & manage your invites',
		image: {
			uri: 'https://i.imgur.com/bXgn893.png',
		},
		titleStyle: styles.title,
		textStyle: styles.text,
		imageStyle: styles.image,
		backgroundColor: '#4093D2',
	},
	{
		key: 'k4',
		title: 'Manage your profile',
		text:
			'See your favorite restaurants, methods of payment, & event summaries',
		image: require('./assets/introSlider_Profile.jpg'),
		titleStyle: styles.title,
		textStyle: styles.text,
		imageStyle: styles.image,
		backgroundColor: '#644EE2',
	},
];

export default class App extends React.Component {
	constructor() {
		super();
		this.state = {
			loading: true,
			showMainApp: false,
			fontsLoaded: false,
		};
	}

	loadFontsAsync = async () => {
		let isLoaded = await Font.loadAsync({
			// Bangers: require("./assets/fonts/Bangers-Regular.ttf"),
			// LondrinaShadow: require("./assets/fonts/LondrinaShadow-Regular.ttf")
			QuicksandBold: require('./assets/fonts/Quicksand-Bold.ttf'),
		});
		this.setState({ fontsLoaded: isLoaded });
	};

	// --> !this.state.fontsLoaded in render needs fixing
	componentDidMount() {
		this.loadFontsAsync();
		this.authSubscription = firebase.auth().onAuthStateChanged((user) => {
			this.setState({
				loading: false,
				user,
			});
		});
	}

	componentWillUnmount() {
		this.authSubscription();
	}

	renderItem = ({ item }) => {
		return (
			<View style={styles.slide}>
				<Text style={styles.title}>{item.title}</Text>
				<Image style={styles.image} source={item.image} />
				<Text style={styles.text}>{item.text}</Text>
			</View>
		);
	};

	onDone = () => {
		this.setState({ showMainApp: true });
	};

	onSkip = () => {
		this.setState({ showMainApp: true });
	};

	render() {
		if (this.state.loading) return <ActivityIndicatorScreen />;

		if (this.state.user) {
			return (
				<NavigationContainer>
					<StatusBar
						hidden={false}
						backgroundColor='#00BCD4'
						translucent={true}
					/>
					<LoggedInBase.Navigator screenOptions={{ headerShown: false }}>
						<LoggedInBase.Screen name='Home' component={HomeScreen} />
					</LoggedInBase.Navigator>
				</NavigationContainer>
			);
		} else {
			if (this.state.showMainApp) {
				return (
					<NavigationContainer>
						<StatusBar
							hidden={false}
							backgroundColor='#00BCD4'
							translucent={true}
						/>
						<LoggedOutBase.Navigator screenOptions={{ headerShown: false }}>
							<LoggedOutBase.Screen name='Login' component={LoginScreen} />
							<LoggedOutBase.Screen
								name='Registration'
								component={RegistrationScreen}
							/>
						</LoggedOutBase.Navigator>
					</NavigationContainer>
				);
			} else {
				return (
					<AppIntroSlider
						renderItem={this.renderItem}
						data={slides}
						onDone={this.onDone}
						showSkipButton={true}
						onSkip={this.onSkip}
					/>
				);
			}
		}
	}
}
