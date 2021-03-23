import React from 'react';
import styles from './styles';
import {
	SafeAreaView,
	View,
	Image,
	StyleSheet,
	TouchableOpacity,
	ScrollView,
} from 'react-native';
import { Text, TouchableRipple } from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function SingleEventScreen({ navigation }) {
	return (
		<SafeAreaView style={styles.container}>
			<Text style={styles.eventNameText}>Event Name</Text>
			<View style={(styles.menuWrapper, { marginTop: 40 })}>
				<View>
					<View style={styles.menuItem}>
						<Icon name='calendar-range' color='#FF6347' size={25} />
						<Text style={styles.menuItemText}>Date</Text>
					</View>
				</View>
				<View>
					<View style={styles.menuItem}>
						<Icon name='clock-outline' color='#FF6347' size={25} />
						<Text style={styles.menuItemText}>Time</Text>
					</View>
				</View>
				<View>
					<View style={styles.menuItem}>
						<Icon name='information-outline' color='#FF6347' size={25} />
						<Text style={styles.menuItemText}>Description</Text>
					</View>
				</View>
				<TouchableRipple onPress={() => {}}>
					<View style={styles.menuItem}>
						<Icon name='map-marker-radius' color='#FF6347' size={25} />
						<Text style={styles.menuItemText}>Location</Text>
					</View>
				</TouchableRipple>

				<ScrollView>
					<View style={styles.imageContainer}>
						<TouchableOpacity activeOpacity={0.5} onPress={() => {}}>
							<Image
								style={styles.image}
								source={{
									uri: 'https://picsum.photos/seed/picsum/596/354',
								}}
							/>
						</TouchableOpacity>
						<TouchableOpacity activeOpacity={0.5} onPress={() => {}}>
							<Image
								style={styles.image}
								source={{
									uri: 'https://picsum.photos/seed/picsum/536/354',
								}}
							/>
						</TouchableOpacity>
						<TouchableOpacity activeOpacity={0.5} onPress={() => {}}>
							<Image
								style={styles.image}
								source={{
									uri: 'https://picsum.photos/seed/picsum/536/354',
								}}
							/>
						</TouchableOpacity>
						<TouchableOpacity activeOpacity={0.5} onPress={() => {}}>
							<Image
								style={styles.image}
								source={{
									uri: 'https://picsum.photos/seed/picsum/536/354',
								}}
							/>
						</TouchableOpacity>
						<TouchableOpacity activeOpacity={0.5} onPress={() => {}}>
							<Image
								style={styles.image}
								source={{
									uri: 'https://picsum.photos/seed/picsum/536/354',
								}}
							/>
						</TouchableOpacity>
						<TouchableOpacity activeOpacity={0.5} onPress={() => {}}>
							<Image
								style={styles.image}
								source={{
									uri: 'https://picsum.photos/seed/picsum/536/354',
								}}
							/>
						</TouchableOpacity>
						<TouchableOpacity activeOpacity={0.5} onPress={() => {}}>
							<Image
								style={styles.image}
								source={{
									uri: 'https://picsum.photos/seed/picsum/536/354',
								}}
							/>
						</TouchableOpacity>
						<TouchableOpacity activeOpacity={0.5} onPress={() => {}}>
							<Image
								style={styles.image}
								source={{
									uri: 'https://picsum.photos/seed/picsum/536/354',
								}}
							/>
						</TouchableOpacity>
						<TouchableOpacity activeOpacity={0.5} onPress={() => {}}>
							<Image
								style={styles.image}
								source={{
									uri: 'https://picsum.photos/seed/picsum/536/354',
								}}
							/>
						</TouchableOpacity>
						<TouchableOpacity activeOpacity={0.5} onPress={() => {}}>
							<Image
								style={styles.image}
								source={{
									uri: 'https://picsum.photos/seed/picsum/536/354',
								}}
							/>
						</TouchableOpacity>
						<TouchableOpacity activeOpacity={0.5} onPress={() => {}}>
							<Image
								style={styles.image}
								source={{
									uri: 'https://picsum.photos/seed/picsum/536/354',
								}}
							/>
						</TouchableOpacity>
					</View>
				</ScrollView>
			</View>
		</SafeAreaView>
	);
}
