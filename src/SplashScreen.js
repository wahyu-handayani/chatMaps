import React, {Component} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  ImageBackground,
} from 'react-native';
import {Image} from 'react-native';
import * as firebase from 'firebase';

export default class SplashScreen extends Component {
  componentDidMount() {
    setTimeout(() => {
      firebase.auth().onAuthStateChanged(user => {
        console.log(user,',,,,,,,,,,,,,,')
        this.props.navigation.navigate(user ? 'Peta' : 'MyFront');
      });
    }, 2500);
  }

  render() {
    // console.log(AsyncStorage.getItem('jwt'))

    return (
      <View style={{backgroundColor: 'skyblue', flex: 1}}>
        <ImageBackground
          source={require('./communication.png')}
          style={{
            width: 220,
            height: 220,
            marginLeft: 70,
            marginTop: 180,
            alignItems: 'center',
            justifyContent: 'center',
          }}></ImageBackground>

        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }
}