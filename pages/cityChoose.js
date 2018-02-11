import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  Picker,
  Alert,
  TouchableHighlight,
  TouchableWithoutFeedback ,
  TouchableNativeFeedback,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import * as Animatable from 'react-native-animatable';


const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

console.log('width:', deviceWidth);
console.log('height:', deviceHeight);

// consts
const slideInCustom = {
  0: {
    translateX: 0,
  },
  0.5: {
    translateX: 100,
  },
  1: {
    translateX: 0,
  },
};

class CityChoose extends React.Component {

  static navigationOptions = {
    title: 'choose destination city',
    header: null
  };


  render() {
    return (

<View>
  <Image
    style={{
      // flex: 1,
      width: deviceWidth,
      height: deviceHeight,
      // flexBasis:'auto',
      // flexShrink:10,
      // marginTop:0,
      // marginBottom:100,
      // marginLeft:0,
      // aspectRatio:2000,
      // top:0,
      // bottom:0,
      // display:'none',
      // maxHeight:deviceHeight,
      // paddingBottom:deviceHeight,
      // marginBottom:deviceHeight,
        resizeMode: 'cover',
        // transform: 10,
      // backgroundColor:'transparent',

      position: 'absolute',
      // justifyContent:'center',
      // flexWrap:'wrap'

      }}
  source={require('./../images/chooseCity/background.png')}>

<View
style={{flex: 1, flexDirection: 'column'}}
>
<View
  style={{
    flex:1,
        // left:0,
        // right:0,
        // top:deviceHeight/8,
        // bottom:0,
        // position: 'absolute',
        justifyContent:'center',

        zIndex:10,
        // backgroundColor:'red'

      }}>

        <TouchableOpacity
        onPress={() => this.props.navigation.navigate('Isfahan', { user: 'Shayan11' })}
        onLongPress={() => console.log('hello11!')}
        >
              <Animatable.Image animation="bounceIn"
              // iterationCount="infinite"
              direction="normal"
              duration={2000}

              style={{
                width: deviceWidth/1.3,
                margin:deviceWidth/8,
                marginTop:110,
                resizeMode: 'contain',
             }}
              source={require('./../images/chooseCity/ticket.png')}
              />
          </TouchableOpacity>
</View>
          <View
            style={{
              flex:1,
              // justifyContent:'center',
                  // left:0,
                  // right:0,
                  // top:-deviceHeight/8,
                  // bottom:0,
                  // position: 'absolute',
                  zIndex:10,
                  // backgroundColor:'green',

                }}>

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Isfahan', { user: 'Shayan11' })}
            onLongPress={() => console.log('hello123!')}
          >
            <Animatable.Image animation="bounceIn"
              // iterationCount="infinite"
              direction="normal"
              duration={2000}
              delay={100}

              style={{
              width: deviceWidth/1.3,
              margin:deviceWidth/8,
              marginTop:-110,
              resizeMode: 'contain',
              }}
              source={require('./../images/chooseCity/ticket.png')}
            />
          </TouchableOpacity>
</View>

<View
style={{flex:1}}>
</View>
</View>
        </Image>
        <Animatable.Image animation={slideInCustom}
        // iterationCount="infinite"
        direction="normal"
        duration={40000}
        iterationCount="infinite"

        style={{
          marginTop:50,
          marginLeft:50,
          height: 50,
          resizeMode: 'contain'
       }}
        source={require('./../images/chooseCity/cloud.png')}
        />
        <Animatable.Image animation={slideInCustom}
        // iterationCount="infinite"
        direction="normal"
        duration={40000}
        iterationCount="infinite"

        style={{
          marginTop:0,
          marginLeft:0,
          height: 40,
          resizeMode: 'contain'
       }}
        source={require('./../images/chooseCity/cloud.png')}
        />
        <Animatable.Image animation="slideInLeft"
        // iterationCount="infinite"
        direction="normal"
        duration={20000}

        style={{
          marginTop:80,
          marginLeft:-60,
          height: 50,
          resizeMode: 'contain'
       }}
        source={require('./../images/chooseCity/cloud.png')}
        />

          <Animatable.Image animation="slideInLeft"
          // iterationCount="infinite"
          direction="normal"
          duration={40000}

          style={{
            marginTop:200,
            marginLeft:100,
            height: 30,
            resizeMode: 'contain'
         }}
          source={require('./../images/chooseCity/cloud.png')}
          />
        <Animatable.Image animation="slideInLeft"
        // iterationCount="infinite"
        direction="normal"
        duration={40000}

        style={{
          marginTop:10,
          marginLeft:40,
          height: 30,
          resizeMode: 'contain'
       }}
        source={require('./../images/chooseCity/cloud.png')}
        />
</View>

    );
  }
}

AppRegistry.registerComponent('CityChoose', () => CityChoose);
