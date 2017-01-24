/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';
import { ChartCanvas, BarChart } from 'react-native-chart-awesome';

export default class basic extends Component {
  pathProps = {
    fill(index, item, group) {
      console.log({index, item, group});
      return index === 0 ? 'green' : 'blue';
    },
    onPress(index, item, group) {
      return function() {
        console.log({index, item, group});
      }
    },
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <ChartCanvas
          height={300}
          width={500}
          scrollEnabled
        >
          <BarChart
            data={[[1, 2, 3], [4, 5, 6]]}
            pathProps={this.pathProps}
          />
        </ChartCanvas>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
  },
});

AppRegistry.registerComponent('basic', () => basic);
