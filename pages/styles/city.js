import {
  StyleSheet,
  Dimensions,
} from 'react-native';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({

  cityDescription: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,

  },
  cityPicture: {
    position: 'absolute',
    width: deviceWidth,
    height: deviceHeight,
  },
  buttonImage: {
    position: 'absolute',
    backgroundColor: 'transparent',
    width: 100,
    height: 100,
    top: 150,
    alignSelf: 'center',
  },
  buttonImageNextCity: {
    width: 100,
    height: 100,
    alignSelf: 'center',
  },
  buttonImageGame: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  buttonImageGameLuck: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    bottom: -(deviceHeight / 1.86),
  },
  buttonLockImage: {
    width: 50,
    bottom: (deviceHeight / 16),
    left: (deviceWidth / 6),
    resizeMode: 'contain'
  },
  playButtonLock: {
    width: 50,
    bottom: -50,
    left: 0,
    resizeMode: 'contain'
  }
});

export default styles;
