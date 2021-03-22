import React from 'react'
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from "react-native"

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const SLIDER_WIDTH = Dimensions.get('window').width + 80
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7)

const CarouselCardItem = ({ item, index }) => {
  return (
    <View style={styles.container} key={index}>
      <Image
        source={{ uri: item.imgUrl }}
        style={styles.image}
      />
      <Text style={styles.header}>{item.title}</Text>
      <Text style={styles.body}>{item.body}</Text>

      <View style={styles.voteContainer}>
        <TouchableOpacity onPress={()=> console.log('left button pressed')}>
        <Icon style={styles.leftButton} name="close-circle-outline" size={60} color="#ff5e5e" />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> console.log('right button pressed')}>
        <Icon style={styles.rightButton} name="check-circle-outline" size={60} color="#8dc293" />
        </TouchableOpacity>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    backgroundColor: 'white',
    borderRadius: 8,
    width: ITEM_WIDTH,
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
    width: ITEM_WIDTH,
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

export default CarouselCardItem
