
import React from 'react';
import {
  View,
  ActivityIndicator
} from 'react-native';

const Spinner = ({ size }) => {
  const { spinnerStyle } = styles;

  return (
    <View style={spinnerStyle} >
      <ActivityIndicator size={size || 'large'} />
    </View>
  );
};

const styles = {
  spinnerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  labelStyle: {
    paddingLeft: 20,
    fontSize: 18,
    flex: 1
  },
  containerStyle: {
    height: 40,
    flex: 1,
    flexDirection: 'row',
    align: 'center'
  }
};

export { Spinner };
