import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  Button,
  ListView,
  TextInput,
  Keyboard,
  Alert,
} from 'react-native';

import {
  totalSelector,
  entriesSelector,
} from './selectors';

@connect(state => ({
  total: totalSelector(state),
}))
class DailyTotalDisplay extends Component {
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

class Divider extends Component {
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

@connect(state => ({
  entries: entriesSelector(state),
}))
class DailyEntriesList extends Component {
  static propTypes = {
    style: PropTypes.object,
    entries: PropTypes.array,
  }

  static ds = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 !== r2,
  });

  state = {
    dataSource: DailyEntriesList.ds.cloneWithRows(this.props.entries),
  }

  renderRow(rowData) {
    return (
      <View style={{
        // alignSelf: 'flex-end',
        flexDirection: 'row',
        marginRight: 20,
        marginTop: 20,
      }}>

        <View style={{
          flex: 1,
          justifyContent: 'flex-end',
          marginRight: 10,
          paddingBottom: 11,
        }}>
          <Text style={{
            textAlign: 'right',
          }}>
            9:37 AM
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
        }}>
          <Text
            style={{
              fontSize: 22,
              color: '#222',
            }}
          >
            {rowData.amount}
          </Text>
        </View>
      </View>
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.entries !== this.props.entries) {
      this.setState({
        dataSource: DailyEntriesList.ds.cloneWithRows(nextProps.entries),
      });
    }
  }

  render() {
    return (
      <View style={{
        ...this.props.style,
        justifyContent: 'flex-start',
        alignSelf: 'stretch',
      }}>
        <ListView
          // renderScrollComponent={props => <InvertibleScrollView {...props} inverted />}
          enableEmptySections={true}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)}
        />
      </View>
    );
  }
}

@connect()
class ButtonToolbar extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    style: PropTypes.object,
  }

  state = {
    isEntryActive: false,
    kbSize: 0,
  }

  componentWillMount() {
    this.keyboardDidShowListener =
      Keyboard.addListener('keyboardDidShow', this._keyboardDidShow.bind(this));

    this.keyboardDidHideListener =
      Keyboard.addListener('keyboardDidHide', this._keyboardDidHide.bind(this));
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow(e) {
    this.setState({
      isEntryActive: true,
      kbSize: e.endCoordinates.height,
    });
  }

  _keyboardDidHide() {
    this.setState({
      isEntryActive: false,
      text: null,
    });
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
            color='grey'
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
                  date: new Date(),
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
            style={{ height: 40 }}
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

export {
  DailyTotalDisplay,
  Divider,
  DailyEntriesList,
  ButtonToolbar,
};
