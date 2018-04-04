
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
// import Router from './Router';
// import { Scene, Router } from 'react-native-router-flux';
// import LoginForm from './components/LoginForm';
// import LoginPage from '../pages/loginPage';
import Home from '../pages/home.js';



class App extends Component {
  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
      <Provider store={store}>
          <Home />
      </Provider>

    );
  }
}

export default App;
