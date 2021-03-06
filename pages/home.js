import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Animated,
  TouchableOpacity,
  Dimensions,
  Picker,
  Text,
  Easing,
  TextInput,
  ScrollView,
  AsyncStorage,
  Image
} from 'react-native';

import { Button } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import { connect } from 'react-redux';
import ModalPicker from 'react-native-modal-picker';
import { Actions } from 'react-native-router-flux';
import ElevatedView from 'react-native-elevated-view'

import {
  sourceCity,
  updateCities,
  updateTickets,
  tokenChanged,
  userStatusChanged,
  coinUpdate,
  diamondUpdate,
  updateVideoCity
} from '../src/actions';


const widthPic = Dimensions.get('window').width;
const width = Dimensions.get('window');
const heightPic = Dimensions.get('window').height;

class Home extends Component {

  static navigationOptions = {
    title: 'شروع بازی',
    header: null
  };


  constructor(props) {
    super(props);
    AsyncStorage.getItem('token', (err, res) => {
      if (res) {
        this.props.tokenChanged(res);
        this.userStatus();
      } else {
        // console.log('doesnt have token token');

        Actions.replace('auth');
      }
    });

    this.state = {
        slide: new Animated.ValueXY({ x: 0, y: 0 }),
        visible: false,
        buttonGame: false

    }

    this.slideIn =  Animated.timing(
      this.state.slide,
      {
        toValue: { x: 100, y: 0 },
        duration: 10000,
        delay: 0,
        easing: Easing.in(Easing.ease)
      }
    )
  }
// functions

userStatus() {
  // console.log('/ ------- userStatus function in Home------- /');
    fetch('http://velgardi-game.ir/api/status', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.props.token
      }
    }).then((response) => response.json())
      .then((responseJson) => {
        // console.log('/ ----------- get user Status start api in source screen --------/');
        if (responseJson.status === '') {
          // console.log('/----status is empty in Home----/');
          this.setState = {
            buttonGame: true
          };
        } else {
          // console.log('/----go to city----/');
          this.props.userStatusChanged(responseJson.status);
          this.props.coinUpdate(responseJson.status.user.coin);
          this.props.diamondUpdate(responseJson.status.user.diamond);
        }
      })
      .catch((error) => {
        // console.error('error:', error);
      });
}

continueButton = () => {
  return (
    <Animatable.View
        animation="bounceIn"
        duration={1000}>
      <TouchableOpacity
        onPress={() => {
          Actions.replace('city');
        }}
      >
        <View
          elevation={24}
          style={styles.stayElevated}
        >
          <Text style={{ fontFamily: 'Mj_Classic' }}>ادامه بازی</Text>
        </View>
      </TouchableOpacity>
    </Animatable.View>

  );
}

newButton = () => {
  return (
    <Animatable.View
        animation="bounceIn"
        duration={1000}>

      <TouchableOpacity
        onPress={() => {
          Actions.replace('sourceScreen')
              }}>
        <View
          elevation={24}
          style={styles.stayElevated}
        >
          <Text style={{ fontFamily: 'Mj_Classic' }}>بازی جدید</Text>
        </View>
      </TouchableOpacity>
    </Animatable.View>

  );
}

render() {
    const randomImages = [
    require('./../images/Iran-Way-Map2.jpg'),
    require('./../images/Iran-Way-Map3.jpg'),
    require('./../images/Iran-Way-Map4.jpg')
    ];
    return (

      <View style={{ flex: 1 }}>
      <Animatable.Image
        animation="slideInUp"
        iterationCount="infinite"
        direction="alternate"
        duration={15000}
        style={{ position: 'relative',
                  resizeMode: 'cover',
                  width: Dimensions.get('window').width * 1.5,
                  height: Dimensions.get('window').height * 1.5,
                  top: -100,
                  opacity: 0.4
                  }}
        source={randomImages[Math.floor(Math.random() * randomImages.length)]} />

              <Image
                style={{
                  position: 'absolute',
                  left: 20,
                  top: 20,
                  width: 40,
                  height: 40,
                }}
                source={require('./../images/home/music-on.png')}
              />
            <View
              style={{
                position: 'absolute',
                flexDirection: 'row',
                paddingHorizontal: 20,
                top: 10,
                right: 10,
                width: 150,
                height: 75,
              }}>
              <View style={{ flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 5,

              }}>
                <Image
                style={{
                  width: 50,
                  height: 50,
                }}
                source={require('./../images/home/diamond.png')}
                />
                <Text style={{ fontFamily: 'Mj_Classic' }}>{this.props.diamond}</Text>
              </View>
                <View
                style={{
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingHorizontal: 5,

                }}>
                <Image
                  style={{
                    width: 50,
                    height: 50,
                  }}
                  source={require('./../images/home/coin.png')}
                />
                <Text style={{ fontFamily: 'Mj_Classic' }}>{this.props.coin}</Text>
              </View>
              </View>
            <View
              style={{
                position: 'absolute',
                alignItems: 'center',
                margin: Dimensions.get('window').width * 0.1,
                marginTop: Dimensions.get('window').width * 0.25,
                left: 0,
                right: 0,
              }}>
              {this.state.buttonGame ? this.newButton() : this.continueButton()}
            </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  BStyle: {
    width: 120,
    height: 50,
    borderRadius: 10,
    marginTop: 20
  },
  button: {
    width: 120,
    height: 50,
    backgroundColor: '#FFA129',
    borderRadius: 10,
    borderColor: '#303838',
    borderWidth: 1,
    padding: 10,
    marginTop: 20,
    shadowColor: '#303838',
    shadowOffset: { width: 50, height: 10 },
    shadowRadius: 10,
    shadowOpacity: 0.9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'BYekan',
  },
  stayElevated: {
    width: 120,
    height: 50,
    backgroundColor: '#FFA129',
    borderRadius: 10,
    borderColor: '#303838',
    borderWidth: 1,
    padding: 10,
    marginTop: 20,
    shadowColor: '#303838',
    shadowOffset: { width: 50, height: 10 },
    shadowRadius: 10,
    shadowOpacity: 0.9,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

const mapStateToProps = ({ auth, source, user }) => {

  const { token } = auth;
  const { city, cities } = source;
  const {
    user_status,
    coin,
    diamond
   } = user;

  return { city,
            cities,
            token,
            user_status,
            coin,
            diamond };
  };

export default connect(mapStateToProps, {
  sourceCity,
  updateCities,
  updateTickets,
  tokenChanged,
  userStatusChanged,
  coinUpdate,
  diamondUpdate,
  updateVideoCity })(Home);
