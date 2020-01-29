import React, { Component } from 'react';
import {
  PermissionsAndroid, Alert, View,
  Text,
  StyleSheet,
  StatusBar,
  Dimensions,
  AsyncStorage,
  Image,
  TouchableOpacity,
  FlatList
} from 'react-native';
import {Drawer,Container, Header,Left,Right,Body,Button,Icon,Title} from 'native-base'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import firebase from './config'
import { withNavigation } from 'react-navigation'
import Geolocation from 'react-native-geolocation-service';
import permission from './Permission';
import pin from './img/marker.png'
import pin2 from './img/marker2.png'
import User from './User';
let { width, height } = Dimensions.get('window');
// import SideBar from './Sidebar';

const ASPECT_RATIO = width / height;
const LATITUDE = 0;
const LONGITUDE = 0;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class Register extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isMapReady: false,
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      users: [],
      me: null,
      mystatus: null,
    };
  }

  closeDrawer() {
    this._drawer._root.close()
  };
  openDrawer() {
    this._drawer._root.open()
  };

  async componentDidMount() {
    await permission
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this._getDataFriends(user.uid)
        
        Geolocation.getCurrentPosition(
          position => {
            this.setState({
              region: {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
              }
            });
            console.log(this.state.region,'HKHKKKHK')
            this._updateLocation(user.uid, position.coords)
          },
          (error) => console.warn(error.message),
          { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
        );
        this.watchID = Geolocation.watchPosition(
          position => {
            this.setState({
              region: {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
              }
            });
          }

        );
        console.log(user.uid===User.uid,'fhuuuuuuuuuuuuuuuuuuuuuuuuuuuuu')
      }

    })
  }
  _getDataFriends = (uid) => {
    firebase.database().ref('users/').on('child_added', (result) => {
      let person = result.val();
      console.log(person,person.uid===User.uid,'PERSOOOOOOOOOOOOOOOOOOOOOOOOOOOOON')
      console.log(result.val().uid,'HUUFFFFFFFFF')
      User.region=person.region
      // if(person.uid===User.uid) {
      //   User.region=result.val().region
      // console.log(User.region,'BISMILLAH')
      // }
      
      // let position=person.uid===User.uid?User.region=person.region:'SALAH'
      // console.log(position,'SSAAAAAAAAAAAAAAAAAAAAAA')
      person.uid = result.key;
      if (person.uid !== uid) {
        this.setState((prevState) => {
          return {
            users: [...prevState.users, person]
          }
        });

      }
      else {
        let person = result.val()
        person.uid = result.key
        this.setState({ me: person })
      }
    })
  }

  _updateLocation = (uid, location) => {
    firebase.database().ref('users/' + uid).update({
      region: {
        latitude: location.latitude,
        longitude: location.longitude,
        status: 'online'
      }
    })
    this.setState({ mystatus: 'online' })
  }
  onMapLayout = () => {
    this.setState({ isMapReady: true });
  }
  render() {
    console.log(User.region,'GJGJJGJJ')
    return (
      // <Drawer
      //   ref={(ref) => { this._drawer = ref; }}
      //   content={<SideBar navigation={this.props.navigation} />}
      //   onClose={() => this.closeDrawer()} >
      //   <Container>
      //     <Header>
      //       <Left>
      //         <Button transparent onPress={() => this.openDrawer()}>
      //           <Icon name='menu' />
      //         </Button>
      //       </Left>
      //       <Body>
      //         <Title>My Maps</Title>
      //       </Body>
      //       <Right />
      //     </Header>
      <View style={styles.container}>
        <Header style={styles.header}>
          
          <Body>
            <Title style={styles.titleHeader}>Peta Kita</Title>
          </Body>
          
        </Header>
        <MapView
          ref={(MapView) => { this.MapView = MapView }}
          provider={PROVIDER_GOOGLE}
          style={styles.maps}
          showsUserLocation={false}
          region={this.state.region}
          onLayout={this.onMapLayout}
        >

          <MapView.Marker
            title="Anda"
            description={this.state.mystatus}
            image={pin2}
            coordinate={this.state.region}
          />

          {
            this.state.users.map(data => (
              console.log(data, 'HHALOOOOOOOOOOOOOOOOO'),
              <MapView.Marker
                title={data.name}
                description={data.region.status}
                image={pin}
                coordinate={{
                  latitude: data.region.latitude,
                  longitude: data.region.longitude,
                  latitudeDelta: 0.0043,
                  longitudeDelta: 0.0034
                }}
                onCalloutPress={() => {
                  this.props.navigation.navigate('Chat', data);
                }}
              >

              </MapView.Marker>
            ))
          }

        </MapView>
      </View>
      // </Container>
      // </Drawer>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  maps: {
    flex: 1,
    height: height,
    width: width,

  },
  header: {
    backgroundColor: 'skyblue',
    width: 360,
    height: 50,

  },
  
  titleHeader: {
    color: 'blue',
    fontSize: 18,
    marginLeft:130
  },
})

