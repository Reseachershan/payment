/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import { StatusBar, StyleSheet } from 'react-native';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './src/store';
import { MainStack } from './src/navigators';

const App = (): JSX.Element => {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StatusBar translucent={true} backgroundColor={'#00000000'} />
        <MainStack />
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
});

export default App;