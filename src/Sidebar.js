import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native'
import { Container, Header, Title, Content, Footer, FooterTab, Button, Right, Body, Text } from 'native-base';
// import AsyncStorage from '@react-native-community/async-storage';

export default class Sidebar extends Component {

  render() {

    return (
      <Container>
        <Header style={{backgroundColor:'#ffff'}}>
          <Body>
            <Title>Menu</Title>
          </Body>
          <Right />
        </Header>
        <Content padder>
          <Text></Text>
          <TouchableOpacity onPress={() => {
            this.props.navigation.navigate('Maps')
          }}>
            <Text>
              Maps
          </Text>
            <Text></Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            this.props.navigation.navigate('Home')
          }}>
            <Text>
              Kontak
          </Text>
          </TouchableOpacity>
        </Content>
        {/* <Footer>
          <FooterTab>
            <Button full>
              <Text>Footer</Text>
            </Button>
          </FooterTab>
        </Footer> */}
      </Container>
    );
  }
}