import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Animated,
  TouchableOpacity,
  Dimensions,
  Easing,
  AsyncStorage
} from 'react-native';

import { Select, Option } from 'react-native-chooser';
import { Button } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import { connect } from 'react-redux';

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
        token: '',
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
  AsyncStorage.getItem('token', (err, result) => {
    console.log('get token in source screen:', result);
    if (result) {
      this.state.token = result;
      this.userStatus();
    } else {
      this.props.navigation.navigate('Login', responseJson)
    }
  });
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
      Authorization: 'Bearer ' + this.state.token
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
              style={{ position: 'absolute',
                alignItems: 'center',
                margin: Dimensions.get('window').width * 0.25 }}>
              <Select
                  onSelect={this.onSelect.bind(this)}
                  defaultText="شهر خود را انتخاب کنید"
                  style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', borderWidth: 1, borderColor: "green" , borderRadius: 10 }}
                  textStyle={{ justifyContent: 'center', alignItems: 'center', fontFamily: 'BYekan' }}
                  backdropStyle={{ backgroundColor: '#f4b942', opacity: 0.9 }}
                  optionListStyle={{ backgroundColor: '#F5FCFF', borderRadius: 10, opacity: 0.9 }}
                  animationType={'fade'}         >
                <Option value={{ name: 'تهران' }}>	تهران</Option>
                <Option value={{ name: 'مشهد' }}>	مشهد</Option>
                <Option value={{ name: 'اصفهان' }}>اصفهان</Option>
                <Option value={{ name: 'کرج' }}>کرج</Option>
                <Option value={{ name: '	تبریز' }}>	تبریز</Option>
                <Option value={{ name: 'شیراز' }}>شیراز</Option>
                <Option value={{ name: 'اهواز' }}>اهواز</Option>
                <Option value={{ name: '	قم' }}>	قم</Option>
                <Option value={{ name: 'کرمانشاه' }}>کرمانشاه</Option>
              </Select>

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

const mapStateToProps = ({ auth, q_three }) => {

  const { } = q_three;

  return { };
  };

export default connect(mapStateToProps, {})(SourceScreen);
