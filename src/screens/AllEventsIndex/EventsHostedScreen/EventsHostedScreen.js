import React from 'react';
import { Text, SafeAreaView, View, FlatList , TouchableOpacity} from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';

const eventsData = [{
	id: 1,
	date: '03/23/2021',
	description: 'Birthday Bash',
	eventEndTime: '9:00 PM',
	eventStartTime: '5:00 PM',
	name: '30th Birthday',
	votingDeadline: '03/20/2021'
}, {
	id: 2,
	date: '04/09/2021',
	description: 'Graduation!',
	eventEndTime: '1:00 PM',
	eventStartTime: '6:00 PM',
	name: 'Last day of Bootcamp',
	votingDeadline: '04/01/2021'

}, {
	id: 3,
	date: '04/09/2021',
	description: 'Graduation!',
	eventEndTime: '1:00 PM',
	eventStartTime: '6:00 PM',
	name: 'Last day of Bootcamp',
	votingDeadline: '04/01/2021'

}, {
	id: 4,
	date: '04/09/2021',
	description: 'Graduation!',
	eventEndTime: '1:00 PM',
	eventStartTime: '6:00 PM',
	name: 'Last day of Bootcamp',
	votingDeadline: '04/01/2021'

}, ]

export default function ProfileScreen() {
	const navigation = useNavigation();
	return (
		<SafeAreaView style={styles.container}>


			<View style={styles.eventsContainer}>
				<FlatList
					data={[...eventsData, {}]}
					horizontal={false}
					key={'_'}
					keyExtractor={(event, index) => "_" + index.toString()}
					numColumns={2}
					renderItem={({event})=> (

							<TouchableOpacity
							style={styles.singleEventContainer}
							activeOpacity={0.5}
							onPress={() => navigation.navigate('Single Event')}
						>
							{Object.keys({event}).length?
								<Text style={styles.singleEventTextHeader}>EVENT NAME</Text>
							:
								<Text style={styles.createEventTextHeader}>CREATE EVENT</Text>
							}

						</TouchableOpacity>


					)}/>



			</View>
		</SafeAreaView>
	);
}
