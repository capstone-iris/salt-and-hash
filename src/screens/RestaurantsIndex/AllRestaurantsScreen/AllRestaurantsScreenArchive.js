import React from "react";
import { Text, View, Image, SafeAreaView, TouchableOpacity, FlatList } from 'react-native';
import styles from './styles';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

// git / github works as a good archival tool by itself

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
    const location = `location=44.940010,-93.276260`;
    //const location = `location=${this.state.latitude},${this.state.longitude}`;
    const radius = '&radius=10000';
    const type = '&type=restaurant';
    const key = '&key=AIzaSyDH-uzWyDRZg0G2GDoTGRKDjlrcXOSVYOs';
    const restaurantSearchUrl = url + location + radius + type + key;
    console.log('restaurantSearchUrl-->', restaurantSearchUrl)
    fetch(restaurantSearchUrl, {
      mode: 'no-cors',
      cache: 'no-cache'})
      .then(response => {
        // console.log('response-->', response)
        return response.json()})
      .then(result => {
        // console.log('result-->', result)
        return this.setState({restaurantList: result})})
      .catch(e => console.log(e))
    }
//.then(response => this.setState({restaurantList: response}))
//.catch(e => console.log(e))

render() {    
  return (
  <SafeAreaView style={styles.container}>
        <Text>
        {'\n'}
        All Restaurants
        </Text>
        <SafeAreaView style={styles.restaurant}>
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
          <View style ={styles.singleBlock} >
            <TouchableOpacity >
            <Image style={styles.image} source={require ('../../../../assets/placeholder-restaurant.jpg')} />
            </TouchableOpacity>
            <Text>
              Name {'\n'}
              Price Range {'\n'}
              Cuisine
            </Text>
        </View>
          <View style ={styles.singleBlock} >
            <Image style={styles.image} source={require ('../../../../assets/placeholder-restaurant.jpg')} />
            <Text>
              Name {'\n'}
              Price Range {'\n'}
              Cuisine
            </Text>
        </View>
        <View style ={styles.singleBlock} >
            <Image style={styles.image} source={require ('../../../../assets/placeholder-restaurant.jpg')} />
            <Text>
              Name {'\n'}
              Price Range {'\n'}
              Cuisine
            </Text>
        </View>
      </SafeAreaView>
  </SafeAreaView>
  );
  }
}

//onPress={() => navigation.navigate('Single Restaurant')}