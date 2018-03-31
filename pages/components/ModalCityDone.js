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
  // TouchableHighlight,
} from 'react-native';
import Modal from 'react-native-root-modal';
// import { connect } from 'react-redux';
// import { questionOneModalUpdate,
//          questionTwoModalUpdate
//  } from '../../src/actions';


const widthPic = Dimensions.get('window').width;
const heightPic = Dimensions.get('window').height;

// helper Functions
const smile = () => {
  return (
    <View
      style={{
        flex: 2,
        // backgroundColor: 'blue',
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
        // backgroundColor: 'blue',
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
  // const { text, visible, status } = this.props;
  this.state = { visibility: null };
  if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

componentWillMount() {
  // const CustomLayoutSpring = {
  //     duration: 400,
  //     create: {
  //       type: LayoutAnimation.Types.spring,
  //       property: LayoutAnimation.Properties.scaleXY,
  //       springDamping: 0.7,
  //     },
  //     update: {
  //       type: LayoutAnimation.Types.spring,
  //       springDamping: 0.7,
  //     },
  //   };
  //
  // LayoutAnimation.configureNext(CustomLayoutSpring);
  this.setState({ visibility: this.props.visible });
}

onPressModal() {
  // console.log('ciry done modal click');
  // LayoutAnimation.configureNext(CustomLayoutSpring);
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
            // backgroundColor: 'blue',
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
          // width: ,
          // backgroundColor: 'red',
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
          {/* answer text start */}
          {/* <Text>salam</Text> */}
          {/* answer text end */}
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
    // top: 40,
    // right: 40,
    // bottom: 20,
    // left: 40,
    width: widthPic,
    height: heightPic,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'rgba(60, 84, 15, 0.8)',
    backgroundColor: 'transparent',
    borderRadius: 10,
    overflow: 'hidden'
  },
  modalContainer: {
    position: 'absolute',
    top: 160,
    // right: 40,
    // bottom: 20,
    // left: 40,
    height: 300,
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(58, 93, 15, 0.8)',
    // backgroundColor: 'green',
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
