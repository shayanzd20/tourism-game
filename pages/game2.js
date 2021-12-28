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
  ImageBackground
} from 'react-native';
import * as Progress from 'react-native-progress';
import { Button } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import CardView from 'react-native-cardview';
import { connect } from 'react-redux';
import {
  questionTwoProgressUpdate,
  questionTwoResultUpdate,
  questionTwoAnswerUpdate,
  questionTwoQuestionUpdate,
  questionTwoAltsUpdate,
  questionTwoModalUpdate,
  updateSecondScore
} from '../src/actions';
import ModalPrize from './components/ModalPrize';

// consts
const widthPic = Dimensions.get('window').width;
const heightPic = Dimensions.get('window').height;

class Game2 extends Component {

  static navigationOptions = {
    title: '',
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
    if (this.props.img) {
      this.props.questionTwoQuestionUpdate(this.props.img);
    }
    if (this.props.answer) {
      this.props.questionTwoAnswerUpdate(this.props.answer);
    }
    const altsObj = JSON.parse(this.props.alts);
    if (altsObj) {
      this.props.questionTwoAltsUpdate({
        altOne: altsObj[0].txt,
        altTwo: altsObj[1].txt,
        altThree: altsObj[2].txt,
        altFour: altsObj[3].txt
      });
    }
}

animate() {
  let progress = 0;

  this.props.questionTwoProgressUpdate(progress);
    interval = setInterval(() => {
      progress += 0.01;
      if (progress > 1) {
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

        this.props.updateSecondScore({ scoreSecond: 50, q_second: true, dis_touch_second: false });
        LayoutAnimation.configureNext(CustomLayoutSpring);
        this.props.questionTwoResultUpdate(false, 'متاسفانه زمان از دست رفت و 50 امتیاز بیشتر بدست نیاوردی', 'incorrect');
        this.props.questionTwoModalUpdate(true);
      }

      this.props.questionTwoProgressUpdate(progress);
    }, 100);
}

sendAnswer = (alt, status) => {
  fetch('http://velgardi-game.ir/api/sendAnswerQTwo', {
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
        game: 2 // number of game
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
    this.sendAnswer(ans, 1);
    this.props.updateSecondScore({ scoreSecond: 100, q_second: true, dis_touch_second: true });
    LayoutAnimation.configureNext(CustomLayoutSpring);
    this.props.questionTwoResultUpdate(true, 'آفرین 100 امتیاز گرفتی', 'correct');
    this.props.questionTwoModalUpdate(true);
  } else {
    this.sendAnswer(ans, 0);
    this.props.updateSecondScore({ scoreSecond: 50, q_second: true, dis_touch_second: false });
    LayoutAnimation.configureNext(CustomLayoutSpring);
    this.props.questionTwoResultUpdate(false, 'اشتباه کردی 50 امتیاز بیشتر نگرفتی', 'incorrect');
    this.props.questionTwoModalUpdate(true);
  }

  clearInterval(interval);
};

  render() {
    const imageQuestion = this.props.img;
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
            borderWidth={0}
            color='#3bba25' />
          </ImageBackground>
        </View>
        {/* view for progress bar end*/}

        {/* view for frame and picture start*/}
        <View style={styles.frameAndPicture}>
          <View style={styles.frameAndPictureContainer}>
            <Animatable.View
            animation="zoomInUp"
            duration={1000}
            useNativeDriver={true}
            >
            <CardView
              cardElevation={7}
              cardMaxElevation={7}
              cornerRadius={5}
              style={{
                justifyContent: 'center',
                alignItems: 'center'
              }}>
              <Image
                resizeMode="cover"
                style={styles.picture}
                source={{ uri: 'http://velgardi-game.ir/api/get_image?path=' + imageQuestion }}
                onLoadStart={() => {
                }}
              />
            </CardView>
          </Animatable.View>
          </View>
        </View>
        {/* view for frame and picture end*/}

        {/* view of buttons start */}
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
        {/* view of buttons end */}

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
    backgroundColor: '#0e9b6c',

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

const mapStateToProps = ({ auth, q_two }) => {

  const { token } = auth;

  const {
    img,
    answer,
    alts,
    progress,
    result,
    modal_visible,
    text_modal,
    status
   } = q_two;

  return {
    img,
    token,
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
  questionTwoProgressUpdate,
  questionTwoResultUpdate,
  questionTwoAnswerUpdate,
  questionTwoQuestionUpdate,
  questionTwoAltsUpdate,
  questionTwoModalUpdate,
  updateSecondScore
})(Game2);
