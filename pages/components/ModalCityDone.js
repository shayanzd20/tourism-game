import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import {
  Text,
  View,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
  Platform,
  UIManager,
  LayoutAnimation
} from 'react-native';
import Modal from 'react-native-root-modal';

const widthPic = Dimensions.get('window').width;
const heightPic = Dimensions.get('window').height;

// helper Functions
const smile = () => {
  return (
    <View
      style={{
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Image
        source={require('./../../images/modal/smile.png')}
        style={{
          width: 100,
          height: 100,
        }}
      />
    </View>
  );
};

const sad = () => {
  return (
    <View
      style={{
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Image
        source={require('./../../images/modal/sad.png')}
        style={{
          width: 100,
          height: 100,
        }}
      />
    </View>
  );
}



class ModalCityDone extends Component {

constructor(props) {
  super(props);
  this.state = { visibility: null };
  if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

componentWillMount() {
  this.setState({ visibility: this.props.visible });
}

onPressModal() {
  // console.log('ciry done modal click');
  this.setState({ visibility: false });
  Actions.city();
}

render() {

  return (
    <View>
    <TouchableWithoutFeedback
      onPress={() => this.onPressModal()}>

    <Modal
    style={styles.modal}
    visible={this.state.visibility}
    >
      <View style={styles.modalContainer}>
        <View
          style={{
            flex: 2,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={require('./../../images/modal/cup.png')}
            style={{
              width: 100,
              height: 100,
            }}
          />
        </View>
        <View
          style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Text style={styles.text}>آفرین ، حالا میتونی  بری یه شهر دیگه</Text>
        </View>
        <View
          style={{
            flex: 1,
            // backgroundColor: 'blue',
          }}>
        </View>
      </View>
  </Modal>
</TouchableWithoutFeedback>
</View>


    );
  }
}


const styles = {
  modal: {
    position: 'absolute',
    width: widthPic,
    height: heightPic,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderRadius: 10,
    overflow: 'hidden'
  },
  modalContainer: {
    position: 'absolute',
    top: 160,
    height: 300,
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(58, 93, 15, 0.8)',
    borderRadius: 20,
    overflow: 'hidden'
  },
  text: {
      color: '#fff',
      fontSize: 20,
      fontFamily: 'BYekan'

  }
};

export default ModalCityDone;
