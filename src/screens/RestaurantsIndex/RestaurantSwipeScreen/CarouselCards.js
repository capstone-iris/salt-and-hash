import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import CarouselCardItem, { SLIDER_WIDTH, ITEM_WIDTH } from './CarouselCardItem';
import data from '../../../../data';
import { firebase } from '../../../firebase/config';

let result;

export default CarouselCards = () => {
	// const { restaurantsData } = route.params;
	// console.log('RESTAURANTS', route.params)
	// const [index, setIndex] = React.useState(0);
	// const [restaurantsData, setRestaurantsData] = useState([]);
	// const [usersData, setUsersData] = useState([]);
	// const [ guestsData, setGuestsData ] = useState([]);


	const isCarousel = React.useRef(null);

//   useEffect(() => {
	
// 		async function fetchUser() {
//       if (!firebase.auth().currentUser) {
//         return;
//       }
//       const currentUser = await firebase.auth().currentUser.uid;
// 			let result = [];

// 			const usersCollection = firebase.firestore().collection('users');

// 			usersCollection.get().then((snapshot) => {
// 				snapshot.docs.forEach((doc) => {
// 					if (doc.exists === true && doc.data().id !== null) {
//           result.push(doc.data())
// 					}
//         });
//         result = result.filter((user) => user.id === currentUser)

//       console.log('user data', usersData)
// 				setUsersData(result);
// 			});

//     }
  
// 	fetchUser();

// 	async function fetchGuests() {


// 		const userPhoneNumber = usersData[0].phoneNumber;
// 		console.log('user data', usersData)

//       const guestsRef = await firebase
//             .firestore()
//             .collection('eventGuests')
//             .doc('5z56qNBt1Q3WPjQBeskc')              
//             .collection('eventGuests')
//             .where('phoneNumber', '==', userPhoneNumber)
//             .onSnapshot((snapshot) => {
//               const result2 = [];
//               snapshot.forEach((doc) => {
//               result2.push(doc.data());
//               });
          
//               setGuestsData(result2);
//               console.log('guests data', guestsData)
//             });
           
//     }
//     fetchGuests()
	
//     async function fetchData() {
//       console.log('in fetch data')
    
//           const restaurantData = await firebase
//             .firestore()
//             .collection('eventRestaurants')
//             .doc('7XmJrCiCD0oAnc7s95PP')
//             .collection('eventRestaurants')
//             .get();
//           result = [];
//           restaurantData.forEach((element) => {
//             result.push(element.data());
//           });
//           setRestaurantsData(result);
        


// 				console.log(result);
// 			};
		
// 		fetchData();
// 	}, []);

	return (
		<View>
			<Carousel
				layout={'default'}
				layoutCardOffset={9}
				ref={isCarousel}
				data={data}
				renderItem={({ item }) => (
					<CarouselCardItem item={item} index={index} />
				)}
				sliderWidth={SLIDER_WIDTH}
				itemWidth={ITEM_WIDTH}
				onSnapToItem={(index) => setIndex(index)}
				useScrollView={true}
			/>
			<Pagination
				dotsLength={data.length}
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
		</View>
	);
};
