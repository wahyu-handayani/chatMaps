/**
 * App.js
 *
 * Root component of the app, 
 * responsible for setting up routes.
 *
*/

// Libs
import React from 'react';
import { View, Text, Button } from 'react-native';
import { createAppContainer,createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {Icon} from 'react-native-elements';
// Components
import MyFront from './src/MyFront';
import Maps from './src/Maps';
import Contact from './src/Kontak';
import Profile from './src/Profile';
import Chat from './src/Chat';

/**
 * createStackNavigator
 *
 * Creates a stack of our routes.
 *
*/
// const Navigator = createStackNavigator({
//     Login: { screen: Login,navigationOptions:{
//         headerShown: false
//     }},
//     Maps: { screen: Maps,navigationOptions:{
//         headerShown: false
//     }},
//     Home: { screen: Home},
//     Chat: { screen: Chat}
// });

// /**
//  * createAppContainer
//  *
//  * Responsible for managing app state and linking
//  * the top-level navigator to the app environment.
//  *
// */
// const App = createAppContainer(Navigator);

// export default App;

const Front = createStackNavigator(
    {
      MyFront
    },
    {
      headerMode: 'none',
      initialRouteName: 'MyFront', 
    },
  );

const Peta = createStackNavigator(
    {
      Maps,Chat
    },
    {
      headerMode: 'none',
      initialRouteName: 'Maps'
    },
  );
  
  const Kontak = createStackNavigator(
    {
      Contact
    },
    {
      headerMode: 'none',
      initialRouteName: 'Contact',
    },
  );
  

  
  const MyProfile = createStackNavigator(
    {
      Profile
    },
    {
      headerMode: 'none',
      initialRouteName: 'Profile',
    },
  );
  
  
  
  const RouteUser = createBottomTabNavigator(
    {
      Peta: {
        screen: Peta,
        navigationOptions: {
          tabBarIcon: ({tintColor}) => (
            <Icon name="explore" size={24} color={tintColor} />
          ),
        },
      },
      Kontak: {
        screen: Kontak,
        navigationOptions: {
          tabBarIcon: ({tintColor}) => (
            <Icon name="contacts" size={24} color={tintColor} />
          ),
        },
      },
      MyProfile: {
        screen: MyProfile,
        navigationOptions: {
          tabBarIcon: ({tintColor}) => (
            <Icon name="face" size={24} color={tintColor} />
          ),
        },
      },
  
      
    },
    {
      initialRouteName: 'Peta',
      tabBarOptions: {
        activeTintColor: 'skyblue',
      },
    },
  );
  
  
  const Router = createSwitchNavigator(
    {
      RouteUser,Front
    },
    {
      headerMode: 'none',
      initialRouteName: 'Front', 
    },
  );
  
  export default createAppContainer(Router);