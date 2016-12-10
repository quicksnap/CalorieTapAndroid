/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AsyncStorage,
  AppRegistry,
  StyleSheet,
  View,
} from 'react-native';
import { Provider } from 'react-redux';

import {
  DailyTotalDisplay,
  Divider,
  DailyEntriesList,
  ButtonToolbar,
} from './src';
import configureStore from './configureStore';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: 'white',
  },
});

const store = configureStore();

(async () => {
  try {
    const data = await AsyncStorage.getItem('AppData');
    if (data) {
      store.dispatch({ type: 'HYDRATE', payload: JSON.parse(data), });
    }
  } catch (e) {
    console.warn('Error hydrating', e);
    throw e;
  }
})();

export default class CalorieTapAndroid extends Component {
  componentWillUnmount() {
    console.log('BYEBYE');
  }

  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <DailyTotalDisplay />
          <Divider />
          <DailyEntriesList style={{ flex: 1, }} />
          <ButtonToolbar />
        </View>
      </Provider>
    );
  }
}

AppRegistry.registerComponent('CalorieTapAndroid', () => CalorieTapAndroid);
