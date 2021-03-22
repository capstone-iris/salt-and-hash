import React from "react";
import { Text, View, Image, SafeAreaView, TouchableOpacity, FlatList, StatusBar } from 'react-native';
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
    
render() {    
  return (
    <View>
      <FlatList  
        data={this.state.restaurantList.results}
        keyExtractor={(item) => item.place_id}
        renderItem={({item}) => (
          <Text>{item.name}</Text>
        )}
        style={{backgroundColor: 'grey', width: '80%', margin: 60, padding: 5}}
      />
      <TouchableOpacity onPress={() => this.handleRestaurantSearch()}>
        <Text style={{backgroundColor: 'grey', color: 'white', padding: 20, marginBottom: 50}}>Search Restaurants</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}
}