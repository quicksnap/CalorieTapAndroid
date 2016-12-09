/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
} from 'react-native';

import {
  DailyTotalDisplay,
  Divider,
  DailyEntriesList,
  ButtonToolbar,
} from './src';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
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
});

export default class CalorieTapAndroid extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View>
          <DailyTotalDisplay />
          <Divider />
          <DailyEntriesList />
          <ButtonToolbar />
        </View>
      </View>
    );
  }
}

AppRegistry.registerComponent('CalorieTapAndroid', () => CalorieTapAndroid);
