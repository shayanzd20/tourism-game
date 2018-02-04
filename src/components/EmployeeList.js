import React, { Component } from 'react';
import { Text, View } from 'react-native';

class EmployeeList extends Component {
render() {
  return (
    <View>
      <Text style={styles.errorTextStyle}>EployeeList</Text>
      <Text style={styles.errorTextStyle}>EployeeList</Text>
      <Text style={styles.errorTextStyle}>EployeeList</Text>
      <Text style={styles.errorTextStyle}>EployeeList</Text>
      <Text style={styles.errorTextStyle}>EployeeList</Text>
    </View>
  );
}

}

const styles = {
  errorTextStyle: {
      fontSize: 20,
      alignSelf: 'center',
      color: 'red'
  }
};


export default EmployeeList;
