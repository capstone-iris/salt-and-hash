import React, { useEffect, useState } from 'react';
import { View, Button } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import CarouselCardItem, { SLIDER_WIDTH, ITEM_WIDTH } from './CarouselCardItem';
import { useNavigation } from '@react-navigation/native';



let result;

export default CarouselCards = (props) => {
	const navigation = useNavigation();
	const { restaurantsData, eventId } = props
	console.log('props', props)
	const [index, setIndex] = React.useState(0);


	const isCarousel = React.useRef(null);


	return (
		<View>
			<Carousel
				layout={'default'}
				layoutCardOffset={9}
				ref={isCarousel}
				data={restaurantsData}
				renderItem={({ item }) => (
					<CarouselCardItem item={item} index={index} eventId={eventId}  />
				)}
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
					backgroundColor: 'rgba(0, 0, 0, 0.92)',
				}}
				inactiveDotOpacity={0.4}
				inactiveDotScale={0.6}
				tappableDots={true}
			/>
				<Button title='Submit'
				onPress={() => navigation.navigate('Single Event')} />

		</View>
	);
};
