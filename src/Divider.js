import React, { Component, PropTypes } from 'react';
import {
  View,
} from 'react-native';

export default class Divider extends Component {
  static propTypes = {
    style: PropTypes.object,
  }

  render() {
    return (
      <View style={{
        ...this.props.style,
        backgroundColor: '#555',
        height: 3,
        alignSelf: 'stretch',
      }} />
    );
  }
}
