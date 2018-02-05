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
  Dimensions,
  UIManager,
  Platform,
  LayoutAnimation,
  ImageBackground
} from 'react-native';
import * as Progress from 'react-native-progress';
import Video from 'react-native-video';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import {
  questionThreeProgressUpdate,
  questionThreeResultUpdate,
  questionThreeAnswerUpdate,
  questionThreeQuestionUpdate,
  questionThreeAltsUpdate,
  questionThreeModalUpdate,
} from '../src/actions';
import ModalPrize from './components/ModalPrize';

const widthPic = Dimensions.get('window').width;
const heightPic = Dimensions.get('window').height;


class Game3 extends Component {


  static navigationOptions = {
    title: 'choose destination city',
    header: null
  };

  constructor() {
        super();
        if (Platform.OS === 'android') {
          UIManager.setLayoutAnimationEnabledExperimental &&
          UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }


    componentWillMount() {
        this.animate();
        console.log('this is question Three props:', this.props);
        // console.log(this.props);
        if (this.props.img) {
          this.props.questionThreeQuestionUpdate(this.props.video);
        }
        if (this.props.answer) {
          this.props.questionThreeAnswerUpdate(this.props.answer);
        }
        const altsObj = JSON.parse(this.props.alts);
        console.log('alts Three', altsObj);
        if (altsObj) {
          this.props.questionThreeAltsUpdate({
            altOne: altsObj[0].txt,
            altTwo: altsObj[1].txt,
            altThree: altsObj[2].txt,
            altFour: altsObj[3].txt
          });
        }
    }

    animate() {
    let progress = 0;

    this.props.questionThreeProgressUpdate(progress);
      interval = setInterval(() => {
        progress += 0.01;
        if (progress > 1) {
          // progress = 1;
          clearInterval(interval);
        }
        console.log('progress current setInterval:', progress);

        this.props.questionThreeProgressUpdate(progress);
      }, 100);
    }

    sendAnswer = (alt, status) => {
      fetch('http://velgardi-game.ir/api/sendAnswerQThree', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.props.token
        },
        body: JSON.stringify({
          answer: alt,
          answer_status: status
        })
      })
        .then((response) => response.json())
        .then((responseJson) => {
          console.log('get user Status start api');
          console.log('get user Status:', responseJson);

          // store token
          // if responseJson.status == 'arrive' => go to city page with city params
          // this.props.navigation.navigate('City', { user: 'Shayan11' })
          // this.props.navigation.navigate('City', responseJson);

        })
        .catch((error) => {
          console.error('error:', error);
        });
    }

    checkAnswer = (ans) => {
      console.log('this is option:', ans);
      console.log('this is this.answer:', this.answer);
      console.log('this is answer:', this.props.answer);

      const CustomLayoutSpring = {
          duration: 400,
          create: {
            type: LayoutAnimation.Types.spring,
            property: LayoutAnimation.Properties.scaleXY,
            springDamping: 0.7,
          },
          update: {
            type: LayoutAnimation.Types.spring,
            springDamping: 0.7,
          },
        };

      if (ans === this.props.answer) {
        // this.setState({result:true})
        // LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
        this.sendAnswer(ans, 1);
        LayoutAnimation.configureNext(CustomLayoutSpring);
        this.props.questionThreeResultUpdate(true, 'آفرین 100 امتیاز گرفتی', 'correct');
        this.props.questionThreeModalUpdate(true);
      } else {
        // this.setState({result:false})
        // LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
        this.sendAnswer(ans, 0);
        LayoutAnimation.configureNext(CustomLayoutSpring);
        this.props.questionThreeResultUpdate(false, 'اشتباه کردی 50 امتیاز بیشتر نگرفتی', 'incorrect');
        this.props.questionThreeModalUpdate(true);
      }

      console.log('this is result:', this.props.result);
      clearInterval(interval);
    console.log('interval cleared');
    };

  render() {

    return (

      <View style={{flex: 1}}>
        <View style={{flex:1, alignItems: 'center',justifyContent: 'center',backgroundColor:'white'}}>
          <Progress.Bar progress={this.props.progress}
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
            {/* <Video
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

             /> */}
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
