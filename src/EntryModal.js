import React, { Component, PropTypes } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
} from 'react-native';
import { connect } from 'react-redux';

import { isEntryModalOpen } from './selectors';

@connect(state => ({
  isEntryModalOpen: isEntryModalOpen(state),
}))
export default class EntryModal extends Component {
  static propTypes = {
    isEntryModalOpen: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
  }

  render() {
    return (
      <View>
        <Modal
          animationType={'fade'}
          transparent={true}
          visible={this.props.isEntryModalOpen}
          onRequestClose={() => this.props.dispatch({ type: 'HIDE_MODAL' })}
        >
          <View style={{
            flex: 1,
            justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,.3)'
          }}>
            <View style={{
              height: 250,
              marginRight: 50,
              marginLeft: 50,
              padding: 20,
              borderRadius: 5,
              borderWidth: 1,
              borderColor: '#666',
              backgroundColor: 'white',
            }}>
              <View>
                <Text>1,215</Text>
                <TextInput onChangeText={() => {}} />
              </View>

              <View>
                <Text>Calc Display</Text>
              </View>

            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

/**
 <View style={buttonViewStyle}>
  <Button
    onPress={() => this.setState({
      isEntryActive: false,
      text: null,
    })}
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

{this.state.isEntryActive &&
  <TextInput
    autoFocus={true}
    style={{
      height: 40,
      marginRight: 10,
      marginLeft: 10,
      textAlign: 'right',
      fontSize: 18,
    }}
    placeholder='Enter Calories'
    keyboardType='numeric'
    onChangeText={text => this.setState({ text })}
    value={this.state.text}
  />
}

 */

