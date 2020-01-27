import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Drawer, Container, Header, Item, Body, Button, Title } from 'native-base'
import User from './User'
import {Icon} from 'react-native-elements'

export default class Profile extends Component {
    render() {
        console.log(User.name,'EEEEEEEEEEEEEEEEEEEEE')
        return (
            <View>
                <Header style={styles.header}>

                    <Body>
                        <Title style={styles.titleHeader}>Profile Daku</Title>
                    </Body>

                </Header>
                <Icon name="face" size={100} color={'skyblue'}/>
                <Item
                    style={{ marginTop:15,marginLeft: 31, backgroundColor:'skyblue',borderStyle:'solid',borderRadius: 10, height: 50, marginBottom: 20, width: 300 }}>
                    <Text style={{ fontSize: 15, marginLeft: 20 }}>Username: {User.name}</Text>
                </Item>
                <Item
                    style={{ marginLeft: 31, backgroundColor:'skyblue',borderStyle:'solid', borderRadius: 10, height: 50, marginBottom: 20, width: 300 }}>
                    <Text style={{ fontSize: 15, marginLeft: 20 }}>Email: {User.email}</Text>
                </Item>
                <Button
                    style={{ marginLeft: 31, backgroundColor:'transparent',borderStyle:'solid',borderColor:'skyblue',borderWidth:2, borderRadius: 10, height: 50, marginBottom: 20, width: 300 }}>
                    <Text style={{ fontSize: 15, marginLeft: 140 }}>Edit</Text>
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
