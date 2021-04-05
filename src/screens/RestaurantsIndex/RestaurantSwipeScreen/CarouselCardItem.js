import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity, 
  Linking
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableRipple } from 'react-native-paper';
import { Col, Grid } from "react-native-easy-grid";
import * as base from "../../../../secrets.js";
import { firebase } from '../../../firebase/config';


export const SLIDER_WIDTH = Dimensions.get('window').width + 80;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);

export default class CarouselCardItem extends React.Component {
  constructor(props) {
    super(props),
    this.state = {
      voted: false,
      activeRestaurantId: null,
      itemId: props.item.id
    }
    this.eventRestaurantsRef = firebase.firestore().collection('eventRestaurants');
    this.vote = this.vote.bind(this);
    this.handleVote = this.handleVote.bind(this);
    this.handleUnvote = this.handleUnvote.bind(this);
  }

  componentDidMount() {
    this.handleActiveRestaurantDetails(this.state.itemId)   
  }

  handleActiveRestaurantDetails = (placeId) => {
		const url = 'https://maps.googleapis.com/maps/api/place/details/json?';
		const place_id = `&place_id=${placeId}`;
		const key = `&key=${base.GOOGLE_PLACES_API}`;
		const activeRestaurantDetailsUrl = url + place_id + key;

			fetch(activeRestaurantDetailsUrl, {
				mode: 'no-cors',
				cache: 'no-cache',
			})
				.then((response) => {
					return response.json();
				})
				.then((result) => {
					return this.setState({
						activeRestaurantWebsite: result.result.website,
						activeRestaurantId: placeId,
					});
				})
        .catch((e) => console.log(e));
		
		// if (
    //   this.state.activeRestaurantId === placeId
    //   ) {
		// 	return this.setState({
		// 		activeRestaurantDetails: null,
		// 		activeRestaurantId: null,
		// 	});
		// }
	};

	handleWebsiteUrl = (placeSite) => {
		Linking.openURL(placeSite);
	};

  vote = async (eventId, item) => {
    await this.setState({voted: !this.state.voted})
    if (this.state.voted) {
      alert('Vote added!')
      this.handleVote(eventId, item)
    } else {
      this.handleUnvote(eventId, item)
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
        <View style={styles.voteContainer}>
          <Grid>
          <Col size={20}>
            <TouchableOpacity onPress={() => this.vote(eventId, item)}>
            {this.state.voted ? (
                <MaterialCommunityIcons
                  name='check-circle'
                  color='#2a9d8f'
                  size={40}
                />
              ) : (
                <MaterialCommunityIcons
                  name='circle-outline'
                  color='#DADADA'
                  size={40}
                />
              )}
            </TouchableOpacity>
          </Col>
          <Col size={80}>
            <Text style={styles.header}>{item.name}</Text>
          </Col>
          </Grid>
          </View>
          <View style={styles.activeRestaurantDetailsContainer}>
										<TouchableRipple onPress={() => this.handleWebsiteUrl(this.state.activeRestaurantWebsite)}>
										<Text style={styles.indRestaurantHyperlink}>
											<MaterialCommunityIcons name='search-web' size={16} /> see restaurant website
										</Text>
										</TouchableRipple>
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
    shadowColor: '#df8280',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    marginBottom: 5,

  },
  image: {
    width: ITEM_WIDTH,
    height: 330,
  },
  header: {
    marginTop: 8,
    marginLeft: 5,
    marginRight: -5,
		fontSize: 20,
		fontWeight: 'bold',
		color: '#e95530',
		fontFamily: 'QuicksandBold',
    flex: 1,
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
    flexDirection: 'row',
    margin: 15,
    marginBottom: -10
  }
});
