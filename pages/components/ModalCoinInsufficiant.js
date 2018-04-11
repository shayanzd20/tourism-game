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
  LayoutAnimation,
  // TouchableHighlight,
} from 'react-native';
import { connect } from 'react-redux';
import Modal from 'react-native-root-modal';
import { insufficiantModalUpdate
 } from '../../src/actions';


const widthPic = Dimensions.get('window').width;
const heightPic = Dimensions.get('window').height;

// helper Functions
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
        source={require('./../../images/specificCity/insufficiant.png')}
        style={{
          width: 100,
          height: 100,
        }}
      />
    </View>
  );
}



class ModalCoinInsufficiant extends Component {

  constructor(props) {
    super(props);
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }
onPressModal() {
  this.props.insufficiantModalUpdate(false);
}

render() {
    const modalStatusEmoji = sad();

  return (
    <View>
    <TouchableWithoutFeedback
      onPress={() => this.onPressModal()}>

    <Modal
    style={styles.modal}
    visible={this.props.insufficiant_visible}
    >
      <View style={styles.modalContainer}>
        {modalStatusEmoji}
        <View
          style={{
          flex: 1,
          // width: ,
          // backgroundColor: 'red',
          alignSelf: 'center',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Text style={styles.text}>{this.props.text}</Text>
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
      fontFamily: 'BYekan',
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center'


  }
};

const mapStateToProps = ({ user }) => {
  const {
    insufficiant_visible
   } = user;

  return {
    insufficiant_visible
   };
  };

export default connect(mapStateToProps, {
insufficiantModalUpdate })(ModalCoinInsufficiant);
