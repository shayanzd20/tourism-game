import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TouchableHighlight,
  Image,
  Dimensions,
  ImageBackground,
  AsyncStorage,
  Text,

} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import {
  userQuestionUpdate,
  updateFirstScore,
  updateSecondScore,
  updateThirdScore,
  tokenChanged,
  questionOneAnswerUpdate,
  questionOneQuestionUpdate,
  questionOneAltsUpdate,
  questionTwoAnswerUpdate,
  questionTwoQuestionUpdate,
  questionTwoAltsUpdate,
  questionThreeAnswerUpdate,
  questionThreeQuestionUpdate,
  questionThreeAltsUpdate,
  questionOneModalUpdate,
  questionTwoModalUpdate,
  questionThreeModalUpdate,
  questionOneProgressUpdate,
  questionTwoProgressUpdate,
  questionThreeProgressUpdate,
  cityStatus,
} from '../src/actions';
import Animate from './components/Animate';
import ModalCityDone from './components/ModalCityDone';


class GameChoose extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.props.questionOneProgressUpdate(0);
    this.props.questionTwoProgressUpdate(0);
    this.props.questionThreeProgressUpdate(0);
  }


componentWillMount() {
  this.props.questionOneModalUpdate(false);
  this.props.questionTwoModalUpdate(false);
  this.props.questionThreeModalUpdate(false);


  AsyncStorage.getItem('token', (err, result) => {
      if (result) {
        this.props.tokenChanged(result);
        this.userQuestionStatus();
      } else {
        Actions.replace('auth');

      }
    });

   // check done cityDone
   if (this.props.scoreFirst + this.props.scoreSecond + this.props.scoreThird === 300) {
      this.cityStatusTrue();
   } else {
      this.cityStatusFalse();
   }
}

// Functions
onGameOneClick() {
  // we must update questions, answers, alts
  this.props.questionOneAnswerUpdate(this.props.firstObj.answer);
  this.props.questionOneQuestionUpdate(this.props.firstObj.question);
  this.props.questionOneAltsUpdate(this.props.firstObj.alts);

  Actions.replace('game1');
}

onGameTwoClick() {
  // we must update questions, answers, alts
  this.props.questionTwoAnswerUpdate(this.props.secondObj.answer);
  this.props.questionTwoQuestionUpdate(this.props.secondObj.img);
  this.props.questionTwoAltsUpdate(this.props.secondObj.alts);
  Actions.replace('game2');
}

onGameThreeClick() {

  // we must update questions, answers, alts
  this.props.questionThreeAnswerUpdate(this.props.thirdObj.answer);
  this.props.questionThreeQuestionUpdate(this.props.thirdObj.video);
  this.props.questionThreeAltsUpdate(this.props.thirdObj.alts);
  Actions.replace('game3');
}

videoFetch() {
  fetch('http://velgardi-game.ir/' + this.props.thirdObj.video)
  .then((response) => console.log('video:::', response));
}

userQuestionStatus() {
  fetch('http://velgardi-game.ir/api/question', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.props.token
    }
  })
    .then((response) => response.json())
    .then((responseJson) => {
      // console.log('/----------------get user Question Status start api in game choose-----------/');
     if (!responseJson.city_status) {
       const {
         question_first,
         question_second,
         question_third,
         score_first, score_second, score_third } = responseJson;
       this.props.userQuestionUpdate({
         firstObj: question_first,
         secondObj: question_second,
         thirdObj: question_third
       });

       if (score_first > 0) {
         if (score_first > 50) {
           this.props.updateFirstScore({ scoreFirst: score_first, q_first: true, dis_touch_first: true });
         } else {
           this.props.updateFirstScore({ scoreFirst: score_first, q_first: true, dis_touch_first: false });
         }
       }
       if (score_second > 0) {
         if (score_second > 50) {
           this.props.updateSecondScore({ scoreSecond: score_second, q_second: true, dis_touch_second: true });
         } else {
           this.props.updateSecondScore({ scoreSecond: score_second, q_second: true, dis_touch_second: false });
         }
       }
       if (score_third > 0) {
         if (score_third > 50) {
           this.props.updateThirdScore({ scoreThird: score_third, q_third: true, dis_touch_third: true });
         } else {
           this.props.updateThirdScore({ scoreThird: score_third, q_third: true, dis_touch_third: false });
         }
       }
     }

    })
    .catch((error) => {
      // console.error('error: ', error);
     });
}

questionOneScore() {
  return (
    <View>
      <Animatable.Text
        style={styles.gameOneScore}
        animation="swing"
        iterationCount="infinite"
        useNativeDriver={true}
       > {this.props.scoreFirst} امتیاز</Animatable.Text>
       {this.props.scoreFirst === 50 ?
         <View
           style={{
             backgroundColor: 'rgba(251, 169, 75, 0.8)',
             top: Dimensions.get('window').height / 9,
             left: Dimensions.get('window').width / 3,
             borderRadius: 5,
            }}>
           <Text
             style={styles.gameOneScoreText}
             >دوباره تلاش کن</Text>
         </View>
         : null
       }


    </View>
  );
}

questionTwoScore() {
  return (
    <View>
      <Animatable.Text
        style={{
        fontFamily: 'BYekan',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 50,
        color: '#f4a460',
        borderColor: 'black',
        textShadowColor: 'black',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 1,
        top: Dimensions.get('window').height / 10,
        left: Dimensions.get('window').width / 10,
       }}
      animation="bounce"
      iterationCount="infinite"
      useNativeDriver={true}

       > {this.props.scoreSecond} امتیاز</Animatable.Text>
       {this.props.scoreSecond === 50 ?
         <View
           style={{
             backgroundColor: 'rgba(250, 58, 25, 0.8)',
             top: Dimensions.get('window').height / 10,
             left: Dimensions.get('window').width / 10,
             zIndex: 10,
             borderRadius: 5,
            }}>
            <Text
              style={styles.gameOneScoreText}
              >دوباره تلاش کن</Text>
          </View>
          : null
       }

    </View>
  );
}

questionThreeScore() {
  return (
    <View>
      <Animatable.Text
        style={{
        fontFamily: 'BYekan',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 50,
        color: '#ff6347',
        borderColor: 'black',
        textShadowColor: 'black',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 1,
        top: Dimensions.get('window').height / 10,
        left: Dimensions.get('window').width / 2.25,
        zIndex: 10
       }}
      animation="rubberBand"
      iterationCount="infinite"
      useNativeDriver={true}

       > {this.props.scoreThird} امتیاز</Animatable.Text>
       {this.props.scoreThird === 50 ?
         <View
           style={{
             backgroundColor: 'rgba(60, 84, 15, 0.8)',
             top: Dimensions.get('window').height / 10,
             left: Dimensions.get('window').width / 2.25,
             borderRadius: 5,
             alignItems: 'center',

            }}>
            <Text
              style={styles.gameThreeScoreText}
              >دوباره تلاش کن</Text>
          </View>
          : null
       }

    </View>
  );
}

completeCityUpdate() {
  fetch('http://velgardi-game.ir/api/statusComplete', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.props.token
    }
  })
  .then((response) => response.json())
  .then((responseJson) => {
    // console.log('/----------------update user city status start api in game choose-----------/');

    const { city_status } = responseJson;
    })
    .catch((error) => {
      // console.error('error: ', error);
    });
}

cityStatusTrue = () => {
  this.props.cityStatus(true);
}

cityStatusFalse = () => {
  this.props.cityStatus(false);
}

  render() {
    let scoreFirstShow;
    let scoreSecondShow;
    let scoreThirdShow;
    let cityDone = false;

    if (this.props.q_first === true) {
      scoreFirstShow = this.questionOneScore();
    }
    if (this.props.q_second === true) {
      scoreSecondShow = this.questionTwoScore();
    }
    if (this.props.q_third === true) {
      scoreThirdShow = this.questionThreeScore();
    }

    if (this.props.scoreFirst + this.props.scoreSecond + this.props.scoreThird === 300) {
      cityDone = true;
      this.completeCityUpdate();

    } else {
      cityDone = false;
    }

    return (

      <View style={styles.main} >
        {/* modal start */}
        <View>
          <ModalCityDone
            visible={cityDone}
          />
        </View>
      {/* modal ends */}
        <View style={styles.questionSection} >
          <TouchableHighlight
            onPress={this.onGameOneClick.bind(this)}
            onLongPress={this.onGameOneClick.bind(this)}
            disabled={this.props.dis_touch_first}>
            <ImageBackground
              source={require('./../images/gameChoose/gameBack1.png')}
              style={styles.gameOneBack} >

                {/* game 1 item and score start */}
                <View style={{ position: 'absolute' }} >
                  {scoreFirstShow}
                  <Image
                    source={require('./../images/gameChoose/gamePerson1.png')}
                    style={styles.gameOneItem} />
                </View>
                {/* game 1 item and score end */}

                <Animate
                  style={styles.gameOneText}
                  animation="transRightToLeft" text={'عکس گزینه'}/>
            </ImageBackground>
          </TouchableHighlight>
        </View>
        <View style={styles.questionSection} >
          <TouchableHighlight
            onPress={this.onGameTwoClick.bind(this)}
            onLongPress={this.onGameTwoClick.bind(this)}
            disabled={this.props.dis_touch_second} >
            <ImageBackground
              source={require('./../images/gameChoose/gameBack2.png')}
              style={styles.gameTwoBack} >

              {/* game 2 item and score start */}
              <View style={{ position: 'absolute' }} >
                {scoreSecondShow}
                <Image
                  source={require('./../images/gameChoose/gamePerson2.png')}
                  style={styles.gameTwoItem} />
              </View>
              {/* game 2 item and score end */}

              <Animate style={styles.gameTwoText} animation="transLeftToRight" text={'عکسو حدس بزن'}/>

            </ImageBackground>
          </TouchableHighlight>
        </View>
        <View style={styles.questionSection} >
          <TouchableHighlight
            onPress={this.onGameThreeClick.bind(this)}
            onLongPress={this.onGameThreeClick.bind(this)}
            disabled={this.props.dis_touch_third} >

            {/* game 3 background start */}
            <ImageBackground
              source={require('./../images/gameChoose/gameBack3.png')}
              style={styles.gameThreeBack} >

              {/* game 3 item and score start */}
              <View style={styles.gameThreeItemAndScore} >
                {scoreThirdShow}
                <Image
                  source={require('./../images/gameChoose/gamePerson3.png')}
                  style={styles.gameThreeItem} />
              </View>
              {/* game 3 item and score end */}

              <Animate style={styles.gameThreeText} animation="transRightToLeft" text={'ویدیو ببین جواب بده'}/>
            </ImageBackground>
            {/* game 3 background end */}
          </TouchableHighlight>
        </View>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
   },
  questionSection: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white'
   },
  gameOneBack: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height / 3,
   },
  gameOneItem: {
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height / 3,
    resizeMode: 'contain',
    marginLeft: -100,
   },
  gameOneText: {
    marginTop: 20,
    paddingRight: 20,
    fontSize: 50,
    fontFamily: 'BYekan',
    color: 'black',
    zIndex: 100,
   },
  gameOneScore: {
    fontFamily: 'BYekan',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 60,
    color: '#ffd700',
    borderColor: 'black',
    textShadowColor: 'black',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
    top: Dimensions.get('window').height / 8,
    left: Dimensions.get('window').width / 3,
    zIndex: 1
  },
  gameOneScoreText: {
    fontFamily: 'BYekan',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 40,
    color: '#ffd700',
    borderColor: 'black',
    textShadowColor: 'black',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
  },
  gameTwoBack: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height / 3,
   },
  gameTwoItem: {
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height / 3,
    resizeMode: 'contain',
    marginLeft: 100,
   },
  gameTwoText: {
    marginTop: 10,
    paddingRight: 120,
    fontSize: 40,
    fontFamily: 'BYekan',
    color: 'black'
   },
   gameTwoScoreText: {
     fontFamily: 'BYekan',
     justifyContent: 'center',
     alignItems: 'center',
     fontSize: 40,
     color: '#f4a460',
     borderColor: 'black',
     textShadowColor: 'black',
     textShadowOffset: { width: 2, height: 2 },
     textShadowRadius: 1,
   },
   gameThreeScoreText: {
     fontFamily: 'BYekan',
     justifyContent: 'center',
     alignItems: 'center',
     fontSize: 30,
     color: '#ff6347',
     borderColor: 'black',
     textShadowColor: 'black',
     textShadowOffset: { width: 2, height: 2 },
     textShadowRadius: 1,
   },
  gameThreeBack: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height / 3,
   },
  gameThreeItem: {
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height / 4,
    resizeMode: 'contain',
    marginLeft: -100,
    top: 50,
   },
  gameThreeText: {
    marginTop: 10,
    paddingRight: 20,
    fontSize: 40,
    fontFamily: 'BYekan',
    color: 'black'
   },
  gameThreeItemAndScore: {
    position: 'absolute',
   },

 });

 const mapStateToProps = ({ auth, user }) => {

  const { token } = auth;

   const { user_status,
     q_first,
     q_second,
     q_third,
     scoreFirst,
     scoreSecond,
     scoreThird,
     firstObj,
     secondObj,
     thirdObj,
     dis_touch_first,
     dis_touch_second,
     dis_touch_third,
     city_status

    } = user;

   return { user_status,
     q_first,
     q_second,
     q_third,
     scoreFirst,
     scoreSecond,
     scoreThird,
     firstObj,
     secondObj,
     thirdObj,
     token,
     dis_touch_first,
     dis_touch_second,
     dis_touch_third,
    };
   };

export default connect(mapStateToProps, {
  userQuestionUpdate,
  updateFirstScore,
  updateSecondScore,
  updateThirdScore,
  tokenChanged,
  questionOneAnswerUpdate,
  questionOneQuestionUpdate,
  questionOneAltsUpdate,
  questionTwoAnswerUpdate,
  questionTwoQuestionUpdate,
  questionTwoAltsUpdate,
  questionThreeAnswerUpdate,
  questionThreeQuestionUpdate,
  questionThreeAltsUpdate,
  questionOneModalUpdate,
  questionTwoModalUpdate,
  questionThreeModalUpdate,
  questionOneProgressUpdate,
  questionTwoProgressUpdate,
  questionThreeProgressUpdate,
  cityStatus
})(GameChoose);
