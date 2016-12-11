import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
} from 'react-native';

import {
  totalSelector,
} from './selectors';

@connect(state => ({
  total: totalSelector(state),
}))
export default class DailyTotalDisplay extends Component {
  static propTypes = {
    style: PropTypes.object,
    total: PropTypes.number,
  }

  render() {
    return (
      <View style={{
        ...this.props.style,
        padding: 20,
        flexDirection: 'row',
        alignItems: 'flex-end',
      }}>
        <View style={{ flex: 1, }}>
          <Text style={{
            textAlign: 'right',
            fontSize: 24,
            paddingBottom: 11, // HACK for baseline alignment
          }}>
            Total:
          </Text>
        </View>
        <View style={{
          backgroundColor: '#e5ffe5',
          borderColor: 'green',
          borderRadius: 35,
          borderWidth: 2,
          padding: 5,
          paddingLeft: 10,
          paddingRight: 10,
          marginLeft: 10,

        }}>
          <Text style={{
            fontSize: 38,
            color: '#222',
          }}>
            {this.props.total}
          </Text>
        </View>
      </View>
    );
  }
}
