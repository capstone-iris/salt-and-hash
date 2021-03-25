import React, { useState, useEffect } from 'react';
import { Text, SafeAreaView, View, FlatList , TouchableOpacity} from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { firebase } from './../../../firebase/config';
import { NavigationEvents } from 'react-navigation';

// const eventsData = [{
// 	id: 1,
// 	date: '03/23/2021',
// 	description: 'Birthday Bash',
// 	eventEndTime: '9:00 PM',
// 	eventStartTime: '5:00 PM',
// 	name: '30th Birthday',
// 	votingDeadline: '03/20/2021'
// }, {
// 	id: 2,
// 	date: '04/09/2021',
// 	description: 'Graduation!',
// 	eventEndTime: '1:00 PM',
// 	eventStartTime: '6:00 PM',
// 	name: 'Last day of Bootcamp',
// 	votingDeadline: '04/01/2021'

// }, {
// 	id: 3,
// 	date: '04/09/2021',
// 	description: 'Graduation!',
// 	eventEndTime: '1:00 PM',
// 	eventStartTime: '6:00 PM',
// 	name: 'Last day of Bootcamp',
// 	votingDeadline: '04/01/2021'

// }, {
// 	id: 4,
// 	date: '04/09/2021',
// 	description: 'Graduation!',
// 	eventEndTime: '1:00 PM',
// 	eventStartTime: '6:00 PM',
// 	name: 'Last day of Bootcamp',
// 	votingDeadline: '04/01/2021'

// }, ]

let result

export default function ProfileScreen() {
	const navigation = useNavigation();
	const [eventsData, setEventsData] = useState([]);
	const eventsCollection = firebase.firestore().collection('events');

	useEffect(() => {
		async function fetchData() {
			const currentUser = await firebase.auth().currentUser.uid;

			let data = await eventsCollection.get();
			result = [];

			data.forEach((element) => {
				if (element.exists == true && element.data().userId != null) {
					if (element.data().userId === currentUser) {
						result.push(element.data());
					}
				}
			});
			setEventsData(result);
			console.log('RESULT==>',result);
		}

		fetchData();
	}, []);

	return (
		<SafeAreaView style={styles.container}>


			<View style={styles.eventsContainer}>

				{eventsData.map((event, index) => {
							return (
								<TouchableOpacity
								style={styles.singleEventContainer}
								activeOpacity={0.5}
								key={index}
								onPress={() => navigation.navigate('Single Event')}
								>

								<Text >{event.name}</Text>

							</TouchableOpacity>



							)
						})}

				{/* <FlatList
					data={result}
					horizontal={false}
					key={'_'}
					keyExtractor={(event, index) => "_" + index.toString()}
					numColumns={2}
					renderItem={ (event) => (

							<TouchableOpacity
							style={styles.singleEventContainer}
							activeOpacity={0.5}
							onPress={() => navigation.navigate('Single Event')}
						>
								<Text style={styles.singleEventTextHeader}>{event.name}</Text>
						</TouchableOpacity>
					)}


					/> */}



			</View>
		</SafeAreaView>
	);
}
