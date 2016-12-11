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
    isEntryActive: false,
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

    let buttonSet;
    if (!this.state.isEntryActive) {
      buttonSet = (
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
              this.setState({ isEntryActive: true, });
            }}
            title='Add Entry'
            color='green'
            accessibilityLabel='Add Entry'
          />
        </View>
      );
    } else {
      buttonSet = (
        <View style={buttonViewStyle}>
          <Button
            onPress={() => this.setState({ isEntryActive: false, })}
            title='Nevermind'
            color='red'
            accessibilityLabel='Nevermind'
          />
          <Button
            disabled={!this.state.text}
            onPress={() => {
              this.props.dispatch({
                type: 'ADD_ENTRY',
                payload: {
                  amount: parseInt(this.state.text, 10),
                  note: 'I am a thing!',
                  timestamp: new Date().getTime(),
                }
              });
              this.setState({
                isEntryActive: false,
                text: null,
              });
            }}
            title='Yum!'
            color='blue'
            accessibilityLabel='Yum!'
          />

        </View>
      );
    }

    return (
      <View
        behavior='height'
        style={{
          ...this.props.style,
          alignSelf: 'stretch',
        }}>

        {this.state.isEntryActive &&
          <TextInput
            autoFocus={true}
            style={{
              height: 40,
              textAlign: 'right',
              fontSize: 18,
            }}
            placeholder='Enter Calories'
            keyboardType='numeric'
            onChangeText={text => this.setState({ text })}
            value={this.state.text}
          />
        }

        {buttonSet}

      </View>
    );
  }
}
