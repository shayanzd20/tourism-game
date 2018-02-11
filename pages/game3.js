import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TouchableHighlight,
  TouchableWithoutFeedback ,
  Image,
  Dimensions,
  UIManager,
  Platform,
  LayoutAnimation,
  ImageBackground,
} from 'react-native';
import * as Progress from 'react-native-progress';
import Video from 'react-native-video';
import { Button } from 'react-native-elements';
// import { Video } from 'expo';
import { connect } from 'react-redux';
import {
  questionThreeProgressUpdate,
  questionThreeResultUpdate,
  questionThreeAnswerUpdate,
  questionThreeQuestionUpdate,
  questionThreeAltsUpdate,
  questionThreeModalUpdate,
  questionThreeStop,
  updateThirdScore
} from '../src/actions';
import ModalPrize from './components/ModalPrize';

const widthPic = Dimensions.get('window').width;
const width = Dimensions.get('window');
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
        // this.animate();
        // console.log('this is question Three props:', this.props);
        // console.log(this.props);
        if (this.props.img) {
          this.props.questionThreeQuestionUpdate(this.props.video);
        }
        if (this.props.answer) {
          this.props.questionThreeAnswerUpdate(this.props.answer);
        }
        const altsObj = JSON.parse(this.props.alts);
        // console.log('alts Three', altsObj);
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
      let interval = null;

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
          // console.log('get user Status start api');
          // console.log('get user Status:', responseJson);

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
      // console.log('this is option:', ans);
      // console.log('this is this.answer:', this.answer);
      // console.log('this is answer:', this.props.answer);

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
        this.stopVideo(true);
        this.sendAnswer(ans, 1);
        this.props.updateThirdScore({ scoreThird: 100, q_third: true, dis_touch_third: true });
        LayoutAnimation.configureNext(CustomLayoutSpring);
        this.props.questionThreeResultUpdate(true, 'آفرین 100 امتیاز گرفتی', 'correct');
        this.props.questionThreeModalUpdate(true);
      } else {
        // this.setState({result:false})
        // LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
        this.stopVideo(true);
        this.sendAnswer(ans, 0);
        this.props.updateThirdScore({ scoreThird: 50, q_third: true, dis_touch_third: false });
        LayoutAnimation.configureNext(CustomLayoutSpring);
        this.props.questionThreeResultUpdate(false, 'اشتباه کردی 50 امتیاز بیشتر نگرفتی', 'incorrect');
        this.props.questionThreeModalUpdate(true);
      }

      // console.log('this is result:', this.props.result);
      // clearInterval(interval);
      // console.log('interval cleared');
    };

    stopVideo = (input) => {
      console.log('video stopped');
      this.props.questionThreeStop(input);
    }

    onBuffer() {
      console.log('buffering');
    }
    loadStart() {
      console.log('loadStart');
    }
    setDuration() {
      console.log('setDuration');
    }
    setTime() {
      console.log('setTime');
    }
    onEnd() {
      console.log('onEnd');
    }
    videoError() {
      console.log('videoError');
    }

      // onLoadStart={this.loadStart}            // Callback when video starts to load
      // onLoad={this.setDuration}               // Callback when video loads
      // onProgress={this.setTime}               // Callback every ~250ms with currentTime
      // onEnd={this.onEnd}                      // Callback when playback finishes
      // onError={this.videoError}

  render() {
    const videoGame = 'http://velgardi-game.ir/' + this.props.video;
    const len = videoGame.length;
    const videoGameStr = videoGame.substr(0, len - 4);
    console.log('videoGame:::', videoGame);
    console.log('videoGameStr:::', videoGameStr);
    console.log(videoGame);
    console.log(typeof videoGame);


    return (

      <View style={styles.main}>

        {/* progress bar component start */}
        <View style={styles.progressBar}>
          <ImageBackground
          style={styles.frameProgress}
          resizeMode='cover'
          source={require('./../images/game2/progressBar.png')}
          >
            <Progress.Bar
            progress={this.props.progress}
            indeterminate={false}
            width={widthPic * 0.88}
            height={15}
            zIndex={1000}
            // borderColor='green'
            borderWidth={0}
            // backgroundColor='yellow'
            color='#3bba25' />
          </ImageBackground>
        </View>
        {/* view for progress bar end*/}

        {/* view for frame and video start*/}
        <View style={{flex:7, alignItems: 'center',justifyContent: 'center',
        // backgroundColor:'#037BC8'
        }}>
          <ImageBackground
            style={{
              width: widthPic,
              height: widthPic * 1.5,
              margin: widthPic,
              alignItems: 'center',
            }}
            resizeMode='contain'
            source={require('./../images/game3/curtain.png')}>

            <Video

              // source={{ uri: 'https://media.w3.org/2010/05/sintel/trailer.mp4' }}
              // source={{ uri: 'http://d23dyxeqlospsv.cloudfront.net/big_buck_bunny.mp4' }}
              // source={{ uri: 'http://techslides.com/demos/sample-videos/small.mp4' }}
              // source={{ uri: "https://player.vimeo.com/external/207277102.hd.mp4?s=6939b93ae3554679b57f5e7fa831eef712a74b3c&profile_id=119&oauth2_token_id=57447761", }}
              // source={{ uri: 'https://player.vimeo.com/external/206340985.hd.mp4?s=0b055000e30067f11d3e2537bceb7157b47475bc&profile_id=119&oauth2_token_id=57447761' }}
              // source={{ uri: 'http://falcon479.startdedicated.com/files/round_boxes.mp4' }}
              source={{ uri: 'http://balootmobile.org/video/movie_x264.mp4' }}


              // source={{ uri: 'http://velgardi-game.ir/api/get_video?path=' + this.props.video }}
              // source={{ uri: 'https://balootmobile.org/velgardi/get_video.php?path=' + this.props.video }}
              // source={{ uri: videoGameStr }}
              source={{ uri: videoGame }}
                // source={require('./../videos/video_2017-06-24_01-00-30.mp4')}
                // source={require('./../videos/movie_x264.mp4')}
                paused={this.props.pause}
                resizeMode="contain"
                onBuffer={() => this.onBuffer()}
                onLoadStart={() => this.loadStart()}
                onLoad={() => this.setDuration()}
                onProgress={() => this.setTime()}
                onEnd={() => this.onEnd()}
                onError={() => this.videoError()}
                repeat={false}
                playInBackground={false}
                style={{
                  position: 'absolute',
                  top: 0,
                  // left: 50,
                  bottom: 0,
                  // right: 0,
                  // backgroundColor: 'blue',
                  width: widthPic * 0.9
                }}
             />
         </ImageBackground>
        </View>
        {/* view for frame and video end*/}

        {/* view for buttons start*/}
        <View style={styles.buttonsSection}>

        {/* first row of buttons start*/}
          <View style={styles.buttonsFirstRow}>
            <Button
              buttonStyle={[styles.button, {
                left: 10
              }]}
              backgroundColor='#FFA129'
              fontFamily='BYekan'
              onPress={() => { this.checkAnswer(1); }}
              onLongPress={() => { this.checkAnswer(1); }}
              title={this.props.alts.altOne}
              accessibilityLabel="This sounds great!"
            />
            <Button
              buttonStyle={[styles.button, {
                right: 10
              }]}
              backgroundColor='#FFA129'
              fontFamily='BYekan'
              onPress={() => { this.checkAnswer(2); }}
              onLongPress={() => { this.checkAnswer(2); }}
              title={this.props.alts.altTwo}
              accessibilityLabel="This sounds great!"
            />
          </View>
          {/* first row of buttons end*/}

          {/* second row of buttons start*/}
          <View style={styles.buttonsSecondRow}>
            <Button
              buttonStyle={[styles.button, {
                left: 10
              }]}
              backgroundColor='#FFA129'
              fontFamily='BYekan'
              onPress={() => { this.checkAnswer(3); }}
              onLongPress={() => { this.checkAnswer(3); }}
              title={this.props.alts.altThree}
              accessibilityLabel="This sounds great!"
            />
            <Button
              buttonStyle={[styles.button, {
                right: 10
              }]}
              backgroundColor='#FFA129'
              fontFamily='BYekan'
              onPress={() => { this.checkAnswer(4); }}
              onLongPress={() => { this.checkAnswer(4); }}
              title={this.props.alts.altFour}
              accessibilityLabel="This sounds great!"
            />
          </View>
          {/* second row of buttons end*/}

        </View>
        {/* view for buttons end*/}

        {/* modal start */}
        <View>
          <ModalPrize
            text={this.props.text_modal}
            visible={this.props.modal_visible}
            status={this.props.status}
          />
        </View>
      {/* modal ends */}
      </View>

    );
  }
}

const styles = StyleSheet.create({

  main: {
    flex: 1,
    backgroundColor: '#f25e2e',

  },
  progressBar: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor:'yellow',
  },
  frameAndPicture: {
    flex: 7,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: '#037BC8',
    paddingLeft: 10,
    paddingRight: 10,
    // padding:80,
    // margin:10,
  },
  frameAndPictureContainer: {
    padding: 10,
    paddingLeft: 10,
    paddingRight: 10,
    // margin: 100,
    // backgroundColor: 'green',
    // width: widthPic,

    // backgroundColor:'#037BC8',
    // resizeMode: 'cover',
    // resizeMode: 'contain',
    // resizeMode: 'stretch',

  },
  frame: {
    width: widthPic,
    // height: widthPic,
    // width: 350,
    // height: 350,
    // margin:10,
    // marginLeft :10 ,
    // marginRight :10 ,
    // resizeMode: 'cover',
    // resizeMode: 'contain',
    // resizeMode: 'stretch',
    // padding:40,
    // paddingLeft:20,
    // paddingTop:20,
    // paddingRight:40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  frameProgress: {
    width: widthPic,
    // height: widthPic,
    // width: 350,
    height: heightPic * 0.078,
    // margin:10,
    // marginLeft :10 ,
    // marginRight :10 ,
    // resizeMode: 'cover',
    // resizeMode: 'contain',
    // resizeMode: 'stretch',
    // padding:40,
    // paddingLeft:20,
    // paddingTop:20,
    // paddingRight:40,
    justifyContent: 'center',
    alignItems: 'center',
  },
picture: {
    // alignSelf : 'stretch',
    // minHeight :30,
    // width: widthPic,
    // height: widthPic,
    width: widthPic * 0.9,
    height: widthPic * 0.9,
    // borderRadius: 10,
    // marginLeft:10,
    // marginRight:10,
    // paddingLeft :10,
    // paddingRight :10,
    // width:widthPic,
    // padding:1,
    // height:widthPic,
    // margin:widthPic*0.04,
    resizeMode: 'contain',
    // resizeMode:'center',
    // resizeMode:'cover',
    // flex : 1,
    overflow: 'hidden',
  },
  buttonsSection: {
    flex: 5,
    width: widthPic,
    height: widthPic * 0.55 * 1.2,
    // width:widthPic,
    // height:widthPic*0.55*1.2,
    // alignItems: 'baseline',
    // alignItems: 'flex-start',
    alignItems: 'center',
    justifyContent: 'space-around',
    // backgroundColor:'#FFAAE3',
    // padding:widthPic*0.01,
    // paddingLeft :10,
    // paddingRight :10,
    padding: widthPic * 0.01

  },
  buttonsFirstRow: {
    // flex:1,
    flexDirection: 'row',
    // justifyContent: 'center',
    // justifyContent: 'space-around',
    // justifyContent: 'space-between',
    // alignItems:'center',
    // marginLeft:30,
    // margin:10,
    // padding:10,
    // backgroundColor:'yellow',
    // overflow: 'hidden',
  },
  buttonsSecondRow: {
    flexDirection: 'row',
    // justifyContent: 'center',
    // justifyContent: 'space-between',
    // justifyContent: 'space-between',
    // alignItems:'center',
    // padding: 10,
    // marginLeft:30,
    // paddingRight:20,
    // paddingLeft:30,
    // backgroundColor:'blue'
  },
  button: {
    // width: 70,
    // height: 70,
    width: widthPic * 0.43,
    height: widthPic * 0.3,
    borderRadius: 10,
    borderColor: '#303838',
    // marginLeft:0,
    borderWidth: 1,
    overflow: 'hidden',
  }
});

const mapStateToProps = ({ auth, q_three }) => {
  // console.log('this is question three state:', q_three);
  const { token } = auth;

  const {
    video,
    answer,
    alts,
    progress,
    result,
    modal_visible,
    text_modal,
    status,
    pause
   } = q_three;

  return {
    token,
    video,
    answer,
    alts,
    progress,
    result,
    modal_visible,
    text_modal,
    status,
    pause
   };
  };


export default connect(mapStateToProps, {
  questionThreeProgressUpdate,
  questionThreeResultUpdate,
  questionThreeAnswerUpdate,
  questionThreeQuestionUpdate,
  questionThreeAltsUpdate,
  questionThreeModalUpdate,
  questionThreeStop,
  updateThirdScore
})(Game3);
