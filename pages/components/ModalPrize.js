import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import {
  Text,
  View,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import Modal from 'react-native-root-modal';
import { connect } from 'react-redux';
import { questionOneModalUpdate,
         questionTwoModalUpdate,
         questionThreeModalUpdate,
         questionOneProgressUpdate,
         questionTwoProgressUpdate,
         questionThreeProgressUpdate
 } from '../../src/actions';


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



class ModalPrize extends Component {

onPressModal() {
  this.props.questionOneModalUpdate(false);
  this.props.questionTwoModalUpdate(false);
  this.props.questionThreeModalUpdate(false);
  Actions.replace('main');
  Actions.replace('gameChoose');
}

render() {
  console.log('status in modal prize:', this.props.status);
    let modalStatusEmoji;

    if (this.props.status === 'correct') {
      modalStatusEmoji = smile();
    } else {
      modalStatusEmoji = sad();
    }

  return (
    <View>
    <TouchableWithoutFeedback
      onPress={() => this.onPressModal()}>

    <Modal
    style={styles.modal}
    visible={this.props.visible}
    >
      <View style={styles.modalContainer}>
        {modalStatusEmoji}
        <View
          style={{
          flex: 1,
          alignSelf: 'center',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Text style={styles.text}>{this.props.text}</Text>
        </View>
        <View
          style={{
            flex: 1,
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
      fontFamily: 'BYekan',
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center'


  }
};

const mapStateToProps = ({ q_one }) => {

  const {
    result,
    modal_visible,
    text_modal,
    status
   } = q_one;

  return {
    result,
    modal_visible,
    text_modal,
    status
   };
  };

// export default connect(mapStateToProps, { questionOneModalUpdate, questionTwoModalUpdate })(ModalPrize);
export default connect(mapStateToProps, {
  questionOneModalUpdate,
  questionTwoModalUpdate,
  questionThreeModalUpdate,
  questionOneProgressUpdate,
  questionTwoProgressUpdate,
  questionThreeProgressUpdate
 })(ModalPrize);
