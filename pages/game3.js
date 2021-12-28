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

        this.state = {
          progress: 0
        };
    }


    componentWillMount() {
        this.stopVideo(false);

        if (this.props.img) {
          this.props.questionThreeQuestionUpdate(this.props.video);
        }
        if (this.props.answer) {
          this.props.questionThreeAnswerUpdate(this.props.answer);
        }
        const altsObj = JSON.parse(this.props.alts);
        if (altsObj) {
          this.props.questionThreeAltsUpdate({
            altOne: altsObj[0].txt,
            altTwo: altsObj[1].txt,
            altThree: altsObj[2].txt,
            altFour: altsObj[3].txt
          });
        }
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
        })
        .catch((error) => {
          // console.error('error:', error);
        });

        let score = 0;
        score = status === 1 ? 100 : 50;
        // update diamond
        fetch('http://velgardi-game.ir/api/diamondUpdate', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + this.props.token
          },
          body: JSON.stringify({
            diamond: score,
            status: 1, // show plus or nagative
            game: 3 // number of game
          })
        })
          .then((response) => response.json())
          .then((responseJson) => {
              console.log('responseJson in game 1 ', responseJson);
          })
          .catch((error) => {
            // console.error('error:', error);
          });
    }

    checkAnswer = (ans) => {
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
        this.stopVideo(true);
        this.sendAnswer(ans, 1);
        this.props.updateThirdScore({ scoreThird: 100, q_third: true, dis_touch_third: true });
        LayoutAnimation.configureNext(CustomLayoutSpring);
        this.props.questionThreeResultUpdate(false, 'متاسفانه زمان از دست رفت و 50 امتیاز بیشتر بدست نیاوردی', 'incorrect');
        this.props.questionThreeModalUpdate(true);
      } else {
        this.stopVideo(true);
        this.sendAnswer(ans, 0);
        this.props.updateThirdScore({ scoreThird: 50, q_third: true, dis_touch_third: false });
        LayoutAnimation.configureNext(CustomLayoutSpring);
        this.props.questionThreeResultUpdate(false, 'اشتباه کردی 50 امتیاز بیشتر نگرفتی', 'incorrect');
        this.props.questionThreeModalUpdate(true);
      }

      clearInterval(interval);
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
      this.animate();


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

    animate() {
      let progress = 0;

        interval = setInterval(() => {
          progress += 0.01;
            if (progress > 1) {
              // progress = 1;
              clearInterval(interval);
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

              this.props.updateThirdScore({ scoreThird: 50, q_third: true, dis_touch_third: false });
              LayoutAnimation.configureNext(CustomLayoutSpring);
              this.props.questionThreeResultUpdate(false, 'متاسفانه زمان از دست رفت و 50 امتیاز بیشتر بدست نیاوردی', 'incorrect');
              this.props.questionThreeModalUpdate(true);
              }

              this.setState({ progress })
            }, 100);
          }


  render() {
    const videoGame = 'http://velgardi-game.ir/' + this.props.video;

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
            progress={this.state.progress}
            indeterminate={false}
            width={widthPic * 0.88}
            height={15}
            zIndex={1000}
            borderWidth={0}
            color='#3bba25' />
          </ImageBackground>
        </View>
        {/* view for progress bar end*/}

        {/* view for frame and video start*/}
        <View style={{flex:7, alignItems: 'center',justifyContent: 'center',
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
              source={{ uri: videoGame }}
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
                  bottom: 0,
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
  },
  frameAndPicture: {
    flex: 7,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
  frameAndPictureContainer: {
    padding: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  frame: {
    width: widthPic,
    justifyContent: 'center',
    alignItems: 'center',
  },
  frameProgress: {
    width: widthPic,
    height: heightPic * 0.078,
    justifyContent: 'center',
    alignItems: 'center',
  },
picture: {
    width: widthPic * 0.9,
    height: widthPic * 0.9,
    resizeMode: 'contain',
    overflow: 'hidden',
  },
  buttonsSection: {
    flex: 5,
    width: widthPic,
    height: widthPic * 0.55 * 1.2,
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: widthPic * 0.01

  },
  buttonsFirstRow: {
    flexDirection: 'row',
  },
  buttonsSecondRow: {
    flexDirection: 'row',
  },
  button: {
    width: widthPic * 0.43,
    height: widthPic * 0.3,
    borderRadius: 10,
    borderColor: '#303838',
    borderWidth: 1,
    overflow: 'hidden',
  }
});

const mapStateToProps = ({ auth, q_three }) => {
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
