import React from "react";
import { Text, View, Image, SafeAreaView } from 'react-native';
import styles from './styles'


export default function AllRestaurantsScreen ({navigation}){


return (
    <SafeAreaView style={styles.container}>
        <Text>
        {'\n'}
        Restaurant Name
        </Text>
        <SafeAreaView style={styles.restaurant}>
          <View style ={styles.singleBlock} >
            <Image style={styles.image} source={require ('../../../../assets/placeholder-restaurant.jpg')} />
            <Text>
              Address {'\n'}
              Description {'\n'}
              Price Range {'\n'}
              Cuisine {'\n'}
              BusinessHours {'\n'}
            </Text>
         </View>
      </SafeAreaView>
  </SafeAreaView>
  );
}



