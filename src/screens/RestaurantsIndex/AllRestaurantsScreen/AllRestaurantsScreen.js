import React from "react";
import { Text, View, Image, SafeAreaView, TouchableOpacity, FlatList, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import styles from './styles';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

export default class AllRestaurantsScreen extends React.Component {

  state = {
    hasLocationPermission: false,
    latitude: 0,
    longitude: 0,
    restaurantList: []
  }

  componentDidMount = () => {
    this.getLocationAsync();
  }

  getLocationAsync = async () => {
    const { status } = await Permissions.askAsync(
      Permissions.LOCATION
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
    const url  = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?';
    const location = `location=40.6127044,-74.0344876`;
    //const location = `location=${this.state.latitude},${this.state.longitude}`;
    const radius = '&radius=1000';
    const type = '&type=restaurant';
    const key = '&key=AIzaSyDH-uzWyDRZg0G2GDoTGRKDjlrcXOSVYOs'; //insert key here
    const restaurantSearchUrl = url + location + radius + type + key;
    fetch(restaurantSearchUrl, {
      mode: 'no-cors',
      cache: 'no-cache'})
      .then(response => {
        return response.json()})
      .then(result => {
        return this.setState({restaurantList: result})})
      .catch(e => console.log(e))
    }

  fetchImage = (photoRef) => {
    const ref = photoRef[0].photo_reference

    const url = 'https://maps.googleapis.com/maps/api/place/photo?';
    const maxWidth = '&maxwidth=300'
    const photoReference = `&photoreference=${ref}`;
    const key = '&key=<key>'; //insert key here
    const fetchImageUrl = url + maxWidth + photoReference + key;
    return fetchImageUrl
  }

render() {
  return (
    <SafeAreaView>
    <View>
      <TouchableOpacity onPress={() => this.handleRestaurantSearch()}>
        <Text style={{backgroundColor: 'grey', color: 'white', padding: 20}}>Explore Restaurants</Text>
      </TouchableOpacity>

      <View style={styles.restaurantContainer}>
      <FlatList
        data={this.state.restaurantList.results}
        keyExtractor={(item) => item.place_id}
        renderItem={({item}) => (
          <View style={styles.indRestaurantContainer}>
            <Image source={{uri: this.fetchImage(item.photos)}} />
            <View style={styles.indRestaurantText}>
              <Text>{item.name}</Text>
              <Text>{item.vicinity}</Text>
              <Text><Icon name="star" size={15} /> {item.rating} | {item.user_ratings_total} ratings</Text>
              <Text><Icon name="heart" size={15} /> Add to Favorites</Text>
            </View>
          </View>
        )}
      />
      </View>

      <StatusBar style="auto" />
    </View>
    </SafeAreaView>
  );
}
}
