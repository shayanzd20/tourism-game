import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TouchableHighlight,
  Image,
  Dimensions,
  ImageBackground,
  AsyncStorage
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
  questionThreeAltsUpdate
} from '../src/actions';
import Animate from './components/Animate';

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

componentWillMount() {
  AsyncStorage.getItem('token', (err, result) => {
    console.log('get token in game choose: ', result);
    if (result) {
      // this.state.token = result;
      this.props.tokenChanged(result);
      this.userQuestionStatus();
    } else {
      // this.props.navigation.navigate('Login', responseJson);
      Actions.auth();
    }
   });
}

// Functions
onGameOneClick() {
  // Actions.games();
  Actions.game1();
  // we must update questions, answers, alts
  this.props.questionOneAnswerUpdate(this.props.firstObj.answer);
  this.props.questionOneQuestionUpdate(this.props.firstObj.question);
  this.props.questionOneAltsUpdate(this.props.firstObj.alts);
}

onGameTwoClick() {

  console.log('this is obj two:', this.props.secondObj);
  // Actions.games();
  Actions.game2();
  // we must update questions, answers, alts
  this.props.questionTwoAnswerUpdate(this.props.secondObj.answer);
  this.props.questionTwoQuestionUpdate(this.props.secondObj.img);
  this.props.questionTwoAltsUpdate(this.props.secondObj.alts);
}

onGameThreeClick() {
  // Actions.games();
  Actions.game3();
  // we must update questions, answers, alts
  this.props.questionThreeAnswerUpdate(this.props.thirdObj.answer);
  this.props.questionThreeQuestionUpdate(this.props.thirdObj.question);
  this.props.questionThreeAltsUpdate(this.props.thirdObj.alts);
}

userQuestionStatus() {
  console.log('userQuestionStatus function: ');
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
      console.log('/----------------get user Question Status start api in game choose-----------/');
     //console.log('get user Question Status: ', responseJson);

      console.log('question first: ', responseJson.question_first);
      console.log('question second: ', responseJson.question_second);
      console.log('question third: ', responseJson.question_third);

            // this.setState({ firstObj: responseJson.question_first });
            // this.setState({ secondObj: responseJson.question_second });
            // this.setState({ thirdObj: responseJson.question_third });
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

     //console.log('responseJson.score_first', responseJson.score_first);
     //console.log('responseJson.score_second', responseJson.score_second);
     //console.log('responseJson.score_third', responseJson.score_third);
      if (responseJson.score_first > 0) {
        // this.setState({ scoreFirst: responseJson.score_first });
        // this.setState({ q_first: true });
        this.props.updateFirstScore({ scoreFirst: score_first, q_first: true });
      }
      if (responseJson.score_second > 0) {
        // this.setState({ scoreSecond: score_second });
        // this.setState({ q_second: true });
        this.props.updateSecondScore({ scoreSecond: score_second, q_second: true });
      }
      if (responseJson.score_third > 0) {
        // this.setState({ scoreThird: responseJson.score_third });
        // this.setState({ q_third: true });
        this.props.updateThirdScore({ scoreThird: score_third, q_third: true });
      }

     //console.log('this.state.q_first', this.state.q_first);
     //console.log('this.state.q_second', this.state.q_second);
     //console.log('this.state.q_third', this.state.q_third);
    })
    .catch((error) => {
      console.error('error: ', error);
     });
}

questionOneScore() {
  return (
    <View>
      <Animatable.Text
        style={{
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
        zIndex: 10
       }}
      animation="swing"
      iterationCount="infinite"
      useNativeDriver={true}

     //duration={1000}
       > {this.props.scoreFirst} امتیاز</Animatable.Text>
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
        zIndex: 10
       }}
      animation="bounce"
      iterationCount="infinite"
      useNativeDriver={true}

     //duration={1000}
       > {this.props.scoreSecond} امتیاز</Animatable.Text>
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
        marginLeft: 130,
        textShadowColor: 'black',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 1,
        top: Dimensions.get('window').height / 10,
        left: Dimensions.get('window').width / 10,
        zIndex: 10
       }}
      animation="rubberBand"
      iterationCount="infinite"
      useNativeDriver={true}

     //duration={1000}
       > {this.props.scoreThird} امتیاز</Animatable.Text>
    </View>
  );
}

  render() {
   //console.log('this.state.q_first in render', this.state.q_first);
   //console.log('this.state.q_second in render', this.state.q_second);
   //console.log('this.state.q_third in render', this.state.q_third);

    let scoreFirstShow;
    let scoreSecondShow;
    let scoreThirdShow;
    if (this.props.q_first === true) {
      scoreFirstShow = this.questionOneScore();
    }
    if (this.props.q_second === true) {
      scoreSecondShow = this.questionTwoScore();
    }
    if (this.props.q_third === true) {
      scoreThirdShow = this.questionThreeScore();
    }

    return (

      <View style={styles.main} >
        <View style={styles.questionSection} >
          <TouchableHighlight
          // onPress={() => navigate('GameOne', this.props.firstObj)}
          // onLongPress={() => navigate('GameOne', this.props.firstObj)}
          onPress={this.onGameOneClick.bind(this)}
          onLongPress={this.onGameOneClick.bind(this)}
          // onPress={Actions.games()}
          // onLongPress={Actions.games()}
          disabled={this.props.q_first}
          >
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
          disabled={this.props.q_second} >
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
          disabled={this.props.q_third} >

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

 const mapStateToProps = ({ auth, user, q_one }) => {
   console.log('this is auth text:', user);
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
    } = user;
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
  questionThreeAltsUpdate
})(GameChoose);
