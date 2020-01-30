import React, { Component } from 'react'
import {
  StyleSheet, Text, View, TouchableOpacity, TextInput, Image, Alert

} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import { Item, Input, Button } from 'native-base'
import firebase from './config'
import Firebase from 'firebase'
import User from './User'
import Toast, { DURATION } from 'react-native-easy-toast'

export default class MyFront extends Component {
  constructor(props) {
    super(props);
    this.state = { name: '', email: '', password: '', error: '', loading: false,image:'' };

  }

  onLoginPress(){
    this.setState({ error: '', loading: true });
    // console.ignoredYellowBox = ['Setting a timer'];
    console.disableYellowBox = true;

    const { name, email, password } = this.state;
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(response => {
        this.setState({ error: '', loading: false });
        console.log(response, 'YYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY')
        // firebase.database().ref('users/' + response.user.uid).set({ image:response.user.image,email: this.state.email, name: this.state.name, uid: response.user.uid })
        console.log(User.image, 'OOOOOOOOOOOOO@@@')
        // console.log(this.state.email)
        // setTimeout(() => {
        //             this.props.navigation.navigate({
        //                 id: 'Home'
        //             })
        //         }, 1500)
        Firebase.database().ref('users').child(response.user.uid)
          .once('value', function(snapshot){
            if (snapshot.hasChild('image') == false) {
              User.image = null
            } else {
              const value=snapshot.val()
              console.log(snapshot.hasChild('image'),value.image,'XX1')
              User.image=value.image
            }
          })
        User.email =this.state.email
        User.name = this.state.name
        User.uid = response.user.uid
        AsyncStorage.setItem('uid', User.uid)
        // User.image=response.user.image
        this.props.navigation.navigate('Maps');

      })
      .catch(() => {
        this.setState({ error: this.refs.toast.show('Email/Password SALAH', 500), loading: false });
      })
    // const dataku = await AsyncStorage.getItem('uid')
    // console.log('ini datakuuuuuuuuuuuuuuuuuuuuu', dataku)

    // if (true){
    //   this.setState({error:'', loading:false});
    //     firebase.database().ref('users/'+this.state.email).set({name:this.state.email})
    //     this.props.navigation.navigate('Home');
    // }else alert('salah')
  }


  onSignUpPress() {
    this.setState({ error: '', loading: true });

    const { name, email, password } = this.state;
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(response => {
        this.setState({ error: '', loading: false });
        firebase.database().ref('users/' + response.user.uid).set({email: this.state.email, name: this.state.name, uid: response.user.uid })
        
        Alert.alert("regis SUKSES :'D")
        this.props.navigation.navigate('Login');
      })
      .catch(() => {
        this.setState({ error: this.refs.toast.show('Email/Password SALAH', 500), loading: false });
      })

  }

  renderButtonOrLoading() {
    if (this.state.loading) {
      return this.refs.toast.show('Tunggu, sedang loading')
    }

    return <View>


      <TouchableOpacity style={styles.buttonStyle} onPress={this.onLoginPress.bind(this)}>
        <Text style={styles.textSignup}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonStyle} onPress={this.onSignUpPress.bind(this)}>
        <Text style={styles.textSignup}>Sign up</Text>
      </TouchableOpacity>


    </View>
  }
  render() {
    return (

      <View style={styles.container}>

        <Image style={{ marginBottom: 40, width: 300, height: 150 }} source={require('./welcome.png')} />
        {/* <Image style={{marginBottom:50, width:30, height:30}} source={require('./live-chat.png')} /> */}

        <TextInput
          style={styles.textInput}
          placeholder='Username'
          utoCapitalize="none"
          onChangeText={name => this.setState({ name })}
        />
        <TextInput
          style={styles.textInput}
          placeholder='Email'
          utoCapitalize="none"
          onChangeText={email => this.setState({ email })}
        />
        <TextInput
          secureTextEntry
          style={styles.textInput}
          placeholder='Password'

          onChangeText={password => this.setState({ password })}
        />

        <Text>{this.state.error}</Text>
        {this.renderButtonOrLoading()}
        <Toast ref="toast" />
      </View>



    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'skyblue',
    flexDirection: 'column'
  },
  textInput: {
    height: 40,
    borderColor: '#ffffff',
    borderWidth: 1,
    color: 'black',
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 10,
    width: 320,
    fontSize: 15
  },
  buttonStyle: {
    backgroundColor: '#ffffff',
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 10,
    width: 320
  },
  textSignup: {
    fontSize: 16,
    textAlign: 'center',
    margin: 10,
    color: 'skyblue'
  },

});