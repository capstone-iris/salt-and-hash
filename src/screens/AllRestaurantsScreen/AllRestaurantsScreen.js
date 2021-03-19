import React from "react";
import { Text, View, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import styles from './styles'


export default function AllRestaurantsScreen ({navigation}){


return (
    <SafeAreaView style={styles.container}>
        <Text>
        {'\n'}
        All Restaurants
        </Text>
        <SafeAreaView style={styles.restaurant}>
          <View style ={styles.singleBlock} >
            <TouchableOpacity onPress={() => navigation.navigate('SingleRestaurant')}>
            <Image style={styles.image} source={require ('/home/malika/Capstone/eventplanningapp/assets/placeholder-restaurant.jpg')} />
            </TouchableOpacity>
            <Text>
              Name {'\n'}
              Price Range {'\n'}
              Cuisine
            </Text>
        </View>
          <View style ={styles.singleBlock} >
            <Image style={styles.image} source={require ('/home/malika/Capstone/eventplanningapp/assets/placeholder-restaurant.jpg')} />
            <Text>
              Name {'\n'}
              Price Range {'\n'}
              Cuisine
            </Text>
        </View>
        <View style ={styles.singleBlock} >
            <Image style={styles.image} source={require ('/home/malika/Capstone/eventplanningapp/assets/placeholder-restaurant.jpg')} />
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



