import React from 'react';
import { Text, SafeAreaView, StyleSheet, FlatList } from 'react-native';
// import styles from './styles';
import { restaurantSelection, index } from '../../RestaurantsIndex/RestaurantSwipeScreen/CarouselCards'


export default function ProfileScreen({ navigation }) {
	console.log(restaurantSelection)
	return (
		<SafeAreaView >
			<FlatList
        data={restaurantSelection}
        keyExtractor={index}
        renderItem={({item}) => (
          <View style={styles.container}>
            <Image source={{uri: item.imgUrl}} />
            <View >
              <Text>{item.title}</Text>
              <Text>{item.body}</Text>
            </View>
          </View>
        )}
      />
			<Text onPress={() => navigation.navigate('Restaurant Swipe')}>
				{'\n'}
				My Events Screen{'\n'}
				Link to Events Hosted Screen | Link to Events Invited To Screen
			</Text>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
	  display: 'flex',
	  justifyContent: 'space-between',
	  flexDirection: 'column',
	  backgroundColor: 'white',
	  borderRadius: 8,
	  width: 100,
	  paddingBottom: 40,
	  shadowColor: "#000",
	  shadowOffset: {
		width: 0,
		height: 3,
	  },
	  shadowOpacity: 0.29,
	  shadowRadius: 4.65,
	  elevation: 7,
	  // borderColor: 'red',
	  // borderWidth: 2
	},
	image: {
	  width: 100,
	  height: 300,
	},
	header: {
	  color: "#222",
	  fontSize: 28,
	  fontWeight: "bold",
	  paddingLeft: 20,
	  paddingTop: 20
	},
	body: {
	  color: "#222",
	  fontSize: 18,
	  paddingLeft: 20,
	  paddingLeft: 20,
	  paddingRight: 20
	},
	voteContainer:{
	  display: 'flex',
	  justifyContent: 'space-between',
	  flexDirection: 'row',
	  // borderColor: 'red',
	  // borderWidth: 2,
	  marginTop: 20,
	  marginBottom: -40
	},
	leftButton: {
	  // color: 'red'
	},
	rightButton:{
	  // color: 'green'
	}
  })