import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import CarouselCardItem, { SLIDER_WIDTH, ITEM_WIDTH } from './CarouselCardItem';
import data from '../../../../data';
import { firebase } from '../../../firebase/config'


let result

export default CarouselCards = () => {
  const [index, setIndex] = React.useState(0);
  const [restaurantsData, setRestaurantsData] = useState([]);
  const isCarousel = React.useRef(null);

  useEffect(() => {
    async function fetchData() {
      console.log('in fetch data')
      const eventsRef = await firebase.firestore().collection('events').get();
      console.log('eventsRef', eventsRef)
      eventsRef.forEach(async (event) => {
        const eventId = event.data().docId
        console.log('eventID', eventId);
        if (eventId) {
          console.log('in event id func', eventId)
          const restaurantData = await firebase
            .firestore()
            .collection('eventRestaurants')
            .doc('0iAdNdpWlhgIuShGlsya')
            .collection('eventRestaurants')
            .get();
            console.log('restData', restaurantData)
          result = [];
          restaurantData.forEach((element) => {
            result.push(element.data());
          });
          setRestaurantsData(result);
        }

        console.log(result);
      });
    }
    fetchData();
  }, []);

  return (
    <View>
    <Carousel
      layout={"default"}
      layoutCardOffset={9}
      ref={isCarousel}
      data={restaurantsData}
      renderItem={({item}) => <CarouselCardItem item={item} index={index} />}
      sliderWidth={SLIDER_WIDTH}
      itemWidth={ITEM_WIDTH}
      onSnapToItem={(index) => setIndex(index)}
      useScrollView={true}
    />
      <Pagination
        dotsLength={restaurantsData.length}
        activeDotIndex={index}
        carouselRef={isCarousel}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 0,
          backgroundColor: "rgba(0, 0, 0, 0.92)",
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
        tappableDots={true}
      />
    </View>
  );
}
  
