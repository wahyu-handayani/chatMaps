import React, { Component } from 'react';
import { View, Text,TextInput, TouchableOpacity, ActivityIndicator,StyleSheet,Image } from 'react-native'
import { Drawer, Container, Header, Item, Body, Button, Title } from 'native-base'
import ImagePicker from 'react-native-image-picker'
import User from './User'
import {Icon} from 'react-native-elements'
import firebase from 'firebase'
// console.log(User,'dddddddddddddd');
console.log(User.region,'EEEEEEEEEEEEEEEEEEEEE')
export default class Profile extends Component {
    state={
        name:User.name,
        imageSource: User.image?{uri:User.image}:require('./sukses.jpg'),
        upload:false
    }
    handleChange=key=>val=>{
        this.setState({[key]:val})
    }
    changeName=async()=>{
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
        console.log(User.image,'IMGGGGGGG')
        this.updateUser()
        this.setState({upload:false,imageSource:{uri:img}})
    }
    uploadFile=async()=>{
        const file=await this.uriToBlob(this.state.imageSource.uri)
        firebase.storage().ref(`profile_pictures/${User.email}.png`)
        .put(file)
        .then(snapshot=>snapshot.ref.getDownloadURL())
        .then(url=>{
            console.log(url,'wwwwwwwwwwwwwwwww33')
            this.updateUserImage(url)
        })
        .catch(error=>{
            this.setState({
                upload:false,imageSource:require('./sukses.jpg')
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
        console.log(User.region,'EEEEEEEEEEEEEEEEEEEEE')
        return (
            <View>
                <Header style={styles.header}>

                    <Body>
                        <Title style={styles.titleHeader}>Profile Daku</Title>
                    </Body>

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
                    <Text style={{ fontSize: 15, marginLeft: 20 }}>Email: {User.email}</Text>
                </Item>
                <Button
                    onPress={this.changeName}
                    style={{ marginLeft: 31, backgroundColor:'transparent',borderStyle:'solid',borderColor:'skyblue',borderWidth:2, borderRadius: 10, height: 50, marginBottom: 20, width: 300 }}>
                    <Text style={{ fontSize: 15, marginLeft: 140 }}>Save</Text>
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
        marginLeft: 120
    },
})
