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
} from 'react-native';
import { connect } from 'react-redux';
import Modal from 'react-native-root-modal';
import { updateVideoCity
 } from '../../src/actions';
 import Video from 'react-native-video';



const widthPic = Dimensions.get('window').width;
const heightPic = Dimensions.get('window').height;

// helper Functions

class ModalCityVideo extends Component {

  constructor(props) {
    super(props);
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }
onPressModal() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
  this.props.updateVideoCity(false);
}

onBuffer() {
  console.log('buffering');
}
onEnd() {
  console.log('onEnd');
}
setTime() {
  console.log('setTime');
}
setDuration() {
  console.log('setDuration');
}
loadStart() {
  console.log('loadStart');
}
videoError() {
  console.log('videoError');
}

stopVideo = (input) => {
  console.log('video stopped');
  this.props.questionThreeStop(input);
}

render() {
    const videoGame = 'http://velgardi-game.ir/' + this.props.user_status.city.video;

  return (
    <View>
    <TouchableWithoutFeedback
      onPress={() => this.onPressModal()}>

    <Modal
    style={styles.modal}
    visible={this.props.video_city_modal}
    >
      <View style={styles.modalContainer}>
        <View
          style={{
            flex: 2,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Video
                source={{ uri: videoGame }}
                paused={this.props.pause}
                resizeMode="contain"
                onBuffer={() => this.onBuffer()}
                onLoadStart={() => this.loadStart()}
                onLoad={() => this.setDuration()}
                onProgress={() => this.setTime()}
                onEnd={() => this.onEnd()}
                onError={() => this.videoError()}
                repeat={false}
                playInBackground={false}
                style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  width: widthPic * 0.9
                }}
             />
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
    backgroundColor: 'rgba(255, 143, 15, 0.8)',
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
    user_status,
    video_city_modal
   } = user;

  return {
    video_city_modal,
    user_status
   };
  };

export default connect(mapStateToProps, {
updateVideoCity })(ModalCityVideo);
