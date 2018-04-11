import {
  StyleSheet,
  Dimensions,
} from 'react-native';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

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
  buttonImageNextCity: {
    // position: 'absolute',
    // backgroundColor: 'blue',
    // backgroundColor: 'transparent',
    width: 100,
    height: 100,
    // alignSelf: 'stretch',
    // alignSelf: 'auto',
    // top: 150,
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
  buttonImageGameLuck: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    // backgroundColor: 'green',
    // bottom: -345,
    bottom: -(deviceHeight / 1.86),
    // top: 1000
  },
  buttonLockImage: {
    // backgroundColor: 'blue',
    width: 50,
    // bottom: 40,
    bottom: (deviceHeight / 16),

    // left: 50,
    left: (deviceWidth / 6),
    resizeMode: 'contain'
  },
  playButtonLock: {
    // backgroundColor: 'blue',
    width: 50,
    bottom: -50,
    // bottom: (deviceHeight / 16),

    left: 0,
    // left: (deviceWidth / 4),
    resizeMode: 'contain'
  }
});

export default styles;
