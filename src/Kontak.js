import React from 'react';
// import { GiftedChat } from 'react-native-gifted-chat';
import User from './User';
import firebase from './config'
import { FlatList, TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Drawer, Container, Header, Item, Body, Button, Icon, Title } from 'native-base'

export default class Kontak extends React.Component {
  state = {
    users: []
  }
  componentWillMount() {
    let dbRef = firebase.database().ref('users')
    dbRef.on('child_added', (val) => {
      let person = val.val();
      console.log(person, 'PERSOOON')
      console.log(val.key, 'vvvvvvvvvvvvvvvvvvv')
      person.name = val.key;
      // console.log(person,'PERSOOO99999999999999999N')
      if (person.email === User.email) User.name = person.name
      else {
        this.setState((prevState) => {
          return {
            users: [...prevState.users, person]
          }
        })
      }
    })
  }
  renderRow = ({ item }) => {
    console.log('iteeeeeeeeeeeeeeeeeeeeeeem', item)
    return (
      <Button onPress={() => this.props.navigation.navigate('Chat', item)}
        style={{ marginLeft: 15, backgroundColor: 'transparent', borderWidth: 2, borderColor: 'skyblue', borderRadius: 10, height: 50, marginBottom: 20, width: 300 }}>
        <Text style={{ fontSize: 15, marginLeft: 10 }}>{item.email}</Text>
      </Button>
    )
  }
  render() {
    const { users } = this.state;
    console.log(this.state.users, 'KKKKKKKKKKKKKK')
    return <View>
      <Header style={styles.header}>

        <Body>
          <Title style={styles.titleHeader}>Kontak</Title>
        </Body>

      </Header>

      <FlatList
        data={this.state.users}
        renderItem={this.renderRow}
        keyExtractor={(item) => {
          console.log(item, 'MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM')
          item.name
        }}
      />


    </View>
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
    marginLeft: 130
  },
})

