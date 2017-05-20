import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dimensions, ScrollView, View } from 'react-native';
import {
  Svg,
} from 'react-native-svg';
import Axis from './Axis';

export default class ChartCanvas extends Component {
  static propTypes = {
    ...Svg.propTypes,
    height: PropTypes.number,
    width: PropTypes.number,
    style: ScrollView.propTypes.style,
    scrollHorizontal: ScrollView.propTypes.horizontal,
    scrollEnabled: ScrollView.propTypes.scrollEnabled,
    min: PropTypes.number,
    max: PropTypes.number,
    fixedAxes: PropTypes.arrayOf(PropTypes.shape(Axis.propTypes)),
    staticAxes: PropTypes.arrayOf(PropTypes.shape(Axis.propTypes)),
  };

  static defaultProps = {
    scrollHorizontal: true,
    scrollEnabled: false,
    fixedAxes: [],
    staticAxes: [],
  };

  static childContextTypes = {
    height: PropTypes.number,
    width: PropTypes.number,
    min: PropTypes.number,
    max: PropTypes.number,
  };

  getChildContext = () => {
    const { height, width } = this.getChartDimensions();
    const { min, max } = this.props;

    return {
      height,
      width,
      min,
      max,
    };
  };

  getChartDimensions = () => {
    const deviceDimensions = Dimensions.get('window');
    const height = this.props.height || deviceDimensions.height;
    const width = this.props.width || deviceDimensions.width;
    return { height, width };
  };

  render() {
    const { width, height } = this.getChartDimensions();
    const { style, scrollHorizontal, scrollEnabled, ...svgProps } = this.props;

    return (
      <View style={style}>
        <ScrollView horizontal={scrollHorizontal} scrollEnabled={scrollEnabled}>
          <Svg
            height={height}
            width={width}
            {...svgProps}
          />
        </ScrollView>
      </View>
    );
  }
}
