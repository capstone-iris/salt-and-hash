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
	Alert,
} from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import { CheckBox } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import styles from './styles';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { firebase } from '../../../../firebase/config';
import * as base from '../../../../../secrets.js';

const timestamp = firebase.firestore.FieldValue.serverTimestamp();

class AddRestaurantsToEventScreen extends React.Component {
	constructor() {
		super(),
			(this.eventRestaurantsRef = firebase
				.firestore()
				.collection('eventRestaurants'));
		this.state = {
			hasLocationPermission: false,
			latitude: 0,
			longitude: 0,
			restaurantList: [],
			restaurantDetailsList: [],
			activeRestaurantId: null,
			detailToggleStatus: false,
			isLoading: false,
			restaurantCounter: 0,
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
		const key = `&key=${base.GOOGLE_PLACES_API}`;
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
		const key = `&key=${base.GOOGLE_PLACES_API}`;
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
		const key = `&key=${base.GOOGLE_PLACES_API}`;
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

	handleWebsiteUrl = (placeSite) => {
		Linking.openURL(placeSite);
	};

	storeRestaurant = (eventId, restaurant) => {
		if (this.state.restaurantCounter === 8) {
			Alert.alert('You cannot choose more than 8 restaurants!');
		} else {
			this.eventRestaurantsRef
				.doc(eventId)
				.collection('eventRestaurants')
				.doc(restaurant.place_id)
				.set({
					name: restaurant.name,
					photo: restaurant.photos[0].photo_reference,
					address: restaurant.vicinity,
					eventId: eventId,
					//restaurant website is on the restaurant details page; stretch integration
				})
				.then(() =>
					this.setState({ restaurantCounter: this.state.restaurantCounter + 1 })
				)
				.then(() => console.log('Restaurant added!'))
				.catch((e) => {
					console.error('Error found: ', e);
				});
		}
	};

	deleteRestaurant = (eventId, restaurant) => {
		this.eventRestaurantsRef
			.doc(eventId)
			.collection('eventRestaurants')
			.doc(restaurant.place_id)
			.delete()
			.then(() =>
				this.setState({ restaurantCounter: this.state.restaurantCounter - 1 })
			)
			.then(() => console.log('Restaurant deleted!'))
			.catch((e) => {
				console.error('Error found: ', e);
			});
	};

	submitRestaurantSelection = (eventId) => {
		if (this.state.restaurantCounter < 3) {
			Alert.alert('You must select at least three restaurants!');
		} else if (this.state.restaurantCouner > 7) {
			Alert.alert('You cannot choose more than 7 restaurants!');
		} else {
			this.props.navigation.navigate('Add Guests to Event', {
				eventId: eventId,
			});
		}
	};

	render() {
		const eventId = this.props.route.params.eventId;

		return (
			<SafeAreaView>
				<View style={styles.restaurantsContainer}>
					<Text style={styles.restaurantsTextHeader}>
						Select 3-7 Restaurants for Your Event
					</Text>
				</View>

				{this.state.restaurantList.length === 0 ? (
					<View style={styles.restaurantsContainer}>
						<TouchableOpacity onPress={() => this.handleRestaurantSearch()}>
							<Text style={styles.restaurantsTextHeader}>
								Restaurants Near You
							</Text>
						</TouchableOpacity>
					</View>
				) : (
					<View>
						<TouchableOpacity
							style={styles.button}
							onPress={() => this.submitRestaurantSelection(eventId)}
						>
							<Text style={styles.Btn}>Add Selected Restaurants to Event</Text>
						</TouchableOpacity>
						<View style={styles.button}>
							<Text style={styles.Btn}>Restaurants Near You</Text>
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

											if(items[currentItemIndex].checked) {
												this.storeRestaurant(eventId, items[currentItemIndex])
											} else {
												this.deleteRestaurant(eventId, items[currentItemIndex])
											}
										}}
										uncheckedColor='black'
										checkedTitle='Restaurant selected!'
									/>

									<Image source={{uri: this.fetchImage(item.photos)}} style={styles.image}/>

							<Text></Text>
							
							<Text style={styles.indRestaurantHeader}>
								{item.name}
							</Text>
					

							<Text style={styles.indRestaurantTextBody}>
								<AntDesign name='star' size={16} color='#e6a80c'/> {item.rating} |{' '}
								{item.user_ratings_total} ratings
							</Text>
						
							<TouchableRipple onPress={() => {}}>
								<Text style={styles.indRestaurantTextBody}>
								<AntDesign name='heart' size={16} color='#e6a80c'/> Add to Favorites
								</Text>
							</TouchableRipple>
							
							<Text></Text>
							
							<TouchableRipple onPress={() => {this.handleActiveRestaurantDetails(item.place_id)}}>
								<Text style={styles.indRestaurantTextBody}>
								<MaterialIcons name='subdirectory-arrow-right' size={15}/> Location Details
								</Text>
							</TouchableRipple>
							
							{this.state.activeRestaurantId === item.place_id &&
							<View style={styles.activeRestaurantDetailsContainer}>
							<Text>
								<View>
									<Text style={styles.indRestaurantTextBody}></Text>
									<Text style={styles.indRestaurantTextBody}>business status: {this.state.activeRestaurantDetails.result.business_status.toLowerCase()}</Text>
									<Text style={styles.indRestaurantTextBody}></Text>
									<Text style={styles.indRestaurantTextBody}>{this.state.activeRestaurantDetails.result.formatted_address}</Text>
									<Text style={styles.indRestaurantTextBody}>{this.state.activeRestaurantDetails.result.formatted_phone_number}</Text>
									<Text style={styles.indRestaurantTextBody}></Text>
									<Text style={styles.indRestaurantTextBody}>{this.state.activeRestaurantDetails.result.opening_hours.weekday_text[0]}</Text>
									<Text style={styles.indRestaurantTextBody}>{this.state.activeRestaurantDetails.result.opening_hours.weekday_text[1]}</Text>
									<Text style={styles.indRestaurantTextBody}>{this.state.activeRestaurantDetails.result.opening_hours.weekday_text[2]}</Text>
									<Text style={styles.indRestaurantTextBody}>{this.state.activeRestaurantDetails.result.opening_hours.weekday_text[3]}</Text>
									<Text style={styles.indRestaurantTextBody}>{this.state.activeRestaurantDetails.result.opening_hours.weekday_text[4]}</Text>
									<Text style={styles.indRestaurantTextBody}>{this.state.activeRestaurantDetails.result.opening_hours.weekday_text[5]}</Text>
									<Text style={styles.indRestaurantTextBody}>{this.state.activeRestaurantDetails.result.opening_hours.weekday_text[6]}</Text>
									<Text style={styles.indRestaurantTextBody}></Text>
									{this.state.activeRestaurantDetails.result.website && 
										<TouchableRipple onPress={() => {this.handleWebsiteUrl(this.state.activeRestaurantDetails.result.website)}}>
										<Text style={styles.indRestaurantHyperlink}>
											<MaterialCommunityIcons name='search-web' size={16} /> see restaurant website
										</Text>
										</TouchableRipple>}
										</View>
									</Text>
									</View>}
									<Text></Text>
								<View style={styles.borderLine}></View>
								</View>
							)}
						/>
					</View>
				)}
				<StatusBar style='auto' />
			</SafeAreaView>
		);
	}
}

export default withNavigation(AddRestaurantsToEventScreen);
