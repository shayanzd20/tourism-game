import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import {
  Text,
  View,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
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



class ModalPrize extends Component {

// constructor(props) {
//   super(props);
//   // const { text, visible, status } = this.props;
// }
onPressModal() {
  console.log('presseddddddd');
  // this.props.questionOneModalUpdate(false);
  // this.props.questionTwoModalUpdate(false);
  Actions.main();
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
          // width: ,
          // backgroundColor: 'red',
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
      fontFamily: 'BYekan'

  }
};

// const mapStateToProps = ({ q_one }) => {
//   console.log('this is question one state:', q_one);
//
//   const {
//     result,
//     modal_visible,
//     text_modal,
//     status
//    } = q_one;
//
//   return {
//     result,
//     modal_visible,
//     text_modal,
//     status
//    };
//   };

// export default connect(mapStateToProps, { questionOneModalUpdate, questionTwoModalUpdate })(ModalPrize);
export default ModalPrize;
