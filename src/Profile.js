import React, { Component } from 'react';
import { View, Text,TextInput, TouchableOpacity, ActivityIndicator,StyleSheet,Image } from 'react-native'
import { Drawer, Container, Header, Item, Body,Icon, Button, Title, Left,Right } from 'native-base'
import ImagePicker from 'react-native-image-picker'
import User from './User'
// import {Icon} from 'react-native-elements'
import firebase from 'firebase'
import AsyncStorage from '@react-native-community/async-storage';
// console.log(User,'dddddddddddddd');
console.log(User.name,User.email,'gffEEEEEEEEEEEEEEEEEEEEEf')
// coba=async()=>{
//     User.name=await AsyncStorage.getItem('name')
//     User.email=await AsyncStorage.getItem('email')
// }

export default class Profile extends Component {
    state={
        name:'',email:'',
        imageSource: '',
        upload:false
    }
    logout= async () =>{
    await AsyncStorage.removeItem('uid')
    await AsyncStorage.removeItem('name')
    await AsyncStorage.removeItem('email')
    await AsyncStorage.removeItem('image')
    this.props.navigation.navigate('MyFront')
    }
    handleChange=key=>val=>{
        this.setState({[key]:val})
    }
    componentDidMount(){
        this.coba()
    }
    coba=async()=>{
        User.name=await AsyncStorage.getItem('name')
        User.email=await AsyncStorage.getItem('email')
        User.image=await AsyncStorage.getItem('image')
        this.setState({name:User.name,email:User.email,imageSource:User.image?{uri:User.image}:require('./live-chat.png')})
        console.log(User.name,this.state.name,this.state.email,'jnnn')
    }
    changeName(){
        if (this.state.name.length<3) alert('salah')
        else if(User.name!==this.state.name){
        // firebase.database().ref('users').child(User.uid).set({name:this.state.name,email:User.email,region:User.region})
        console.log(User,'MNMNMNMN')
        User.name=this.state.name
        this.updateUser()
        alert('sukses','nama berubah')
    }
    }
    changeImage=()=>{
        const options={
            quality:0.7, allowsEditing:true,mediaType:'photo',noData:true,
            storageOptions:{
                skipBackup:true,waitUntilSaved:true,path:'images',cameraRoll:true
            }
        }

        ImagePicker.showImagePicker(options,res=>{
            if(res.error){
                console.log(error)
            }else if(!res.didCancel){
                this.setState({
                    imageSource:{uri:res.uri},
                    upload:true
                }, this.uploadFile)
            }
        })
    }

    updateUser=()=>{
        firebase.database().ref('users').child(User.uid).set(User)
        // const ref = firebase.storage().ref('profile_pictures/aa@gmail.com.png');
        // const url = ref.getDownloadUrl();
        // console.log(url,'5555555555555555')
        alert('sukses tersimpan')
    }

    updateUserImage=(img)=>{
        User.image=img
        console.log(User.image,'5IMGGGGGGG')
        this.updateUser()
        this.setState({upload:false,imageSource:{uri:img}})
    }
    uploadFile=async()=>{
        const file=await this.uriToBlob(this.state.imageSource.uri)
        console.log(User.email,'EMAILL')
        firebase.storage().ref(`profile_pictures/${User.email}.png`)
        .put(file)
        .then(snapshot=>snapshot.ref.getDownloadURL())
        .then(url=>{
            console.log(url,'wwwwwwwwwwwwwwwww33')
            this.updateUserImage(url)
        })
        .catch(error=>{
            this.setState({
                upload:false,imageSource:require('./live-chat.png')
            })
            // const ref = firebase.storage().ref('profile_pictures/aa@gmail.com.png');
        // const url = ref.getDownloadUrl();
        // console.log(ref,'5555555555555555')
            alert('err upload')
            
        })
    }
    uriToBlob=(uri)=>{
        return new Promise((resolve,reject)=>{
            const xhr=new XMLHttpRequest()
            xhr.onload=function(){
                resolve(xhr.response)
            }
            xhr.onerror=function(){
                reject(new Error('error upload'))
            }
            xhr.responseType='blob'
            xhr.open('GET',uri,true)
            xhr.send(null)
        })
    }

    render() {
        console.log(User.name,this.state.name,'ccEEEEEEEEEEEEEEEEEEEEE')
        const {email}=this.state
        return (
            <View>
                <Header style={styles.header}>
                <Left>
               <Button transparent onPress={() => {this.logout()}}>
                 <Icon name='close' style={{color: 'blue'}}/>
               </Button>
             </Left>
                    <Body>
                        <Title style={styles.titleHeader}>Profile Daku</Title>
                    </Body>
                    <Right/>

                </Header>
                <TouchableOpacity onPress={this.changeImage}>
                    {
                        this.state.upload?<ActivityIndicator size="large"/>:<Image source={this.state.imageSource} style={{left:130,height:80,width:80,borderRadius:100}}/>
                    }
                    
                </TouchableOpacity>
                <TextInput
                    value={this.state.name}
                    onChangeText={this.handleChange('name')}
                    style={{ marginTop:15,marginLeft: 31, backgroundColor:'skyblue',borderStyle:'solid',borderRadius: 10, height: 50, marginBottom: 20, width: 300 }}/>
                <Item
                    style={{ marginLeft: 31, backgroundColor:'skyblue',borderStyle:'solid', borderRadius: 10, height: 50, marginBottom: 20, width: 300 }}>
                    <Text style={{ fontSize: 15, marginLeft: 20 }}>Email: {this.state.email}</Text>
                </Item>
                <Button
                    onPress={this.changeName}
                    style={{ marginLeft: 31, backgroundColor:'transparent',borderStyle:'solid',borderColor:'skyblue',borderWidth:2, borderRadius: 10, height: 50, marginBottom: 20, width: 300 }}>
                    <Text style={{ fontSize: 15, marginLeft: 130 }}>Save</Text>
                </Button>

            </View>
        )
    }
}
const styles = StyleSheet.create({

    header: {
        backgroundColor: 'skyblue',
        width: 360,
        height: 50,
        marginBottom: 20
    },

    titleHeader: {
        color: 'blue',
        fontSize: 18,
        marginLeft: 40
    },
})
