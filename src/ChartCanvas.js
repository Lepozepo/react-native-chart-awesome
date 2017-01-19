import React, { Component, PropTypes } from 'react';
import {
  Svg,
} from 'react-native-svg';

export default class ChartCanvas extends Component {
  static propTypes = {
    ...Svg.propTypes,
  };

  render() {
    return (
      <Svg {...this.props} />
    );
  }
}