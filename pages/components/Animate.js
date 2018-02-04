import React, { Component } from 'react';
import {
  Animated,
} from 'react-native';

class Animate extends Component {

constructor(props) {
  super(props);
  this.animated = new Animated.Value(0);
}

componentDidMount() {
  this.animate();
}

  // helper function
  transformFunction = () => {
    if (this.props.animation === 'transRightToLeft') {
      const transform = this.transRightToLeft();
      return transform;
    }
      const transform = this.transLeftToRight();
      return transform;
  }

  animate() {
    Animated.timing(
      // start or initial Value
      this.animated,
      // confige object
      {
        toValue: 1,
        duration: 1000,
        useNativeDriver: 'true'
      }
    ).start();
  }

  transRightToLeft() {
    const translateX = this.animated.interpolate({
      inputRange: [0, 1],
      outputRange: [500, 1]
    });
    return [{ translateX }];
  }

  transLeftToRight() {
    const translateX = this.animated.interpolate({
      inputRange: [0, 1],
      outputRange: [-500, 1]
    });
    return [{ translateX }];
  }

  render() {
    const transform = this.transformFunction();
    return (
      <Animated.Text
        style={[this.props.style, { transform }]}
                  // animation="fadeInRight"
                  // duration={1000}
                   >{this.props.text}</Animated.Text>
    );
  }

}


export default Animate;
