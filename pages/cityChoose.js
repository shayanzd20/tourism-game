import React, { Component } from 'react';
import {
  View,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Text
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import {
  userStatusChanged,
  updateFirstScore,
  updateSecondScore,
  updateThirdScore,
  cityStatus
} from '../src/actions';


const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

// console.log('width:', deviceWidth);
// console.log('height:', deviceHeight);

// consts
const slideInCustom = {
  0: {
    translateX: 0,
  },
  0.5: {
    translateX: 100,
  },
  1: {
    translateX: 0,
  },
};

class CityChoose extends Component {

  static navigationOptions = {
    title: 'choose destination city',
    header: null
  };

sendTicket = (ticket) => {
  fetch('http://velgardi-game.ir/api/chooseCity', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.props.token
    },
    body: JSON.stringify({
      ticket: ticket
    })
  })
    .then((response) => response.json())
    .then((responseJson) => {
      // console.log('responseJson in city choose for choosing ticket:', responseJson);
      // update tickets
      // this.props.updateTickets(responseJson);
      // Actions.cityChoose();
      this.userStatus();
      // Actions.city();
    })
    .catch((error) => {
      // console.error('error in city choose for choosing ticket:', error);
    });
}

userStatus = () => {
  fetch('http://velgardi-game.ir/api/status', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.props.token
    }
  })
    .then((response) => response.json())
    .then((responseJson) => {
      // console.log('/ ----------- get user Status start api in city choose --------/');
      // console.log('get user Status in login page:', responseJson);


      // console.log('responseJson.status in city choose:', responseJson.status);
      if (responseJson.status === '') {
        // console.log('/----go to sourceScreen in city choose----/');
        this.getCities();

      } else {
        this.props.userStatusChanged(responseJson.status);
        // console.log('/----go to city in city choose----/');
        // console.log('/--reset scores befor going to city--/');
        this.props.updateFirstScore({ scoreFirst: 0, q_first: false, dis_touch_first: false });
        this.props.updateSecondScore({ scoreSecond: 0, q_second: false, dis_touch_second: false });
        this.props.updateThirdScore({ scoreThird: 0, q_third: false, dis_touch_third: false });
        this.props.cityStatus(false);
        Actions.pop();
        Actions.city();
      }
    })
    .catch((error) => {
      // console.error('error:', error);
    });
}


  render() {
    // console.log('/-------city choose render start------/');
    return (
      <View>
        {/* background component start */}
        <ImageBackground
          style={{
            // flex: 1,
            width: deviceWidth,
            height: deviceHeight,
            // flexBasis:'auto',
            // flexShrink:10,
            // marginTop:0,
            // marginBottom:100,
            // marginLeft:0,
            // aspectRatio:2000,
            // top:0,
            // bottom:0,
            // display:'none',
            // maxHeight:deviceHeight,
            // paddingBottom:deviceHeight,
            // marginBottom:deviceHeight,
            // resizeMode: 'cover',
            // transform: 10,
            // backgroundColor:'transparent',

            position: 'absolute',
            // justifyContent:'center',
            // flexWrap:'wrap'

          }}
          source={require('./../images/chooseCity/background.png')}>

          {/* whole screen start */}
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              // backgroundColor: 'red'
            }}>

            {/* ticket one component start */}
            <View
              style={{
                flex: 1,
                // left:0,
                // right:0,
                // top:deviceHeight/8,
                // bottom:0,
                // position: 'absolute',
                justifyContent: 'center',

                zIndex: 10,
                // backgroundColor: 'green'
              }}>
              {/* ticket one touchable start */}
              <TouchableOpacity
                onPress={() => this.sendTicket(this.props.tickets[0])}
                onLongPress={() => this.sendTicket(this.props.tickets[0])}
                >
                <Animatable.View
                  animation="bounceIn"
                  // iterationCount="infinite"
                  direction="normal"
                  duration={2000}>
                  <ImageBackground
                    style={{
                      width: deviceWidth / 1.3,
                      height: 200,
                      margin: deviceWidth / 8,
                      marginTop: 110,
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                    resizeMode='contain'
                    source={require('./../images/chooseCity/ticket.png')}>
                    <Text
                      style={{
                        color: 'red',
                        fontSize: 20,
                        fontWeight: 'bold',
                        fontFamily: 'BYekan',
                        // marginTop: 0,
                        marginBottom: 30,
                        marginRight: 20
                      }}>
                      {this.props.tickets[0]}
                    </Text>
                  </ImageBackground>
                </Animatable.View>
              </TouchableOpacity>
              {/* ticket one touchable end */}
            </View>
            {/* ticket one component end */}

            {/* ticket two component start */}
            <View
              style={{
                  flex: 1,
                  // justifyContent:'center',
                  // left:0,
                  // right:0,
                  // top:-deviceHeight/8,
                  // bottom:0,
                  // position: 'absolute',
                  zIndex: 10,
                  // backgroundColor:'green',
                  }}>

              {/* ticket two touchable start */}
              { this.props.tickets[1] ? <TouchableOpacity
                onPress={() => this.sendTicket(this.props.tickets[1])}
                onLongPress={() => this.sendTicket(this.props.tickets[1])}>
                <Animatable.View
                  animation="bounceIn"
                  // iterationCount="infinite"
                  direction="normal"
                  duration={2000}
                  delay={100}>
                  <ImageBackground
                    style={{
                      height: 400,
                      width: deviceWidth / 1.3,
                      margin: deviceWidth / 8,
                      marginTop: -110,
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                    resizeMode='contain'
                    source={require('./../images/chooseCity/ticket.png')}>
                    <Text
                      style={{
                        color: 'red',
                        fontSize: 20,
                        fontWeight: 'bold',
                        fontFamily: 'BYekan',
                        // marginTop: 0,
                        marginBottom: 30,
                        marginRight: 20
                      }}>
                      {this.props.tickets[1]}
                    </Text>
                  </ImageBackground>
                </Animatable.View>
              </TouchableOpacity> : null }

              {/* ticket two touchable end */}
            </View>
            {/* ticket two component end */}

            {/* extra space start */}
            <View style={{ flex: 1 }} />
            {/* extra space end */}

          </View>
          {/* whole screen end */}

        </ImageBackground>
        {/* background component end */}

        <Animatable.Image
          animation={slideInCustom}
          // iterationCount="infinite"
          direction="normal"
          duration={40000}
          iterationCount="infinite"
          style={{
            marginTop: 50,
            marginLeft: 50,
            height: 50,
            resizeMode: 'contain'
            }}
          source={require('./../images/chooseCity/cloud.png')}
        />
        <Animatable.Image
          animation={slideInCustom}
          // iterationCount="infinite"
          direction="normal"
          duration={40000}
          iterationCount="infinite"

          style={{
            marginTop: 0,
            marginLeft: 0,
            height: 40,
            resizeMode: 'contain'
          }}
          source={require('./../images/chooseCity/cloud.png')}
        />
        <Animatable.Image
          animation="slideInLeft"
          // iterationCount="infinite"
          direction="normal"
          duration={20000}

          style={{
            marginTop: 80,
            marginLeft: -60,
            height: 50,
            resizeMode: 'contain'
            }}
          source={require('./../images/chooseCity/cloud.png')}
        />
        <Animatable.Image
          animation="slideInLeft"
          // iterationCount="infinite"
          direction="normal"
          duration={40000}

          style={{
            marginTop: 200,
            marginLeft: 100,
            height: 30,
            resizeMode: 'contain'
            }}
          source={require('./../images/chooseCity/cloud.png')}
        />
        <Animatable.Image
          animation="slideInLeft"
          // iterationCount="infinite"
          direction="normal"
          duration={40000}

          style={{
            marginTop: 10,
            marginLeft: 40,
            height: 30,
            resizeMode: 'contain'
            }}
          source={require('./../images/chooseCity/cloud.png')}
        />
      </View>
    );
  }
}

const mapStateToProps = ({ auth, source }) => {
  // console.log('this is source object in source city:', source);

  const { token } = auth;
  const { tickets } = source;

  return { tickets, token };
  };

export default connect(mapStateToProps, {
  userStatusChanged,
updateFirstScore,
updateSecondScore,
updateThirdScore,
cityStatus
 })(CityChoose);
