import React, { Component } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser } from '../actions';
import { Card, CardSection, Input, Button, Spinner } from './common';

class LoginForm extends Component {

onEmailChange(text) {
  this.props.emailChanged(text);
}

onPasswordChange(text) {
  this.props.passwordChanged(text);
}

onPressButton() {
  const { email, password } = this.props;
  this.props.loginUser({ email, password });
}

renderButton() {
  if (this.props.loading) {
    return (
      // spinner
      <Spinner size='large' />
    );
  }
    return (
      <Button onPress={this.onPressButton.bind(this)}>
        Login
      </Button>
    );
}

render() {
  return (
    <Card>
      <CardSection>
        <Input
          label="Email"
          placeholder="email@gmail.com"
          onChangeText={this.onEmailChange.bind(this)}
          value={this.props.email}
        />
      </CardSection>

      <CardSection>
        <Input
          secureTextEntry
          label="password"
          placeholder="enter password"
          onChangeText={this.onPasswordChange.bind(this)}
          value={this.props.password}
        />
      </CardSection>

      <Text style={styles.errorTextStyle}>
          {this.props.error}
      </Text>

      <CardSection>
        {this.renderButton()}
      </CardSection>
    </Card>
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

// old
 // const mapStateToProps = state => {
 //   return {
 //     email: state.auth.email,
 //     password: state.auth.password,
 //     error: state.auth.error,
 //   };
 // };

 const mapStateToProps = ({ auth }) => {
   // console.log('this is auth text:', auth);
   const { email, password, error, loading } = auth;
   // console.log('this is email text:', email);
   // console.log('this is error text:', error);
   // console.log('this is return :', { email, password, error });

   return { email, password, error, loading };
   };


export default connect(mapStateToProps, {
  emailChanged,
  passwordChanged,
  loginUser
})(LoginForm);
