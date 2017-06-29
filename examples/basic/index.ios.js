/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {
  ChartCanvas,
  BarChart,
} from 'react-native-chart-awesome';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
  },
});

export default class basic extends Component {
  barPathProps = {
    fill(index, item, group) {
      console.log({ index, item, group });
      return index === 0 ? 'black' : 'gray';
    },
    onPress(index, item, group) {
      return function () {
        console.log({ index, item, group });
      };
    },
  };

  stackedBarPathProps = {
    fill(index, item, group) {
      if (group === 0) return '#34403A';
      if (group === 1) return '#285238';
      if (group === 2) return '#138A36';
      return '#04E824';
    },
    onPress(index, item, group) {
      return function () {
        console.log({ index, item, group });
      };
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
        </ChartCanvas>
        <ChartCanvas
          height={300}
          width={500}
          scrollEnabled
          min={0}
          max={30}
        >
          <BarChart
            data={[[4, 2, 6, 4], [1, 5, 8, 1], [3, 7, 2, 7], [9, 1, 5, 2]]}
            pathProps={this.stackedBarPathProps}
            isStacked
          />
        </ChartCanvas>
      </ScrollView>
    );
  }
}

AppRegistry.registerComponent('basic', () => basic);
