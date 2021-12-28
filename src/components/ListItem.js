import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableWithoutFeedback,
    LayoutAnimation,
    Platform,
    UIManager
   } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions';

class ListItem extends Component {

// is called every time a re-render is required, such as when this.setState() is called.
 // Animate the update
 constructor() {
     super();
     if (Platform.OS === 'android') {
       UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
     }
   }

  componentWillUpdate() {
    LayoutAnimation.spring();
  }

  renderDescription() {
    const { library, expanded } = this.props;
    if (expanded) {
      return (
        <Text style={{ flex: 1 }}>
          {library.description}
        </Text>
      );
    }
  }

  render() {
    const { container, welcome } = styles;
    const { id, title } = this.props.library;
    console.log('this is list Item:');
    console.log(this.props);

      return (
        <TouchableWithoutFeedback
          onPress={
            () => {this.props.selectLibrary(id);}
          }
          >
          <View>
            <View style={container} >
              <Text style={welcome} >{title}</Text>
            </View>
            <Text style={welcome} >{this.renderDescription()}</Text>
          </View>
        </TouchableWithoutFeedback>

      );
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
};

// ownProps => props of this boiler plate
const mapStateToProps = (state, ownProps) => {

  const expanded = state.selectedLibraryId === ownProps.library.id;
  return { expanded };
};

export default connect(mapStateToProps, actions)(ListItem);
