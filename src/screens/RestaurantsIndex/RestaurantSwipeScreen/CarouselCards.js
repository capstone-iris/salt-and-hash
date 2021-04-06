import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import CarouselCardItem, { SLIDER_WIDTH, ITEM_WIDTH } from './CarouselCardItem';
import { useNavigation } from '@react-navigation/native';

let result;

export default CarouselCards = (props) => {
	const navigation = useNavigation();
	const { restaurantsData, eventId } = props
	const [index, setIndex] = React.useState(0);

	const isCarousel = React.useRef(null);


	return (
		<SafeAreaView style={styles.carouselContainer}>
				<Text style={styles.textHeader}>SELECT RESTAURANTS</Text>
		<View style={{height: 440, marginTop: 25}}>
		<Carousel
				inactiveSlideOpacity={1}
				layout={'stack'}
				layoutCardOffset={25}
				ref={isCarousel}
				data={restaurantsData}
				renderItem={({ item }) => (
					<CarouselCardItem item={item} index={index} eventId={eventId}  />
				)}
				sliderWidth={SLIDER_WIDTH}
				itemWidth={ITEM_WIDTH}
				onSnapToItem={(index) => setIndex(index)}
				useScrollView={true}
				containerCustomStyle={{
					flexGrow: 0
				  }}
			/>
		</View>
		<View style={styles.buttonContainer}>


			<Pagination
					dotsLength={restaurantsData.length}
					activeDotIndex={index}
					carouselRef={isCarousel}
					dotStyle={{
						width: 10,
						height: 10,
						borderRadius: 5,
						marginHorizontal: 0,
						backgroundColor: '#fbf2a0',
					}}
					inactiveDotOpacity={0.4}
					inactiveDotScale={0.6}
					tappableDots={true}
				/>


			<TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Single Event')}>
				<Text style={styles.buttonText}>Finish Voting</Text>
			</TouchableOpacity>
		</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
	  backgroundColor: '#ffffff',
	  flex: 1,
	  flexDirection: 'row',
	  justifyContent: 'center',
	  alignContent: 'center',
	},
	buttonContainer: {
        alignItems: 'center',
		justifyContent: 'center',
		alignSelf: 'center',
    },
    button: {
		backgroundColor: '#2a9d8f',
		height: 48,
		borderRadius: 5,
		alignItems: 'center',
		justifyContent: 'center',
		width: 275
    },
    buttonText: {
        color: 'white',
		fontSize: 16,
		fontWeight: 'bold'
    },
		textHeader: {
			fontFamily: 'QuicksandBold',
			fontSize: 20,
			textAlign: 'center',
			marginTop: -10,
			marginBottom: 10,
			color: '#e76f51',
			backgroundColor: '#ffffff',
			padding: 10,
			borderWidth: 2,
			borderColor: '#fbf2a0'

		},
		carouselContainer: {
			backgroundColor: '#e95531',
		}
})
