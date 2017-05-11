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
import { ChartCanvas, BarChart, LineChart, Axis } from 'react-native-chart-awesome';

export default class basic extends Component {
  barPathProps = {
    fill(index, item, group) {
      // console.log({index, item, group});
      return index === 0 ? 'green' : 'blue';
    },
    onPress(index, item, group) {
      return function() {
        console.log({index, item, group});
      }
    },
  };

  linePathProps = {
    stroke(index, item) {
      // console.log({index, item});
      return index === 0 ? 'black' : 'red';
    },
    onPress(index, item) {
      return function() {
        console.log({index, item});
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
          min={0}
          max={8}
        >
          <BarChart
            data={[[1, 2, 3], [4, 5, 6]]}
            pathProps={this.barPathProps}
          />
          <LineChart
            data={[[[0, 1], [1, 3], [2, 8]], [[3, 1], [1, 2], [0, 4]]]}
            pathProps={this.linePathProps}
          />
          <Axis
            direction="horizontal"
            stroke="red"
            strokeWidth={4}
            position={'20%'}
            ticks={['category1', 'category2', 'category3']}
            tickLength={2}
          />
          <Axis
            direction="vertical"
            stroke="red"
            strokeWidth={4}
            min={0}
            max={8}
            ticks={4}
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
