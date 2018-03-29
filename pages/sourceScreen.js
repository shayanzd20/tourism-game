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
  AsyncStorage
} from 'react-native';

// import { Select, Option } from 'react-native-chooser';
// import Picker from 'react-native-picker';
import { Button } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import { connect } from 'react-redux';
import ModalPicker from 'react-native-modal-picker';
import { Actions } from 'react-native-router-flux';
import {
  sourceCity,
  updateCities,
  updateTickets
} from '../src/actions';


const widthPic = Dimensions.get('window').width;
const width = Dimensions.get('window');
const heightPic = Dimensions.get('window').height;

class SourceScreen extends Component {

  static navigationOptions = {
    title: 'شروع بازی',
    header: null
  };


  constructor(props) {
    super(props);
    this.state = {
        slide: new Animated.ValueXY({ x: 0, y: 0 }),
        visible: false
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

  ///////////////
componentWillMount() {
  ///// older get token
  // AsyncStorage.getItem('token', (err, result) => {
  //   console.log('get token in source screen:', result);
  //   if (result) {
  //     this.state.token = result;
  //     this.userStatus();
  //   } else {
  //     this.props.navigation.navigate('Login', responseJson)
  //   }
  // });
  if (this.props.token) {
    this.userStatus();
  } else {
    // this.props.navigation.navigate('Login', responseJson)
    Actions.pop();
    Actions.auth();
  }
}

componentDidMount() {
  this.slideIn.start();
}

userStatus() {
  console.log('/ ------- userStatus function in sourceScreen------- /');
    fetch('http://velgardi-game.ir/api/status', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.props.token
      }
    }).then((response) => response.json())
      .then((responseJson) => {
        console.log('/ ----------- get user Status start api in source screen --------/');
        console.log('responseJson.status in in source screen:', responseJson.status);
        if (responseJson.status === '') {
          console.log('/----go to sourceScreen----/');
        } else {
          this.props.userStatusChanged(responseJson.status);
          console.log('/----go to city----/');
          Actions.pop();
          Actions.city();
        }
      })
      .catch((error) => {
        console.error('error:', error);
      });
}

updateCity = (city) => {
   this.props.sourceCity(city.label)
   // this.sendSource(city.label);
}

sendSource = (city) => {
  fetch('http://velgardi-game.ir/api/ticket', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.props.token
    },
    body: JSON.stringify({
      city: city
    })
  })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log('responseJson in sourceScreen:', responseJson);
      // update tickets
      this.props.updateTickets(responseJson);
      Actions.pop();
      Actions.cityChoose();
    })
    .catch((error) => {
      console.error('error:', error);
    });
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
            <View
              style={{
                position: 'absolute',
                alignItems: 'center',
                margin: Dimensions.get('window').width * 0.1,
                marginTop: Dimensions.get('window').width * 0.25,
                left: 0,
                right: 0,
                // backgroundColor: 'red'
              }}>
              <View
                style={{
                  flex: 1,
                  // justifyContent: 'space-around',
                  // justifyContent: 'space-around',
                  // resizeMode: 'contain',
                  padding: 10,
                  // fontFamily: 'BYekan'
                }}>
                   <ModalPicker
                       data={this.props.cities}
                       // data={data}
                       style={{
                         // fontFamily: 'BYekan'
                         // borderColor: 'black'
                         backgroundColor: 'white',
                         // borderWidth: widthPic * 0.5
                         width: widthPic * 0.5,
                         // height: 50
                        }}
                        // selectStyle={{
                        //   height: 50
                        // }}

                        // selectTextStyle={{
                        //   height: 50
                        // }}
                        //
                        // overlayStyle={{
                        //   height: 50
                        // }}
                        //
                        // sectionStyle={{
                        //   height: 50
                        // }}
                        //
                        // sectionTextStyle={{
                        //   height: 50
                        // }}
                        //
                        // optionStyle={{
                        //   height: 50
                        // }}
                        // optionTextStyle={{
                        //   height: 50
                        // }}
                       // textStyle={{ fontFamily: 'BYekan' }}
                       initValue="شهر مبدا را انتخاب کنید"
                       onChange={(option) => { this.updateCity(option); }} />
               </View>
              <Button
                backgroundColor='#FFA129'
                buttonStyle={styles.button} fontFamily='BYekan'
                onPress={() => this.sendSource(this.props.city)}
                title="شروع سفر"
                accessibilityLabel="This sounds great!"
              />
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
  }
});

const mapStateToProps = ({ auth, source }) => {
  console.log('this is source object in source city:', source);

  const { token } = auth;
  const { city, cities } = source;

  return { city, cities, token };
  };

export default connect(mapStateToProps, { sourceCity, updateCities, updateTickets })(SourceScreen);
