import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
  ImageBackground,
  Dimensions,
  LayoutAnimation,
  Platform,
  UIManager,
  InteractionManager
} from 'react-native';
import * as Progress from 'react-native-progress';
import * as Animatable from 'react-native-animatable';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import {
  questionOneProgressUpdate,
  questionOneResultUpdate,
  questionOneAnswerUpdate,
  questionOneQuestionUpdate,
  questionOneAltsUpdate,
  questionOneModalUpdate,
  updateFirstScore
} from '../src/actions';
import ModalPrize from './components/ModalPrize';
// import ProgressBar from './components/ProgressBar';


// consts

const widthPic = Dimensions.get('window').width;
const heightPic = Dimensions.get('window').height;


class Game1 extends Component {

  static navigationOptions = {
    title: 'choose destination city',
    header: null
  };

constructor() {
    super();
    let interval = null;
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }

    this.state = {
      progress: 0
    };

}

componentWillMount() {
    this.animate();
    // console.log('game 1 params in construct:');
    // console.log('this is before error:');
    // console.log(this.props.question);
    if (this.props.question) {
      this.props.questionOneQuestionUpdate(this.props.question);
    }
    if (this.props.answer) {
      this.props.questionOneAnswerUpdate(this.props.answer);
    }
    const altsObj = JSON.parse(this.props.alts);
    // console.log('alts', altsObj);
    if (altsObj) {
      this.props.questionOneAltsUpdate({
        altOne: altsObj[0].img,
        altTwo: altsObj[1].img,
        altThree: altsObj[2].img,
        altFour: altsObj[3].img });
    }

    // InteractionManager.runAfterInteractions(() => {
    //    { modalRender }
    //   });
  }

// old animate
animate() {
  let progress = 0;
  // this.setState({  progress });
  // this.props.questionOneProgressUpdate(progress);
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

        this.props.updateOneScore({ scoreOne: 50, q_one: true, dis_touch_one: false });
        LayoutAnimation.configureNext(CustomLayoutSpring);
        this.props.questionOneResultUpdate(false, 'متاسفانه زمان از دست رفت و 50 امتیاز بیشتر بدست نیاوردی', 'incorrect');
        this.props.questionOneModalUpdate(true);
      }
      // console.log('progress current setInterval:', progress);

      this.setState({ progress });
        // this.props.questionOneProgressUpdate(progress);
    }, 100);
}

// helper Functions
sendAnswer = (alt, status) => {
  fetch('http://velgardi-game.ir/api/sendAnswerQOne', {
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
        game: 1 // number of game

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
    // LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    this.sendAnswer(ans, 1);
    this.props.updateFirstScore({ scoreFirst: 100, q_first: true, dis_touch_first: true });
    LayoutAnimation.configureNext(CustomLayoutSpring);
    this.props.questionOneResultUpdate(true, 'آفرین 100 امتیاز گرفتی', 'correct');
    this.props.questionOneModalUpdate(true);
    // clearInterval(interval);
  } else {
    // LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    this.sendAnswer(ans, 0);
    this.props.updateFirstScore({ scoreFirst: 50, q_first: true, dis_touch_first: false });
    LayoutAnimation.configureNext(CustomLayoutSpring);
    this.props.questionOneResultUpdate(false, 'اشتباه کردی 50 امتیاز بیشتر نگرفتی', 'incorrect');
    this.props.questionOneModalUpdate(true);
  }

  // this.props.questionOneProgressUpdate(0);
  clearInterval(interval);

  // console.log('this is result:', this.props.result);
};

render() {
    // console.log('state:::::', Date.now(), this.state)
    // console.log('width:', widthPic);
    // console.log('height:', heightPic);

    // const transform = this.animated.interpolate({
    //   inputRange: [0, 1],
    //   outputRange: [0, 1]
    // })

    return (

      <View style={styles.main}>

        {/* progress bar component start */}
        <View style={styles.progressBar}>
          <ImageBackground
          style={styles.frame}
          // resizeMode='contain'
          resizeMode='cover'
          source={require('./../images/game1/progressBar.png')}
          >
            {/* old progress bar */}
            <Progress.Bar
            progress={this.state.progress}
            indeterminate={false}
            width={widthPic * 0.88}
            height={15}
            zIndex={1000}
            // borderColor='green'
            borderWidth={0}
            // backgroundColor='yellow'
            color='#3bba25' />

            {/* <ProgressBar
            progress={this.props.progress}
            backgroundStyle={{backgroundColor: "#EEE"}}
            progressStyle={{backgroundColor: "blue"}}
            incompleteStyle={{backgroundColor: "white"}} /> */}

            {/* <Progress.Bar
            progress={transform}
            indeterminate={false}
            width={widthPic * 0.88}
            height={15}
            zIndex={1000}
            // borderColor='green'
            borderWidth={0}
            // backgroundColor='yellow'
            color='#3bba25' /> */}
          </ImageBackground>
        </View>
        {/* progress bar component end */}

        {/* question card component start */}

        <View
          style={styles.questionComponent}>
          <Animatable.View
          animation="zoomInUp"
          duration={1000}
          useNativeDriver={true}
          >
            {/* <Text style={{ fontSize: 20, fontFamily:'BYekan',
            margin:widthPic*0.15,
            lineHeight:50}} >کدام یک از گزینه های زیر دریاچه ای در استان لرستان می باشد؟</Text> */}
            <ImageBackground
              style={{
                width: widthPic,
                height: widthPic,
                margin: widthPic * 0.01,
                // resizeMode: 'contain'
              }}
              source={require('./../images/game1/card1.png')}
              >
              <Text
                style={{ fontSize: 20,
                  fontFamily: 'BYekan',
                  margin: widthPic * 0.15,
                  lineHeight: 50 }}
                  >
                  {this.props.question}</Text>
            </ImageBackground>
          </Animatable.View>
        </View>
        {/* question card component ends */}


        {/* choices component start */}
        <View
          style={{
            width: widthPic,
            height: widthPic * 0.55 * 1.2,
            alignItems: 'center',
            justifyContent: 'center',
            // backgroundColor:'#FFAAE3',
            padding: widthPic * 0.01
            }}>
          <View style={{ flexDirection: 'row' }}>
          <TouchableHighlight
          delayPressIn={0}
          onPress={() => { this.checkAnswer(1); }}
          onLongPress={() => { this.checkAnswer(1); }}
          >
            <Image
            style={styles.choice}
            source={{ uri:'http://velgardi-game.ir/api/get_image?path=' + this.props.alts.altOne }}
            />
          </TouchableHighlight>
          <TouchableHighlight
          onPress={() => { this.checkAnswer(2); }}
          onLongPress={() => { this.checkAnswer(2); }}
          >
            <Image
            style={styles.choice}
            source={{
              uri: 'http://velgardi-game.ir/api/get_image?path=' + this.props.alts.altTwo
             }}
            />
          </TouchableHighlight>
          </View>

          <View
            style={{ flexDirection: 'row' }}>
          <TouchableHighlight
          onPress={() => { this.checkAnswer(3); }}
          onLongPress={() => { this.checkAnswer(3); }}
          >
            <Image
            style={styles.choice}
            source={{ uri: 'http://velgardi-game.ir/api/get_image?path=' + this.props.alts.altThree }}
            />
          </TouchableHighlight>
          <TouchableHighlight
          // onPress={(x) => { this.checkAnswer(4); }}
          // onLongPress={(x) => { this.checkAnswer(4); }}
          onPress={() => { this.checkAnswer(4); }}
          onLongPress={() => { this.checkAnswer(4); }}
          >
            <Image
            style={styles.choice}
            source={{ uri: 'http://velgardi-game.ir/api/get_image?path=' + this.props.alts.altFour}}
            />
          </TouchableHighlight>
          </View>

        </View>
        {/* choices component ends */}

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
    backgroundColor: '#ffa500',
  },
  progressBar: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor:'blue',
  },
  frame: {
    flex: 1,
    width: widthPic,
    // height: widthPic,
    // width: 350,
    // height: 350,
    // margin:10,
    // marginLeft: 10 ,
    // marginRight: 10 ,
    // resizeMode:'cover',
    // resizeMode:'contain',
    // resizeMode: 'stretch',
    // padding:40,
    // paddingLeft:20,
    // paddingTop:20,
    // paddingRight:40,
    // backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',

  },
  questionComponent: {
    // width: widthPic,
    // padding: 50,
    margin: 10,
    flex: 7,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    // backgroundColor:'#037BC8',
    overflow: 'hidden'

  },
  choice: {
    width: widthPic * 0.47,
    height: widthPic * 0.47 * 0.6,
    margin: widthPic * 0.01,
    resizeMode: 'cover',
    borderRadius: 10,
    overflow: 'hidden'

  }
});
const mapStateToProps = ({ auth, q_one }) => {
  // console.log('this is question one state:', q_one);
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
   } = q_one;

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
  questionOneProgressUpdate,
  questionOneResultUpdate,
  questionOneAnswerUpdate,
  questionOneQuestionUpdate,
  questionOneAltsUpdate,
  questionOneModalUpdate,
  updateFirstScore
})(Game1);
