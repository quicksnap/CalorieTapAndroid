import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Button,
  TextInput,
  Alert,
} from 'react-native';

@connect()
export default class ButtonToolbar extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    style: PropTypes.object,
  }

  state = {
    text: null,
  }

  render() {
    const buttonViewStyle = {
      flexDirection: 'row',
      backgroundColor: '#222',
      alignSelf: 'stretch',
      alignItems: 'center',
      justifyContent: 'space-around',
      height: 70,
    };

    return (
      <View
        behavior='height'
        style={{
          ...this.props.style,
          alignSelf: 'stretch',
        }}>

        <View style={buttonViewStyle}>
          <Button
            onPress={() => {
              Alert.alert(
                'Clear Entries',
                'R U Sure?',
                [
                  {
                    text: 'No', onPress: () => {},
                    style: 'cancel',
                  },
                  {
                    text: 'Yup',
                    onPress: () => this.props.dispatch({ type: 'CLEAR_ENTRIES' }),
                  },
                ]
              );
            }}
            title='Clear Entries'
            color='red'
            accessibilityLabel='Clear Entries'
          />
          <Button
            onPress={() => {
              this.props.dispatch({ type: 'SHOW_MODAL' });
            }}
            title='Add Entry'
            color='green'
            accessibilityLabel='Add Entry'
          />
        </View>

      </View>
    );
  }
}
