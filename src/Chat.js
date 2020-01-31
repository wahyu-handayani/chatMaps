import React, { Component } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Dimensions, ScrollView,StyleSheet } from 'react-native'
import {Drawer,Container, Header,Left,Right,Body,Button,Icon,Title} from 'native-base'
import firebase from 'firebase'
import User from './User'
console.log(User.uid, 'BISMILLAH')
export default class Chat extends Component {
    // static navigationOptions=({navigation})=>{
    //     console.log(navigation,'HHHHHHHHHHHHHHHH')
    //     return {
    //         title:'KKKK'
    //     }
    // }
    constructor(props) {
        super(props)
        this.state = {
            person: {
                email: props.navigation.getParam('email'),
                name: props.navigation.getParam('name'),
                uid: props.navigation.getParam('uid')
            },
            textMessage: '',
            messageList: []
        }
    }

    componentWillMount() {
        console.log(User.uid, '@@@@@@@@@@@@@@@@@')
        console.log(this.state.person.uid, '!!!!!!!!!!!!!!!!!!!!!!')
        firebase.database().ref('messages').child(User.uid).child(this.state.person.uid)
            .on('child_added', (value) => {
                this.setState((prevState) => {
                    console.log(prevState, 'xxxxxxxxxxxxxxxxxxxxxxx')
                    console.log(value.val(), 'DDDDDDDDDDDD')
                    return {
                        messageList: [...prevState.messageList, value.val()]
                    }
                })
            })
    }

    handleChange = key => val => { this.setState({ [key]: val }) }

    convertTime = (time) => {
        let d = new Date(time)
        let c = new Date()
        let result = (d.getHours() < 10 ? '0' : '') + d.getHours() + ':'
        result += (d.getMinutes() < 10 ? '0' : '') + d.getMinutes()
        console.log(result, 'waktuuuuu')
        if (c.getDay() !== d.getDay()) {
            let dd = d.getDay() === 5 ? 'Sat' : d.getDay() === 4 ? 'Fri' : d.getDay() === 3 ? 'Thru' : d.getDay() === 2 ? 'Wed' : d.getDay() === 1 ? 'Tue' : d.getDay() === 0 ? 'Mon' : d.getDay() === 6 ? 'Sun' : ' ';
            let ff = d.getMonth() === 0 ? 'Jan' : 'last month'
            result = dd + '/' + ff + ' ' + result
            console.log(c.getDay(), c.getMonth(), d.getDay(), d.getMonth(), 'DATEEEEEEEEEEEEEEEEEE')
        }
        return result
    }

    sendMessage = async () => {
        if (this.state.textMessage.length > 0) {
            let msgId = firebase.database().ref('messages').child(User.uid).child(this.state.person.uid).push().key
            let updates = {};
            let message = {
                message: this.state.textMessage,
                time: firebase.database.ServerValue.TIMESTAMP,
                from: User.email
            }
            updates['messages/' + User.uid + '/' + this.state.person.uid + '/' + msgId] = message
            updates['messages/' + this.state.person.uid + '/' + User.uid + '/' + msgId] = message
            firebase.database().ref().update(updates);
            this.setState({ textMessage: '' })
        }
    }
    renderRow = ({ item }) => {
        console.log(item, 'iteeemm.from')
        console.log(User.name, 'cek user')
        return (
            <View flexDirection="row" style={{
                width: '60%',
                alignSelf: item.from === User.email ? 'flex-end' : 'flex-start',
                backgroundColor: item.from === User.email ? 'skyblue' : 'turquoise',
                borderRadius: 5,
                marginBottom: 10
            }}>
                <Text style={{ color: 'black', padding: 7, fontSize: 16 }}>{item.message}</Text>
                <Text style={{ color: 'black', padding: 3, fontSize: 12 }}>{this.convertTime(item.time)}</Text>

            </View>
        )
    }

    render() {
        const { person } = this.state;
        console.log(this.state.person, 'CHAAATT')
        console.log(User.name, 'user nameeeeeeee')
        let { height, width } = Dimensions.get('window')
        console.log(this.state.person, 'XZXZXZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ')
        // console.ignoredYellowBox = ['Warning:']
        // console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed','Warning: componentWillMount'];
        console.disableYellowBox = true;
        return (
            <View>
                <Header style={styles.header}>
                 <Left>
               <Button transparent onPress={() => {this.props.navigation.navigate('Contact')}}>
                 <Icon name='ios-arrow-back' style={{color: 'blue'}}/>
               </Button>
             </Left>
                    <Body>
                        <Title style={styles.titleHeader}>My Chat</Title>
                    </Body>
                    <Right/>
                </Header>
                <ScrollView>
                    <FlatList
                        style={{ padding: 10, height: 1000 }}
                        data={this.state.messageList}
                        renderItem={this.renderRow}
                        keyExtractor={(item, indeks) => indeks.toString}
                    />
                </ScrollView>
                <View flexDirection="row" style={{ flex: 1, alignItems: 'center', width: 50 }}>
                    <TextInput value={this.state.textMessage}
                        placeholder='Ketik di sini..'
                        onChangeText={this.handleChange('textMessage')}
                        style={{
                            borderColor: 'dodgerblue', borderWidth: 3, height: 50,
                            color: 'black',
                            paddingLeft: 10,
                            paddingRight: 10,
                            bottom: 76,
                            width: 300,
                            borderRadius: 10,
                            fontSize: 15
                        }}
                    />

                    <Button onPress={this.sendMessage} style={{ bottom: 76, borderRadius: 10, width: 60, height: 50, backgroundColor: 'dodgerblue' }}>
                        <Text style={{ fontSize: 15, paddingLeft: 15, }}>Send</Text>
                    </Button>
                    {/* <TouchableOpacity onPress={this.sendMessage}>
                    <Text style={{borderRadius:10,borderWidth:3,fontSize:15,height:40,width:60,marginBottom:10,textAlign:'center'}}>Send</Text>
                </TouchableOpacity> */}
                    {/* <Text>cek</Text> */}

                </View>

            </View>
        )
    }
}
const styles = StyleSheet.create({
 
    header: {
      backgroundColor: 'skyblue',
      width: 360,
      height: 50,
  
    },
    
    titleHeader: {
      color: 'blue',
      fontSize: 18,
      marginLeft:70
    },
  })
  
  