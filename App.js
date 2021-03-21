import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'react-native';
import { firebase } from './src/firebase/config';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen, HomeScreen, RegistrationScreen, ActivityIndicatorScreen } from './src/screens';
import {decode, encode} from 'base-64'

if (!global.btoa) {  global.btoa = encode }
if (!global.atob) { global.atob = decode }

const LoggedInBase = createStackNavigator();
const LoggedOutBase = createStackNavigator();

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    this.authSubscription = firebase.auth().onAuthStateChanged((user) => {
      this.setState({
        loading: false,
        user,
      });
    });
  }

  componentWillUnmount() {
    this.authSubscription();
  }

  render() {
    if(this.state.loading) return <ActivityIndicatorScreen />

    if(this.state.user) return (
      <NavigationContainer>
      <StatusBar hidden = {false} backgroundColor = "#00BCD4" translucent = {true}/>
      <LoggedInBase.Navigator screenOptions={{headerShown: false}}>
          <LoggedInBase.Screen name='Home' component={HomeScreen} />
      </LoggedInBase.Navigator>
    </NavigationContainer>)

    return (
      <NavigationContainer>
      <StatusBar hidden = {false} backgroundColor = "#00BCD4" translucent = {true}/>
      <LoggedOutBase.Navigator screenOptions={{headerShown: false}}>
        <LoggedOutBase.Screen name='Login' component={LoginScreen} />
        <LoggedOutBase.Screen name='Registration' component={RegistrationScreen} />
      </LoggedOutBase.Navigator>
    </NavigationContainer>
    )
  }
}
