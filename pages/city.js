import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TouchableNativeFeedback,
  Dimensions,
  Platform,
  UIManager,
  LayoutAnimation
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import {
  cityDoneStatus,
  userQuestionUpdate,
  updateFirstScore,
  updateSecondScore,
  updateThirdScore,
  updateTickets,
  coinUpdate,
  diamondUpdate,
  insufficiantModalUpdate,
  updateVideoCity
} from '../src/actions';
import ModalCoinInsufficiant from './components/ModalCoinInsufficiant';
import ModalCityVideo from './components/ModalCityVideo';
import styles from './styles/city';



const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

// console.log('deviceWidth:', deviceWidth);
// console.log('deviceHeight:', deviceHeight);

class City extends Component {

  static navigationOptions = {
    title: '',
    header: null
  };

  constructor(props) {
    super(props);
    this.walletStatus();
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }

    this.state = {
      CustomLayoutSpring: {
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
        },
      modalCoinInsufficiant: false
    };
  }

componentWillMount() {
  this.userQuestionStatus();
  if (this.props.city_done === true) {
    this.props.cityDoneStatus(false);
  }
}


onGameChooseClick() {
  // Actions.pop();
  // Actions.gameChoose();
  Actions.replace('gameChoose');
}

userQuestionStatus() {
  // console.log('userQuestionStatus function in city: ');
  fetch('http://velgardi-game.ir/api/question', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.props.token
    },
    body: JSON.stringify({
      type: 'arrive'
    })
  })
  .then((response) => response.json())
  .then((responseJson) => {
    // console.log('/----------------get user Question Status start api in game choose-----------/');
    // console.log('get user Question Status in city: ', responseJson);

    // console.log('question first: ', responseJson.question_first);
    // console.log('question second: ', responseJson.question_second);
    // console.log('question third: ', responseJson.question_third);

    const {
      question_first,
      question_second,
      question_third,
      score_first,
      score_second,
      score_third } = responseJson;
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
    })
    .catch((error) => {
      // console.error('error: ', error);
    });
  }

populationView() {
  return (
    <Animatable.Text
      style={{ paddingTop: 5,
              paddingRight: 20,
              fontSize: 20,
              // fontWeight: 'bold',
              fontFamily: 'BYekan',
              color: 'white' }}
              animation="fadeInRight"
              duration={1000}
              delay={1000}>جمعیت: {cityPopulation} نفر</Animatable.Text>
  );
}

travelButton() {
  return (
    <View
      style={{ flex: 3,
      // backgroundColor: 'blue',
      alignItems: 'center',
      // justifyContent: 'center',
      justifyContent: 'flex-end',
      // resizeMode: 'contain'
      }}>
      <TouchableOpacity
        style={{
          // backgroundColor: 'yellow',
          // alignItems: 'center',
          // justifyContent: 'center',
          // resizeMode: 'contain'
          overflow: 'hidden'

        }}
        onPress={this.nextCity.bind(this)}
        >
        <Animatable.View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'stretch',
            }}
          animation="bounceIn"
          duration={1000}
          delay={2500}>
          <Image
            // befor style
            // style={{
            //   width: 100,
            //   resizeMode: 'contain'
            // }}
            style={styles.buttonImageNextCity}
            source={require('./../images/specificCity/nextCity.png')}
            />
        </Animatable.View>
      </TouchableOpacity>
    </View>
  );
}

travelButtonLock() {
  return (
    <View
      style={{
      flex: 3
     }}>
      <TouchableOpacity
        style={{
          // backgroundColor: 'yellow',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Animatable.View
          style={{
          // flex: 1,
          // position: 'absolute',
          // backgroundColor: 'red',
          // width: 100,
          // resizeMode: 'contain'
          alignSelf: 'stretch',
          }}
            animation="bounceIn"
            duration={1000}
            delay={2500}>
            <Image
              style={styles.buttonImage}
              source={require('./../images/specificCity/nextCity.png')}
            />
              <Animatable.View
                animation="bounceIn"
                duration={1000}
                delay={2500}>
                <Image
                  style={styles.buttonLockImage}
                  source={require('./../images/specificCity/Lock.png')} />
              </Animatable.View>
          </Animatable.View>
      </TouchableOpacity>
    </View>
  );
}

playGameButton() {
  return (
    <View
      style={{ flex: 3,
        alignItems: 'center',
        // alignItems: 'flex-end',
        // justifyContent: 'center',
        justifyContent: 'flex-end',
        // backgroundColor: '#f87fff'
      }}>
      <TouchableOpacity
        style={{
          // backgroundColor: '#ff68b6',
         }}
        // onPress={() => navigate('ChooseGameStack')}>
        // onPress={Actions.main.gameChoose()}>
        onPress={() => this.playGameFunction()}
          >
        <Animatable.View
          style={{
          // flex: 1,
          // position: 'absolute',
          // backgroundColor: 'red',
          // width: 100,
          // resizeMode: 'contain'
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: 'stretch',

        }}
          animation="bounceIn"
          duration={1000}
          delay={2500}
        >
          <Image
            style={styles.buttonImageGame}
            // style={styles.buttonImage}
            source={require('./../images/specificCity/playGame.png')}
          />
       </Animatable.View>
      </TouchableOpacity>
    </View>
  );
}

playGameButtonLock() {
  return (
    <View
      style={{ flex: 3,
        alignItems: 'center',
        // alignItems: 'flex-end',
        // justifyContent: 'center',
        justifyContent: 'flex-end',
        // backgroundColor: '#f87fff'
      }}>
      <TouchableOpacity
        style={{
          // backgroundColor: '#ff68b6',
         }}>
        <Animatable.View
          style={{
          // flex: 1,
          // position: 'absolute',
          // backgroundColor: 'red',
          // width: 100,
          // resizeMode: 'contain'
          // alignItems: 'center',
          alignItems: 'flex-end',
          justifyContent: 'center',
          // justifyContent: 'flex-end',
          alignSelf: 'stretch',

        }}
          animation="bounceIn"
          duration={1000}
          delay={2500}
        >
          <Image
            style={styles.buttonImageGameLuck}
            // style={styles.buttonImage}
            source={require('./../images/specificCity/playGame.png')}
          />
          <Animatable.View
            animation="bounceIn"
            duration={1000}
            delay={2500}>
            <Image
              style={styles.playButtonLock}
              source={require('./../images/specificCity/Lock.png')} />
          </Animatable.View>
       </Animatable.View>
      </TouchableOpacity>
    </View>
  );
}

nextCity() {
  fetch('http://velgardi-game.ir/api/nextCity', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.props.token
    }
  })
    .then((response) => response.json())
    .then((responseJson) => {
      // console.log('responseJson in city screen in next city api:', responseJson);
      // update tickets
      this.props.updateTickets(responseJson);
      // Actions.pop();
      // Actions.cityChoose();

      Actions.replace('cityChoose');

    })
    .catch((error) => {
      // console.error('error:', error);
    });
}

showVideo() {
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
  LayoutAnimation.configureNext(CustomLayoutSpring);
  this.props.updateVideoCity(true);
}

walletStatus() {
  fetch('http://velgardi-game.ir/api/coinAndDiamondStatus', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.props.token
    }
  })
    .then((response) => response.json())
    .then((responseJson) => {

      this.props.coinUpdate(responseJson.coin);
      this.props.diamondUpdate(responseJson.diamond);

    })
    .catch((error) => {
      // console.error('error:', error);
    });
}

playGameFunction() {
  if (this.props.coin > 500) {
    console.log('sufficiant');
    this.onGameChooseClick();
  } else {
    console.log('insufficiant');
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
    LayoutAnimation.configureNext(CustomLayoutSpring);
    this.props.insufficiantModalUpdate(true);
  }
}

  render() {
    let cityPopulation = '';
    let cityArea = '';
    let cityDescription = '';
    let nextCityButton;
    let playGameButton;


    // console.log('city prop user3: ', this.props.user_status.city);
    // console.log('city prop user city status: ', this.props.user_status.status);
    const userCityStatus = this.props.user_status.status;
    const cityName = this.props.user_status.city.name;
    if (this.props.user_status.city.population !== 0) {
      // console.log('population');
      cityPopulation = `جمعیت: ${this.props.user_status.city.population} نفر`;
      // console.log(cityPopulation);
    }
    if (this.props.user_status.city.area !== 0) {
      // console.log('area');
      cityArea = `مساحت: ${this.props.user_status.city.area} کیلومتر مربع`;
      // console.log(cityArea);
    }

    if (this.props.user_status.city.description !== '') {
      // console.log('description');
      cityDescription = this.props.user_status.city.description;
      // console.log(cityDescription);
    }
    // console.log('userCityStatus:::', userCityStatus);
    if (userCityStatus === 'arrive') {
      // we have to lock travel button
      // console.log('user arrived');
      // nextCityButton = this.travelButtonLock();
    } else {
      // travel button is open
      // console.log('user leave');
      // nextCityButton = this.travelButtonLock();
      // nextCityButton = this.travelButton();
    }

    if (this.props.scoreFirst + this.props.scoreSecond + this.props.scoreThird === 300) {
      // console.log('playGameButton ::: on');
      playGameButton = this.playGameButtonLock();
      nextCityButton = this.travelButton();
    } else {
      // console.log('playGameButton ::: off');
      // nextCityButton = this.travelButton();

      playGameButton = this.playGameButton();
      nextCityButton = this.travelButtonLock();
    }


    return (
      <View
        style={{
          flex: 1,
          // backgroundColor: 'rgba(0,0,0,.9)',
          // opacity:0.4
          }}>

      {/* start background*/}
      <ImageBackground
          source={require('./isf.png')}
          style={styles.cityPicture}
          blurRadius={2}
        >
          {/* start city parent view component  */}
          <View style={styles.cityDescription}>
            {/* start city name and area and population*/}
            <View
              style={{
              // backgroundColor: 'brown',
              flex: 1,
              justifyContent: 'center' }}>
              <Animatable.Text
                style={{ paddingTop: 20,
                          paddingRight: 20,
                          fontSize: 60,
                          // fontWeight: 'bold',
                          fontFamily: 'BYekan',
                          color: 'white' }}
                          animation="fadeInRight"
                          duration={1000}
                          >{cityName}</Animatable.Text>
              <Animatable.Text
                      style={{ paddingTop: 5,
                            paddingRight: 20,
                            fontSize: 20,
                            // fontWeight: 'bold',
                            fontFamily: 'BYekan',
                            color: 'white' }}
                            animation="fadeInRight"
                            duration={1000}
                            delay={1000}>{cityPopulation}</Animatable.Text>
              <Animatable.Text
                style={{ fontSize: 20,
                            paddingRight: 20,
                            paddingBottom: 20,
                            // fontWeight: 'bold',
                            fontFamily: 'BYekan',
                            color: 'white' }}
                            animation="fadeInRight"
                            duration={1000}
                            delay={1500}>{cityArea}</Animatable.Text>
            </View>
            {/* end city name and area and population*/}
            {/* start city description*/}
            <View
              style={{
              // backgroundColor: '#ffb970',
              flex: 1,
              justifyContent: 'center' }}>
              <Animatable.Text
                style={{ padding: 20,
                            fontSize: 20,
                            // fontWeight: 'bold',
                            fontFamily: 'BYekan',
                            color: 'white',
                            lineHeight: 40 }}
                            animation="flipInX"
                            duration={1000}
                            delay={2000}>
                            {cityDescription}
              </Animatable.Text>
            </View>
            {/* end city description*/}

            {/* start buttons component */}
            <View
              style={{
              // backgroundColor: 'brown',
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
                {/* play game button and text start */}
                <View
                  style={{ flex: 1,
                           flexDirection: 'column',
                           // backgroundColor: 'orange'
                  }}>
                  {playGameButton}

                  <View
                    style={{ flex: 1,
                            // backgroundColor: 'blue',
                            alignItems: 'center' }}>
                    <Text
                      style={{ color: 'white',
                               fontFamily: 'BYekan' }}
                               >شروع بازی </Text>
                  </View>
                </View>
                {/* play game button and text end */}

                {/* start video of city button and text*/}
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'column',
                    // backgroundColor: '#42b0f4'
                    }}>
                    <View
                      style={{ flex: 3,
                      // backgroundColor: 'blue',
                      alignItems: 'center',
                      // justifyContent: 'center',
                      justifyContent: 'flex-end',
                      // resizeMode: 'contain'
                      }}>
                      <TouchableOpacity
                        style={{
                          // backgroundColor: 'yellow',
                          // alignItems: 'center',
                          // justifyContent: 'center',
                          // resizeMode: 'contain'
                          overflow: 'hidden'

                        }}
                        onPress={this.showVideo.bind(this)}
                        >
                        <Animatable.View
                          style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            alignSelf: 'stretch',
                            }}
                          animation="bounceIn"
                          duration={1000}
                          delay={2500}>
                          <Image
                            // befor style
                            // style={{
                            //   width: 100,
                            //   resizeMode: 'contain'
                            // }}
                            style={styles.buttonImageNextCity}
                            source={require('./../images/specificCity/icons-video.png')}
                            />
                        </Animatable.View>
                      </TouchableOpacity>
                    </View>

                    {/* start button caption component */}
                    <View
                      style={{ flex: 1,
                      // backgroundColor: 'blue',
                      alignItems: 'center' }}>
                      <Text style={{ color: 'white', fontFamily: 'BYekan' }}>معرفی شهر</Text>
                    </View>
                    {/* end button caption component */}
                </View>
                {/* end video of city button and text*/}

                {/* start next city button and text*/}
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'column',
                    // backgroundColor: '#42b0f4'
                    }}>
                    {nextCityButton}

                    {/* start button caption component */}
                    <View
                      style={{ flex: 1,
                      // backgroundColor: 'blue',
                      alignItems: 'center' }}>
                      <Text style={{ color: 'white', fontFamily: 'BYekan' }}>شهر بعدی</Text>
                    </View>
                    {/* end button caption component */}
                </View>
                {/* end next city button and text*/}
            </View>
            {/* end buttons component */}

          </View>
          {/* end city parent view component  */}
      </ImageBackground>
      {/* end background*/}

      {/* modal start */}
      <View>
        <ModalCoinInsufficiant
          text="متاسفانه سکه کافی برای ادامه بازی نداری"
          visible={this.props.insufficiant_visible}
        />
      </View>
      {/* modal ends */}

      {/* modal Video start */}
      <View>
        <ModalCityVideo
          text="ویدیو"
          visible={this.props.video_city_modal}
        />
      </View>
      {/* modal video ends */}
      </View>

    );
  }
}

const mapStateToProps = ({ auth, user }) => {
  // console.log('this is user in city:', user);
  // console.log('this is auth in city:', auth);
  const { token } = auth;

  const {
    user_status,
    city_done,
    scoreFirst,
    scoreSecond,
    scoreThird,
    coin,
    diamond,
    insufficiant_visible,
    video_city_modal
   } = user;


  return {
    user_status,
    city_done,
    scoreFirst,
    scoreSecond,
    scoreThird,
    token,
    coin,
    diamond,
    insufficiant_visible,
    video_city_modal
   };
  };
export default connect(mapStateToProps, {
  cityDoneStatus,
  userQuestionUpdate,
  updateFirstScore,
  updateSecondScore,
  updateThirdScore,
  updateTickets,
  coinUpdate,
  diamondUpdate,
  insufficiantModalUpdate,
  updateVideoCity })(City);
