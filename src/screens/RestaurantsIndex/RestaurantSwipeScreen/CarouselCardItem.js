import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as base from "../../../../secrets.js";
import { firebase } from '../../../firebase/config';


export const SLIDER_WIDTH = Dimensions.get('window').width + 80;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);

export default class CarouselCardItem extends React.Component {
  constructor(props) {
    super(props),
    this.state = {
        votes: 0,
        leftSelected: true,
        rightSelected: true
      }
      const {item, eventId} = this.props
      this.eventRestaurantsRef = firebase.firestore().collection('eventRestaurants');
      this.increment = this.increment.bind(this);
      this.decrement = this.decrement.bind(this);
      this.toggleLeft = this.toggleLeft.bind(this);
      this.toggleRight = this.toggleRight.bind(this)
      this.handleVote = this.handleVote.bind(this)
      this.handleUnvote = this.handleUnvote.bind(this)

  }

  increment = () => {
    this.setState({votes: this.state.votes + 1})
  }

  decrement = () => {
    this.setState({votes: this.state.votes - 1})
  }

  toggleLeft = (eventId, item) => {
    this.setState({leftSelected: !this.state.leftSelected})
    if (item.votes > 0) {
    this.handleUnvote(eventId, item) 
    } else {
      alert('You haven\'t voted for this restaurant!')
    }

  }

  toggleRight = (eventId, item) => {
    this.setState({rightSelected: !this.state.rightSelected})
    if (this.state.rightSelected) {
      alert('Restaurant added!')
      this.increment()
      this.handleVote(eventId, item)
    } else {
      this.decrement()

    }
  }

  handleVote = (eventId, item) => {
    const increment = firebase.firestore.FieldValue.increment(1);
    this.eventRestaurantsRef.doc(eventId).collection('eventRestaurants').doc(item.id).update({'votes': increment})
  }

  handleUnvote = (eventId, item) => {
    const decrement = firebase.firestore.FieldValue.increment(-1);
    this.eventRestaurantsRef.doc(eventId).collection('eventRestaurants').doc(item.id).update({'votes': decrement})
  }
 

  fetchImage = (photoRef) => {
    const ref = photoRef
		const url = 'https://maps.googleapis.com/maps/api/place/photo?';
		const maxWidth = '&maxwidth=600';
		const photoReference = `&photoreference=${ref}`;
		const key = `&key=${base.GOOGLE_PLACES_API}`;
		const fetchImageUrl = url + maxWidth + photoReference + key;
		return fetchImageUrl;
	};

  render() {
    const { item, index, eventId } = this.props;
    return (
      <View style={styles.container} key={index}>
        <Image
          source={{ uri: this.fetchImage(item.photo) }}
          style={styles.image}
        />
        <Text style={styles.header}>{item.name}</Text>
        <Text style={styles.body}>{item.body}</Text>
        <View style={styles.voteContainer}>
          <TouchableOpacity onPress={() => this.toggleLeft(eventId, item)}>
          {this.state.leftSelected ? (
            <MaterialCommunityIcons
            name='close-circle-outline'
            color='#ff5e5e'
            size={60}
          />
        ) : (
          <MaterialCommunityIcons
            name='close-circle'
            color='#ff5e5e'
            size={60}
          />
        )}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.toggleRight(eventId, item)}>
          {this.state.rightSelected ? (
              <MaterialCommunityIcons
                name='check-circle-outline'
                color='#8dc293'
                size={60}
              />
            ) : (
              <MaterialCommunityIcons
                name='check-circle'
                color='#8dc293'
                size={60}
              />
            )}
          </TouchableOpacity>
        </View>
      </View>
    );
  }
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
    shadowColor: '#000',
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
    color: '#222',
    fontSize: 28,
    fontWeight: 'bold',
    paddingLeft: 20,
    paddingTop: 20,
  },
  body: {
    color: '#222',
    fontSize: 18,
    paddingLeft: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  voteContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    // borderColor: 'red',
    // borderWidth: 2,
    marginTop: 20,
    marginBottom: -40,
  },
  leftButton: {
    // color: 'red'
  },
  rightButton: {
    // color: 'green'
  },
});

// export default CarouselCardItem
