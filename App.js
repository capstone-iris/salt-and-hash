import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { firebase } from './src/firebase/config';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen, HomeScreen, RegistrationScreen, AllRestaurantsScreen } from './src/screens';
import {decode, encode} from 'base-64'

if (!global.btoa) {  global.btoa = encode }
if (!global.atob) { global.atob = decode }

const AppBase = createStackNavigator();

export default function App() {

  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const usersRef = firebase.firestore().collection('users');
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        usersRef
          .doc(user.uid)
          .get()
          .then((document) => {
            const userData = document.data()
            setLoading(false)
            setUser(userData)
          })
          .catch((error) => {
            setLoading(false)
          });
      } else {
        setLoading(false)
      }
    });
  }, []);

  return (
    <NavigationContainer>
      <StatusBar hidden = {false} backgroundColor = "#00BCD4" translucent = {true}/>
      <AppBase.Navigator initialRouteName={user ? 'Home' : 'Login'} screenOptions={{headerShown: false}}>
          <AppBase.Screen name='Home'>
            {(props) => <HomeScreen {...props} extraData={user} />}
          </AppBase.Screen>
          <AppBase.Screen name='Login' component={LoginScreen} />
          <AppBase.Screen name='Registration' component={RegistrationScreen} />
          <AppBase.Screen name='AllRestaurants' component={AllRestaurantsScreen} />
      </AppBase.Navigator>
    </NavigationContainer>
  );
}