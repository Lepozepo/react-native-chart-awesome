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
      <Svg height={360} width={300} {...this.props} />
    );
  }
}