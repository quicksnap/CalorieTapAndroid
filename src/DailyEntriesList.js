import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  ListView,
} from 'react-native';

import {
  entriesSelector,
} from './selectors';

import { formatAMPM } from './helpers';

@connect(state => ({
  entries: entriesSelector(state),
}))
export default class DailyEntriesList extends Component {
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
            {formatAMPM(rowData.timestamp)}
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
