/* @flow */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  Dimensions,
  ToastAndroid,
  AsyncStorage
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Kohana } from 'react-native-textinput-effects';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Button } from 'react-native-elements';
import {
  numberChanged,
  tokenChanged,
  visibleChanged,
  digitsChanged,
  digitTextChanged,
  realNumberChanged,
  userStatusChanged,
} from '../src/actions';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

console.log('width:', deviceWidth);
console.log('height:', deviceHeight);

// consts

/* ----------- functions ------------- */

class LoginPage extends Component {

  static navigationOptions = {
    title: 'choose destination city',
    header: null
  };

// functions helper
onNumberInputChange(number) {
  this.props.numberChanged(number);
}

onDigitInputChange(digit) {
  this.props.digitTextChanged(digit);
}

login() {
  this.props.visibleChanged(true);
    fetch('http://velgardi-game.ir/api/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        number: this.props.number
      })
    })
      .then((response) => response.json())
      .then((responseJson) => {
        try {
          AsyncStorage.setItem('number', this.props.number, () => {
              AsyncStorage.getItem('number', (err, result) => {
                console.log('get number:', result);
              });
          });
        } catch (error) {
          console.log('set Item error:', error);
          // Error saving data
        }

        if (responseJson.result === true) {
          this.props.visibleChanged(false);
          this.props.digitsChanged(true);
          console.log('digitStateAfter:', this.props.digits);
          ToastAndroid.show('کد پیامک شده را وارد نمایید', ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
        }
        // return responseJson;
      })
      .catch((error) => {
        console.error('error:', error);
      });
  }

verification() {
  AsyncStorage.getItem('number', (err, result) => {
    this.props.realNumberChanged(result);
    console.log('verification api');
    this.props.visibleChanged(true);
      fetch('http://velgardi-game.ir/api/register', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          number: this.props.realNumber,
          verification: this.props.digitText
        })
      })
        .then((response) => response.json())
        .then((responseJson) => {
          console.log('//successfully get token//');
          console.log('this is token:', responseJson.token);

           // store token
          AsyncStorage.setItem('token', responseJson.token, () => {
              AsyncStorage.getItem('token', (err, res) => {
                console.log('get token:', res);
                // if got token => send api to get status of user in order to route
                // it to appropriate location
                this.userStatus();
              });
          });
        })
        .catch((error) => {
          console.error('error:', error);
        });
  });
}

userStatus() {
  console.log('/ ------- userStatus helper function ------- /');
  // this.setState({ visible: true });
  this.props.visibleChanged(true);
  AsyncStorage.getItem('token', (err, result) => {
    this.props.tokenChanged(result);
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
        console.log('/ ----------- get user Status start api in login page --------/');
        // console.log('get user Status in login page:', responseJson);
        console.log('responseJson.status in login page:', responseJson.status);
        if (responseJson.status === '') {
          console.log('/----go to sourceScreen----/');
          Actions.sourceScreen();
        } else {
          this.props.userStatusChanged(responseJson.status);
          console.log('/----go to city----/');
          Actions.city();
        }
      })
      .catch((error) => {
        console.error('error:', error);
      });
  });
}

digitText() {
    return (
      <View>
      <Text
        style={styles.title}
        textStyle={{
          color: 'black',
          fontFamily: 'BYekan' }}>
          کد چهاررقمی پیامک شده را وارد نماید
        </Text>
      </View>
    );
}

digitInput() {
    return (
      <View style={{ flex: 2 }}>
        <Kohana
          style={[styles.input, { backgroundColor: 'white', padding: 10, margin: 30 }]}
          label={'Digit'}
          iconClass={FontAwesome}
          iconName={'lock'}
          iconColor={'#ddd'}
          iconColor={'#f4d29a'}
          labelStyle={{ color: '#91627b' }}
          inputStyle={{ color: '#91627b' }}
          keyboardType="numeric"
          // onChangeText={(digitText) => this.setState({ digitText })}
          onChangeText={this.onDigitInputChange.bind(this)}
          value={this.props.digitText}
        />
      </View>
    );
}

numberText() {
    return (
      <View>
      <Text
        style={styles.title}
        textStyle={{ color: 'black', fontFamily: 'BYekan' }}>شماره تلفن خود را وارد کنید</Text>
      </View>
    );
}

numberInput() {
    return (
      <View style={{ flex: 2 }}>
        <Kohana
          style={[styles.input, { backgroundColor: 'white', padding: 10, margin: 30 }]}
          label={'شماره تلفن'}
          iconClass={FontAwesome}
          iconName={'phone'}
          iconColor={'#ddd'}
          iconColor={'#f4d29a'}
          labelStyle={{ color: '#91627b' }}
          inputStyle={{ color: '#91627b' }}
          keyboardType="numeric"
          onChangeText={this.onNumberInputChange.bind(this)}
          value={this.props.number}
        />
      </View>
    );
}

loginButton() {

  console.log('< ----------- loginButton ------------------>');
  console.log('this.mapStateToProps.number:', this.props.number);
    return (
      <View
        style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20
      }}
      >
        <Button
        backgroundColor='#FFA129'
        buttonStyle={styles.button} fontFamily='BYekan'
        onPress={() => this.login()}
        title="ارسال"
        accessibilityLabel="This sounds great!"
      />
      </View>
    );
}

verificationButton(){
    return (
      <View
        style={{ flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20 }}
      >
        <Button
        backgroundColor='#FFA129'
        buttonStyle={styles.button}
        fontFamily='BYekan'
        // onPress={() => this.verification(this.state.digitText)}
        onPress={this.verification.bind(this)}
        title="تایید"
        accessibilityLabel="This sounds great!" />
      </View>
    );
}


  render() {
    let text;
    let input;
    let button;
    if (this.props.digits === true) {
      text = this.digitText();
      input = this.digitInput();
      button = this.verificationButton();
    } else {
      // view function
      text = this.numberText();
      input = this.numberInput();
      button = this.loginButton();
    }

    return (
      <View>
        {/* <Spinner visible={this.state.visible} textContent={"Loading..."} textStyle={{color: '#FFF'}} /> */}

        {/* background image start*/}
        <ImageBackground
        style={{
            width: deviceWidth,
            height: deviceHeight,
            // resizeMode: 'cover',
            position: 'absolute',
          }}
        source={require('./../images/loginPage/background1.png')}>

            {/* logo and input section start*/}
            <View style={{ flex: 1, flexDirection: 'column' }}>

              {/* logo start*/}
              <View
                style={{ flex: 1,
                      justifyContent: 'center',
                      zIndex: 10,
                      // backgroundColor:'red'
                      }}>

                {/* logo image */}
                <Image
                style={{
                  width: deviceWidth / 3,
                  margin: deviceWidth / 8,
                  marginTop: 110,
                  marginLeft: 120,
                  resizeMode: 'contain',
                  }}
                source={require('./../images/loginPage/logo.png')} />
              </View>
              {/* logo end*/}

              {/* number input and button start*/}
              <View style={{ flex: 1 }}>
               <View style={{ flex: 1, margin: 10, bottom: -20 }}>
                {text}
               </View>
                {input}
                {button}
              </View>
              {/* number input and button end*/}

            {/* section sculptures start */}
            <View
              style={{ flex: 1,
              // backgroundColor:'blue'
            }}>
              <Image
                style={{
                width: deviceWidth,
                marginBottom: 0,
                resizeMode: 'contain',
                }}
                source={require('./../images/loginPage/scalpture.png')}
              />
            </View>
            {/* section sculptures end */}

          </View>
          {/* logo and input section end*/}

        </ImageBackground>
        {/* background image end*/}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card2: {
    padding: 16,
  },
  input: {
  marginTop: 4,
},
title: {
  paddingBottom: 16,
  textAlign: 'center',
  color: '#404d5b',
  fontSize: 30,
  fontWeight: 'bold',
  opacity: 0.8,
  fontFamily: 'BYekan'
},
button: {
  width: 120,
  height: 50,
  backgroundColor: '#FFA129',
  borderRadius: 10,
  borderColor: '#303838',
  borderWidth: 1,
  // padding: 10,
  // marginBottom: 20,
  shadowColor: '#303838',
  // shadowOffset: {width: 50,height: 10},
  shadowRadius: 10,
  shadowOpacity: 0.9,
  // justifyContent: 'center',
  // alignItems: 'center',
},
});
const mapStateToProps = ({ auth, user }) => {
  console.log('this is auth text:', auth);
  const { number, digits, visible, realNumber, token, digitText } = auth;
  const { user_status } = user;
  // console.log('this is email text:', email);
  // console.log('this is error text:', error);
  // console.log('this is return :', { email, password, error });

  return { number, digits, visible, realNumber, token, digitText, user_status };
  };

export default connect(mapStateToProps,
  { numberChanged,
    tokenChanged,
    visibleChanged,
    digitsChanged,
    digitTextChanged,
    realNumberChanged,
    userStatusChanged })(LoginPage);
