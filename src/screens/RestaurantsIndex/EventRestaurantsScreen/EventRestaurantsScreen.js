import React from 'react';
import {
	Text,
	View,
	Image,
	SafeAreaView,
	FlatList,
	StatusBar,
	TouchableOpacity,
	Linking,
	TextInput,
	Alert,
} from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import { CheckBox } from 'react-native-elements';
import Communications from 'react-native-communications';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { firebase } from '../../../firebase/config';

const timestamp = firebase.firestore.FieldValue.serverTimestamp();

export default class AllRestaurantsScreen extends React.Component {
	constructor() {
		super(),
			(this.selectionRef = firebase.firestore().collection('restaurants'));
		this.state = {
			hasLocationPermission: false,
			latitude: 0,
			longitude: 0,
			restaurantList: [],
			restaurantDetailsList: [],
			activeRestaurantId: null,
			detailToggleStatus: false,
			isLoading: false,
			phoneNumber: '',
			guestList: [],
		};
	}
	componentDidMount = () => {
		this.getLocationAsync();
	};

	getLocationAsync = async () => {
		const { status } = await Permissions.askAsync(Permissions.LOCATION).catch(
			(err) => {
				console.log(err);
			}
		);
		if (status === 'granted') {
			let location = await Location.getCurrentPositionAsync({});
			this.setState({
				hasLocationPermissions: true,
				latitude: location.coords.latitude,
				longitude: location.coords.longitude,
			});
		} else {
			alert('Location permission not granted');
		}
	};

	handleRestaurantSearch = () => {
		const url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?';
		const location = `location=40.6127044,-74.0344876`;
		//const location = `location=${this.state.latitude},${this.state.longitude}`;
		const radius = '&radius=1000';
		const type = '&type=restaurant';
		const key = '&key=AIzaSyDH-uzWyDRZg0G2GDoTGRKDjlrcXOSVYOs'; //insert key here
		const restaurantSearchUrl = url + location + radius + type + key;
		fetch(restaurantSearchUrl, {
			mode: 'no-cors',
			cache: 'no-cache',
		})
			.then((response) => {
				return response.json();
			})
			.then((result) => {
				this.setState({ restaurantList: result });
			})
			.catch((e) => console.log(e));
	};

	fetchImage = (photoRef) => {
		const ref = photoRef[0].photo_reference;
		const url = 'https://maps.googleapis.com/maps/api/place/photo?';
		const maxWidth = '&maxwidth=600';
		const photoReference = `&photoreference=${ref}`;
		const key = '&key=AIzaSyDH-uzWyDRZg0G2GDoTGRKDjlrcXOSVYOs'; //insert key here
		const fetchImageUrl = url + maxWidth + photoReference + key;
		return fetchImageUrl;
	};
	// to add:
	// onPress function for a user to add a restaurant to his/her favorites
	// addToFavorites = () => {}
	//logic needs fixing:
	//user cannot open multiple detail toggles @ once
	handleActiveRestaurantDetails = (placeId) => {
		const url = 'https://maps.googleapis.com/maps/api/place/details/json?';
		const place_id = `&place_id=${placeId}`;
		const key = '&key=AIzaSyDH-uzWyDRZg0G2GDoTGRKDjlrcXOSVYOs'; //insert key here
		const activeRestaurantDetailsUrl = url + place_id + key;

		if (this.state.detailToggleStatus === false) {
			fetch(activeRestaurantDetailsUrl, {
				mode: 'no-cors',
				cache: 'no-cache',
			})
				.then((response) => {
					return response.json();
				})
				.then((result) => {
					return this.setState({
						activeRestaurantDetails: result,
						activeRestaurantId: placeId,
						detailToggleStatus: true,
					});
				})
				.catch((e) => console.log(e));
		}
		if (
			this.state.activeRestaurantId === placeId &&
			this.state.detailToggleStatus === true
		) {
			return this.setState({
				activeRestaurantDetails: null,
				activeRestaurantId: null,
				detailToggleStatus: false,
			});
		}
	};

	setPhoneNumber = (text) => {
		if (text.length < 11) {
			return this.setState({ phoneNumber: text });
		} else {
			Alert.alert('Enter only a 10-digit phone number!');
		}
	};

	setGuestList = (phoneNumber) => {
		Alert.alert('Friend successfully invited!');
		Communications.text(
			phoneNumber,
			`Hello, friend! I'd love to invite you to join me for an event! Download the ExpoGo app, sign-up, RSVP, and vote for a restaurant! Instructions: https://bit.ly/2Py12XG`
		);
		return this.setState((prevState) => ({
			guestList: [...prevState.guestList, phoneNumber],
			phoneNumber: '',
		}));
	};

	handleWebsiteUrl = (placeSite) => {
		Linking.openURL(placeSite);
	};

	handleSelection = (item) => {
		if (item.checked) {
			this.setState({
				isLoading: true,
			});
			const restaurants = firebase.firestore().collection('eventRestaurants');

			restaurants
				.doc(item.place_id)
				.set({
					name: item.name,
					rating: item.rating,
				})
				.then(() => {
					console.log('Document successfully written!');
				})
				.catch((error) => {
					console.error('Error writing document: ', error);
				});
			//   this.selectionRef
			// 	.add({
			// 	  id: item.place_id,
			// 	  name: item.name,
			// 	  rating: item.rating,
			// 	})
		}
	};

	render() {
		return (
			<SafeAreaView>
				<View style={styles.restaurantsContainer}>
					<Text style={styles.restaurantsTextHeader}>
						Select Restaurants for Your Event
					</Text>
					<Text style={styles.restaurantsText}>
						-select between 3-7 restaurants-
					</Text>
				</View>

				{this.state.restaurantList.length === 0 ? (
					<View style={styles.restaurantsContainer}>
						<TouchableOpacity onPress={() => this.handleRestaurantSearch()}>
							<Text style={styles.restaurantsTextHeader}>
								Choose From Restaurants Near You
							</Text>
						</TouchableOpacity>
						<Text></Text>
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
						<TouchableOpacity
							onPress={(phoneNumber) =>
								this.setGuestList(this.state.phoneNumber)
							}
						>
							<Text style={styles.restaurantsTextHeader}>
								Invite Friend Over Text
							</Text>
						</TouchableOpacity>

						<Text></Text>
						<TouchableOpacity onPress={() => this.getUserContacts()}>
							<Text style={styles.restaurantsTextHeader}>
								Choose Guests for Your Event
							</Text>
							{this.state.allContacts ? (
								this.state.allContacts.map((contact) => (
									<View key={contact.id}>
										<Text>{contact.Name}</Text>
									</View>
								))
							) : (
								<Text></Text>
							)}
						</TouchableOpacity>
					</View>
				) : (
					<View>
						<View style={styles.restaurantsContainer}>
							<Text style={styles.restaurantsTextHeader}>
								Restaurants Near You
							</Text>
						</View>
						<View style={styles.restaurantContainer}>
							<FlatList
								data={this.state.restaurantList.results}
								keyExtractor={(item) => item.place_id}
								renderItem={({ item }) => (
									<View style={styles.indRestaurantContainer}>
										<CheckBox
											checked={!!item.checked}
											onPress={() => {
												const items = [...this.state.restaurantList.results];
												const currentItemIndex = items.findIndex(
													(v) => v.place_id === item.place_id
												);
												items[currentItemIndex].checked = !items[
													currentItemIndex
												].checked;
												this.setState((state) => ({ ...state, items }));
												this.handleSelection(item);
											}}
											uncheckedColor='black'
											checkedTitle='Restaurant selected!'
										/>
										<View style={styles.indRestaurantInsideContainer}>
											<Image
												source={{ uri: this.fetchImage(item.photos) }}
												style={{ width: 300, height: 150 }}
											/>
											<Text></Text>
											<View style={styles.selectionHeader}>
												<Text style={styles.indRestaurantTextHeader}>
													{item.name}
												</Text>
											</View>
											<Text style={styles.indRestaurantTextBody}>
												<Icon name='star' size={16} /> {item.rating} |{' '}
												{item.user_ratings_total} ratings
											</Text>
											<TouchableRipple onPress={() => {}}>
												<Text style={styles.indRestaurantTextBody}>
													<Icon name='heart' size={16} /> Add to Favorites
												</Text>
											</TouchableRipple>
											<Text></Text>
											<TouchableRipple
												onPress={(placeId) => {
													this.handleActiveRestaurantDetails(item.place_id);
												}}
											>
												<Text style={styles.indRestaurantTextBody}>
													<Icon name='subdirectory-arrow-right' size={15} />{' '}
													Location Details
												</Text>
											</TouchableRipple>
											{this.state.activeRestaurantId === item.place_id && (
												<View style={styles.activeRestaurantDetailsContainer}>
													<Text>
														<View>
															<Text></Text>
															<Text>
																business status:{' '}
																{this.state.activeRestaurantDetails.result.business_status.toLowerCase()}
															</Text>
															<Text></Text>
															<Text>
																{
																	this.state.activeRestaurantDetails.result
																		.formatted_address
																}
															</Text>
															<Text>
																{
																	this.state.activeRestaurantDetails.result
																		.formatted_phone_number
																}
															</Text>
															<Text></Text>
															<Text>
																{
																	this.state.activeRestaurantDetails.result
																		.opening_hours.weekday_text[0]
																}
															</Text>
															<Text>
																{
																	this.state.activeRestaurantDetails.result
																		.opening_hours.weekday_text[1]
																}
															</Text>
															<Text>
																{
																	this.state.activeRestaurantDetails.result
																		.opening_hours.weekday_text[2]
																}
															</Text>
															<Text>
																{
																	this.state.activeRestaurantDetails.result
																		.opening_hours.weekday_text[3]
																}
															</Text>
															<Text>
																{
																	this.state.activeRestaurantDetails.result
																		.opening_hours.weekday_text[4]
																}
															</Text>
															<Text>
																{
																	this.state.activeRestaurantDetails.result
																		.opening_hours.weekday_text[5]
																}
															</Text>
															<Text>
																{
																	this.state.activeRestaurantDetails.result
																		.opening_hours.weekday_text[6]
																}
															</Text>
															<Text></Text>
															{this.state.activeRestaurantDetails.result
																.website && (
																<TouchableRipple
																	onPress={(placeSite) => {
																		this.handleWebsiteUrl(
																			this.state.activeRestaurantDetails.result
																				.website
																		);
																	}}
																>
																	<Text>
																		<Icon name='search-web' size={16} /> see
																		restaurant website
																	</Text>
																</TouchableRipple>
															)}
														</View>
													</Text>
												</View>
											)}
										</View>
									</View>
								)}
							/>
						</View>
					</View>
				)}
				<StatusBar style='auto' />
			</SafeAreaView>
		);
	}
}
