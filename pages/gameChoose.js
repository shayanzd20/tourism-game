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
   //title: <Text style={{
 //      color: 'rgba(0, 0, 0, .9)',
 //      alignItems: 'center' ,
 //      position: 'absolute',
 //    }} > Filters</Text > ,
   //headerTintColor: 'black',//color of header text
    header: null


  };

  constructor(props) {
    super(props);
    this.props.questionOneProgressUpdate(0);
    this.props.questionTwoProgressUpdate(0);
    this.props.questionThreeProgressUpdate(0);
  }


componentWillMount() {
  // console.log('componentWillMount:::');
  this.props.questionOneModalUpdate(false);
  this.props.questionTwoModalUpdate(false);
  this.props.questionThreeModalUpdate(false);




  AsyncStorage.getItem('token', (err, result) => {
      // console.log('get token in game choose: ', result);
      if (result) {
        // this.state.token = result;
        this.props.tokenChanged(result);
        this.userQuestionStatus();
      } else {
        // this.props.navigation.navigate('Login', responseJson);
        // Actions.pop();
        // Actions.auth();
        Actions.replace('auth');

      }
    });

   // check done cityDone
   // console.log('this.props in componentWillMount:::', this.props);
   if (this.props.scoreFirst + this.props.scoreSecond + this.props.scoreThird === 300) {
     // cityDone = true;
     // console.log('modal ::: on');
      this.cityStatusTrue();
     // this.props.cityDoneStatus(true);
   } else {
     // console.log('modal ::: off');
      this.cityStatusFalse();
   }
}

componentDidMount() {
  // console.log('componentDidMount:::');
  // console.log('this.props in componentDidMount:::', this.props);
  if (this.props.scoreFirst + this.props.scoreSecond + this.props.scoreThird === 300) {
    // cityDone = true;
    // console.log('modal ::: on');
    // this.props.cityDoneStatus(true);
  } else {
    // console.log('modal ::: off');
  }
}

// Functions
onGameOneClick() {
  // Actions.pop();
  // Actions.game1();

  // we must update questions, answers, alts
  this.props.questionOneAnswerUpdate(this.props.firstObj.answer);
  this.props.questionOneQuestionUpdate(this.props.firstObj.question);
  this.props.questionOneAltsUpdate(this.props.firstObj.alts);

  Actions.replace('game1');
}

onGameTwoClick() {
  // console.log('this is obj two:', this.props.secondObj);
  // Actions.pop();
  // Actions.game2();

  // we must update questions, answers, alts
  this.props.questionTwoAnswerUpdate(this.props.secondObj.answer);
  this.props.questionTwoQuestionUpdate(this.props.secondObj.img);
  this.props.questionTwoAltsUpdate(this.props.secondObj.alts);
  Actions.replace('game2');
}

onGameThreeClick() {
  // Actions.pop();
  // Actions.game3();

  // we must update questions, answers, alts
  this.props.questionThreeAnswerUpdate(this.props.thirdObj.answer);
  this.props.questionThreeQuestionUpdate(this.props.thirdObj.video);
  this.props.questionThreeAltsUpdate(this.props.thirdObj.alts);
  Actions.replace('game3');
}

userQuestionStatus() {
  // console.log('userQuestionStatus function in game choose: ');
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
     //console.log('get user Question Status: ', responseJson);
     // console.log('responseJson.city_status:::', responseJson.city_status);
     if (!responseJson.city_status) {
       // console.log('question first: ', responseJson.question_first);
       // console.log('question second: ', responseJson.question_second);
       // console.log('question third: ', responseJson.question_third);

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

        //duration={1000}
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
       //borderWidth: 10,
       //fontWeight: 10,
       //margin: 30,
        textShadowColor: 'black',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 1,
        top: Dimensions.get('window').height / 10,
        left: Dimensions.get('window').width / 10,
        // zIndex: 10
       }}
      animation="bounce"
      iterationCount="infinite"
      useNativeDriver={true}

     //duration={1000}
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
       //borderWidth: 10,
       //fontWeight: 10,
        // marginLeft: 130,
        // paddingLeft: 130,
        textShadowColor: 'black',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 1,
        top: Dimensions.get('window').height / 10,
        // left: Dimensions.get('window').width / 20,
        left: Dimensions.get('window').width / 2.25,
        zIndex: 10
       }}
      animation="rubberBand"
      iterationCount="infinite"
      useNativeDriver={true}

     //duration={1000}
       > {this.props.scoreThird} امتیاز</Animatable.Text>
       {this.props.scoreThird === 50 ?
         <View
           style={{
             backgroundColor: 'rgba(60, 84, 15, 0.8)',
             top: Dimensions.get('window').height / 10,
             left: Dimensions.get('window').width / 2.25,
             // width: Dimensions.get('window').width,
             // zIndex: 10,
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
    //console.log('get user Question Status: ', responseJson);

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
   //console.log('this.state.q_first in render', this.state.q_first);
   //console.log('this.state.q_second in render', this.state.q_second);
   //console.log('this.state.q_third in render', this.state.q_third);

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
      // cityDone = true;
      // console.log('modal ::: on');
      cityDone = true;
      this.completeCityUpdate();

    } else {
      // console.log('modal ::: off');
      cityDone = false;
    }

    // console.log('this.props.dis_touch_first:', this.props.dis_touch_first);

    return (

      <View style={styles.main} >
        {/* modal start */}
        <View>
          <ModalCityDone
            // text={this.props.text_modal}
            visible={cityDone}
            // status={this.props.status}
          />
        </View>
      {/* modal ends */}
        <View style={styles.questionSection} >
          <TouchableHighlight
            // onPress={() => navigate('GameOne', this.props.firstObj)}
            // onLongPress={() => navigate('GameOne', this.props.firstObj)}
            onPress={this.onGameOneClick.bind(this)}
            onLongPress={this.onGameOneClick.bind(this)}
            // onPress={Actions.games()}
            // onLongPress={Actions.games()}
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

                {/* <Animatable.Text
                  style={styles.gameOneText}
                            animation="fadeInRight"
                            duration={1000}
                             > عکس گزینه</Animatable.Text> */}
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

              {/* <Animatable.Text style={styles.gameTwoText}
                          animation="fadeInLeft"
                          duration={1000}
                           > عکسو حدس بزن</Animatable.Text> */}
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

              {/* <Animatable.Text style={styles.gameThreeText}
                          animation="fadeInRight"
                          duration={1000} > ویدیو ببین جواب بده</Animatable.Text> */}
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
    // resizeMode: 'cover'
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
   //fontWeight: 'bold',
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
   //borderWidth: 10,
   //fontWeight: 10,
   //margin: 30,
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
   //borderWidth: 10,
   //fontWeight: 10,
   //margin: 30,
    textShadowColor: 'black',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
    // top: Dimensions.get('window').height / 9,
    // left: Dimensions.get('window').width / 3,
    // zIndex: 10
  },
  gameTwoBack: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height / 3,
    // resizeMode: 'cover'
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
   //marginLeft: 100,
   //paddingLeft: 100,
    paddingRight: 120,
    fontSize: 40,
   //fontWeight: 'bold',
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
    //borderWidth: 10,
    //fontWeight: 10,
    //margin: 30,
     // marginLeft: 130,
     textShadowColor: 'black',
     textShadowOffset: { width: 2, height: 2 },
     textShadowRadius: 1,
     // top: Dimensions.get('window').height / 9,
     // left: Dimensions.get('window').width / 3,
     // zIndex: 10
   },
   gameThreeScoreText: {
     fontFamily: 'BYekan',
     justifyContent: 'center',
     alignItems: 'center',
     fontSize: 30,
     color: '#ff6347',
     borderColor: 'black',
    //borderWidth: 10,
    //fontWeight: 10,
    //margin: 30,
     // marginLeft: 130,
     textShadowColor: 'black',
     textShadowOffset: { width: 2, height: 2 },
     textShadowRadius: 1,
     // top: Dimensions.get('window').height / 9,
     // left: Dimensions.get('window').width / 3,
     // zIndex: 10
   },
  gameThreeBack: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height / 3,
    // resizeMode: 'cover'
   },
  gameThreeItem: {
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height / 4,
    resizeMode: 'contain',
    marginLeft: -100,
    top: 50,
   //bottom: -150,
   //bottom: -Dimensions.get('window').width-100,
   },
  gameThreeText: {
    marginTop: 10,
    paddingRight: 20,
    fontSize: 40,
   //fontWeight: 'bold',
    fontFamily: 'BYekan',
    color: 'black'
   },
  gameThreeItemAndScore: {
    position: 'absolute',
   },

 });

 const mapStateToProps = ({ auth, user }) => {
   // console.log('this is auth text in game choose:', user);
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
    // console.log('this is scoreFirst in gameChoose:', scoreFirst);
    // const { alts, answer, question, } = q_one;

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
     // alts,
     // answer,
     // question,
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
