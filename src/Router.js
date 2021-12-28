import React from 'react';
import { Scene, Router } from 'react-native-router-flux';

// pages
import CityChoose from '../pages/cityChoose';
import GameChoose from '../pages/gameChoose';
import SourceScreen from '../pages/sourceScreen';
import LoginPage from '../pages/loginPage';
import Home from '../pages/home.js';


// city
import City from '../pages/city';
//
// // games
import Game1 from '../pages/game1';
import Game2 from '../pages/game2';
import Game3 from '../pages/game3';

const RouterComponent = () => {
  return (
      <Router>
        <Scene key='root'>
          <Scene key='auth'>
            <Scene key='login' component={LoginPage} />
          </Scene>
          <Scene key='main' initial>
            <Scene key='gameChoose' component={GameChoose} />
            <Scene key='home' component={Home} initial />
          </Scene>
          <Scene key='sourceScreen'>
            <Scene key='sourceScreen' component={SourceScreen} />
          </Scene>
          <Scene key='game1'>
            <Scene key='game1' component={Game1} />
          </Scene>
          <Scene key='game2'>
            <Scene key='game2' component={Game2} />
          </Scene>
          <Scene key='game3'>
            <Scene key='game3' component={Game3} />
          </Scene>
          <Scene key='city'>
            <Scene key='simple' component={City} />
            <Scene key='cityChoose' component={CityChoose} />
          </Scene>
        </Scene>
      </Router>
  );
};

export default RouterComponent;
