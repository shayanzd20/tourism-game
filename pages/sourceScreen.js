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
  AsyncStorage
} from 'react-native';

import { Select, Option } from 'react-native-chooser';
// import Picker from 'react-native-picker';
import { Button } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import { connect } from 'react-redux';
import {
  sourceCity
} from '../src/actions';
import { Actions } from 'react-native-router-flux';


// import SplashScreen  from 'remobile/react-native-splashscreen';


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
    Actions.auth();
  }
}

componentDidMount() {
  this.slideIn.start();
}

userStatus() {
  console.log('userStatus api in source screen');
  this.setState({ visible: true });
  fetch('http://velgardi-game.ir/api/status', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.props.token
    }
  })
  .then((response) => response.json())
  .then((responseJson) => {
    console.log('get user Status start api in source screen');
    console.log('get user Status:', responseJson);

    ////////// store token

    // if responseJson.status == 'arrive' => go to city page with city params
    // this.props.navigation.navigate('City', { user: 'Shayan11' })
    if (responseJson.status === 'arrive') {
      this.props.navigation.navigate('City', responseJson)
    } else {
      // continue source screen
    }
  })
  .catch((error) => {
    console.error('error:', error);
  });
}

updateCity = (city) => {
   this.props.sourceCity(city)
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
                margin: Dimensions.get('window').width * 0.25,
                backgroundColor: 'red'
              }}>
              <Picker
                selectedValue={this.props.city}
                onValueChange={this.props.updateCity}
                style={{
                  backgroundColor: 'green'
                }}>
                <Picker.Item label = "Steve" value = "steve" />
                <Picker.Item label = "Ellen" value = "ellen" />
                <Picker.Item label = "Maria" value = "maria" />
              </Picker>
              <Text
                style={{
                        fontSize: 30,
                        alignSelf: 'center',
                        color: 'blue'
                         }}>{this.state.user}</Text>
              <Button
                backgroundColor='#FFA129'
                buttonStyle={styles.button} fontFamily='BYekan'
                onPress={() => this.props.navigation.navigate('City', { user: 'Shayan11' })}
                title="شروع سفر"
                accessibilityLabel="This sounds great!"
              />
            </View>

      </View>
    );
  }

  // onValueChange = (key: string, value: string) => {
  //               console.log('key:');
  // const newState = {};
  // newState[key] = value;
  // this.setState(newState);
  // };

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
  const { token } = auth;
  const { city } = source;

  return { city, token };
  };

export default connect(mapStateToProps, { sourceCity })(SourceScreen);
