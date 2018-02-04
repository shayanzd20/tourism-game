import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

console.log('deviceWidth:', deviceWidth);
console.log('deviceHeight:', deviceHeight);

class City extends Component {

  static navigationOptions = {
    title: '',
    header: null
  };


onGameChooseClick() {
  Actions.gameChoose();
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
    <View style={{ flex: 3 }}>
      <TouchableOpacity
        style={{
        // backgroundColor: 'yellow',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <Animatable.View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'stretch',
        }}
          animation="flipInY"
          duration={1000}
          delay={2500}
        >
          <Image
            // befor style
            // style={{
            //   width: 100,
            //   resizeMode: 'contain'
            // }}
            style={styles.buttonImage}
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
          animation="flipInY"
          duration={1000}
          delay={2500}
        >
          <Image
            style={styles.buttonImage}
            source={require('./../images/specificCity/nextCity.png')}
          />
              <Animatable.View
                animation="flipInY"
                duration={1000}
                delay={2500}
              >
                <Image
                  style={styles.buttonLockImage}
                  source={require('./../images/specificCity/Lock.png')} />
            </Animatable.View>
      </Animatable.View>
      </TouchableOpacity>
    </View>
  );
}

  render() {
    let cityPopulation = '';
    let cityArea = '';
    let cityDescription = '';
    let nextCityButton;
    // const { navigate } = this.props.navigation;
    // let navigateVar = this.props.navigation;

    console.log('city prop user3: ', this.props.user_status.city);
    console.log('city prop user city status: ', this.props.user_status.status);
    const userCityStatus = this.props.user_status.status;
    const cityName = this.props.user_status.city.name;
    // console.log('type of name: ',typeof this.props.user_status.city.name);
    // console.log('type of population: ',typeof this.props.user_status.city.population);
    // console.log('population number: ',this.props.user_status.city.population);
    if (this.props.user_status.city.population !== 0) {
      console.log('population');
      cityPopulation = 'جمعیت: ' + this.props.user_status.city.population + ' نفر';
      console.log(cityPopulation);
    }
    if (this.props.user_status.city.area !== 0) {
      console.log('area');
      cityArea = 'مساحت: ' + this.props.user_status.city.area + ' کیلومتر مربع';
      console.log(cityArea);
    }

    if (this.props.user_status.city.description !== '') {
      console.log('description');
      cityDescription = this.props.user_status.city.description;
      console.log(cityDescription);
    }
    if (userCityStatus === 'arrive') {
      // we have to lock travel button
      console.log('user arrived');
      nextCityButton = this.travelButtonLock();
    } else {
      // travel button is open
      console.log('user leave');
      nextCityButton = this.travelButton();
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
                      onPress={this.onGameChooseClick.bind(this)}
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
                        animation="flipInY"
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

                {/* start next city button and text*/}
                <View
                  style={{ flex: 1,
                    flexDirection: 'column',
                // backgroundColor: '#42b0f4'
                    }}
                >
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

      </View>

    );
  }
}

const styles = StyleSheet.create({

  cityDescription: {
    // backgroundColor: 'purple',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,

  },
  cityPicture: {
    position: 'absolute',
    // backgroundColor: 'orange' ,
    // flex:1,
    // resizeMode: 'cover',
    // backgroundColor: 'rgba(0,0,0,.9)',
    width: deviceWidth,
    height: deviceHeight,
    // width: Dimensions.get('window').width,
    // height: Dimensions.get('window').height*0.2,
  },
  buttonImage: {
    position: 'absolute',
    // backgroundColor: 'blue',
    backgroundColor: 'transparent',
    width: 100,
    height: 100,
    // alignSelf: 'stretch',
    // alignSelf: 'auto',
    top: 150,
    // top: (deviceHeight / 3) - (deviceHeight / 9),
    alignSelf: 'center',
    // resizeMode: 'contain'
    // resizeMode: 'cover',
  },
  buttonImageGame: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    // backgroundColor: 'green',
    // bottom: 0,
  },
  buttonLockImage: {
    // backgroundColor: 'blue',
    width: 50,
    // bottom: 40,
    bottom: (deviceHeight / 16),

    // left: 50,
    left: (deviceWidth / 4),
    resizeMode: 'contain'
  }
});
const mapStateToProps = ({ user }) => {
  console.log('this is auth text:', user);
  const { user_status } = user;
  return { user_status };
  };
export default connect(mapStateToProps)(City);
