import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Picker,
  Alert,
  TouchableHighlight,
  TouchableWithoutFeedback ,
  Image,
  Dimensions
} from 'react-native';
import * as Progress from 'react-native-progress';
import Video from 'react-native-video';
import { Button } from 'react-native-elements';




// consts
const onButtonPress = () => {
  Alert.alert('Button has been pressed!');
};

var widthPic= Dimensions.get('window').width;
var heightPic= Dimensions.get('window').height;


class Game3 extends React.Component {
  constructor() {
    super();

    this.state = {
      progress: 0,
      indeterminate: true,
    };
  }

  componentDidMount() {
    this.animate();
  }

  animate() {
  let progress = 0;
  this.setState({ progress });
    setInterval(() => {
      progress += 0.01;
      if (progress > 1) {
        progress = 1;
      }
      console.log("progress current setInterval:",progress);

      this.setState({ progress });

    }, 100);
}

  static navigationOptions = {
    title: 'choose destination city',
    header: null
  };

  render() {

    return (

      <View style={{flex: 1}}>
        <View style={{flex:1, alignItems: 'center',justifyContent: 'center',backgroundColor:'white'}}>
          <Progress.Bar progress={this.state.progress}
          indeterminate={false}
          width={widthPic} height={30}
          borderColor='green'
          color='#3bba25' />
        </View>
        <View style={{flex:7, alignItems: 'center',justifyContent: 'center',
        // backgroundColor:'#037BC8'
      }}>
          <Image
          style={{width:widthPic , height: widthPic*1.5 , margin:widthPic,resizeMode:'contain'}}
          source={require('./../images/game3/curtain.png')}>
            <Video
                source={require('./../videos/video_2017-06-24_01-00-30.mp4')}
                resizeMode="contain"
                repeat
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0
                }}

             />
         </Image>
        </View>
        <View style={{width:widthPic, height:widthPic*0.55*1.2, alignItems: 'center',justifyContent: 'center'
        // ,backgroundColor:'#FFAAE3'
        ,padding:widthPic*0.01}}>
        <View style={{
          // flex:1,
          flexDirection:'row'
          // flexDirection:'space-around'
          // flexDirection:'space-between'
        // ,justifyContent: 'center'
        // ,alignItems:'center'
        // ,marginLeft:30
        // ,
        // margin:10
        // ,backgroundColor:'yellow'
        }}>
          <Button
          buttonStyle={{
            width:widthPic*0.45,
            height:widthPic*0.3,
            borderRadius:10,
            borderColor:'#303838',
            borderWidth:1
          }}
          backgroundColor='#FFA129'
          fontFamily='BYekan'
          // onPress={() => this.props.navigation.navigate('City', { user: 'Shayan11' })}
          title="گزینه 1"
          accessibilityLabel="This sounds great!"

          />
          <Button
          buttonStyle={{
            width:widthPic*0.45,
            height:widthPic*0.3,
            borderRadius:10,
            borderColor:'#303838',

            borderWidth:1  }}
          backgroundColor='#FFA129'
          fontFamily='BYekan'
          // onPress={() => this.props.navigation.navigate('City', { user: 'Shayan11' })}
          title="گزینه 2"
          accessibilityLabel="This sounds great!"
          />
        </View>

        <View style={{
          flexDirection:'row',
          justifyContent: 'center',
          alignItems:'center',
          marginTop:10,
          marginLeft:30,
          // paddingRight:20,
          // paddingLeft:30

        }}>
          <Button
          buttonStyle={{
            width:widthPic*0.45,
            height:widthPic*0.3,
            borderRadius:10,
            borderColor:'#303838',
            // marginLeft:20,
            borderWidth:1  }}
          backgroundColor='#FFA129'
          fontFamily='BYekan'
          // onPress={() => this.props.navigation.navigate('City', { user: 'Shayan11' })}
          title="گزینه 3"
          accessibilityLabel="This sounds great!"
          />
          <Button
          buttonStyle={{
            width:widthPic*0.45,
            height:widthPic*0.3,
            borderRadius:10,
            borderColor:'#303838',
            borderWidth:1  }}
          backgroundColor='#FFA129'
          fontFamily='BYekan'
          // onPress={() => this.props.navigation.navigate('City', { user: 'Shayan11' })}
          title="گزینه 4"
          accessibilityLabel="This sounds great!"
          />
        </View>

        </View>
      </View>

    );
  }
}

const mapStateToProps = ({ auth, q_three }) => {
  console.log('this is question three state:', q_three);
  const { token } = auth;

  const {
    question,
    answer,
    alts,
    progress,
    result,
    modal_visible,
    text_modal,
    status
   } = q_three;

  return {
    token,
    question,
    answer,
    alts,
    progress,
    result,
    modal_visible,
    text_modal,
    status
   };
  };


export default connect(mapStateToProps, {
  questionThreeProgressUpdate,
  questionThreeResultUpdate,
  questionThreeAnswerUpdate,
  questionThreeQuestionUpdate,
  questionThreeAltsUpdate,
  questionThreeModalUpdate
})(Game3);
