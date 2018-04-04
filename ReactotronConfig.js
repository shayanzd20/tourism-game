import Reactotron from 'reactotron-react-native';

  Reactotron
    .configure({
      name: 'React Native Demo',
      // enabled: true,
      // host: '192.168.1.6',  // server ip
      // port: 9090
    })
    .useReactNative() // add all built-in react native plugins
    .connect(); // let's connect!
