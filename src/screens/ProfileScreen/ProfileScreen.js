import React from 'react';
import { SafeAreaView, View } from 'react-native';
import styles from './styles';
import {
	Avatar,
	Title,
	Caption,
	Text,
	TouchableRipple,
} from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function ProfileScreen({ navigation }) {
	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.userInfoSection}>
				<View
					style={{
						flexDirection: 'row',
						marginTop: 50,
						alignItems: 'center',
					}}
				>
					<Avatar.Image
						source={{
							uri:
								'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUTBClYADFs5Xv7s0Uu3_1eXFalW-VzKMp74KcMmwDuYJwGdyeFpSSNB6x1w&usqp=CAc',
						}}
						size={80}
					/>
					<View style={{ marginLeft: 20 }}>
						<Title style={styles.title}>John Doe</Title>
						<Caption style={styles.caption}>@j_doe</Caption>
					</View>
				</View>
			</View>

			<View style={styles.userInfoSection}>
				<View style={styles.row}>
					<Icon name="map-marker-radius" size={20} color="#777777" />
					<Text style={{ color: '#777777', marginLeft: 20 }}>
						Fort Lauderdale, FL
					</Text>
				</View>
				<View style={styles.row}>
					<Icon name="phone" size={20} color="#777777" />
					<Text style={{ color: '#777777', marginLeft: 20 }}>
						+(850) 675-4567
					</Text>
				</View>
				<View style={styles.row}>
					<Icon name="email" size={20} color="#777777" />
					<Text style={{ color: '#777777', marginLeft: 20 }}>
						john_doe@email.com
					</Text>
				</View>
			</View>

			<View style={styles.infoBoxWrapper}>
				<View style={styles.infoBox}>
					<Title>1</Title>
					<Caption>Hosted Events</Caption>
				</View>
				<View style={styles.infoBox}>
					<Title>4</Title>
					<Caption>Invited Events</Caption>
				</View>
			</View>

			<View style={styles.menuWrapper}>
				<TouchableRipple onPress={() => {}}>
					<View style={styles.menuItem}>
						<Icon name="heart-outline" color="#FF6347" size={25} />
						<Text style={styles.menuItemText}>Your Favorites</Text>
					</View>
				</TouchableRipple>
				<TouchableRipple onPress={() => {}}>
					<View style={styles.menuItem}>
						<Icon name="credit-card-outline" color="#FF6347" size={25} />
						<Text style={styles.menuItemText}>Payment</Text>
					</View>
				</TouchableRipple>
				<TouchableRipple onPress={() => {}}>
					<View style={styles.menuItem}>
						<Icon name="bell-outline" color="#FF6347" size={25} />
						<Text style={styles.menuItemText}>Notifications</Text>
					</View>
				</TouchableRipple>
				<TouchableRipple onPress={() => {}}>
					<View style={styles.menuItem}>
						<Icon name="account-check-outline" color="#FF6347" size={25} />
						<Text style={styles.menuItemText}>Support</Text>
					</View>
				</TouchableRipple>
				<TouchableRipple onPress={() => {}}>
					<View style={styles.menuItem}>
						<Icon name="logout" color="#FF6347" size={25} />
						<Text style={styles.menuItemText}>Sign out</Text>
					</View>
				</TouchableRipple>
			</View>
		</SafeAreaView>
	);
}
