import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar} from 'react-native';
import Route from './src/navigation/route';
import {MenuProvider} from 'react-native-popup-menu';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <MenuProvider>
        <Route />
      </MenuProvider>
    </Provider>
  );
};

export default App;
