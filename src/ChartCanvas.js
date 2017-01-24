import React, { Component, PropTypes } from 'react';
import { Dimensions, ScrollView } from 'react-native';
import {
  Svg,
} from 'react-native-svg';

export default class ChartCanvas extends Component {
  static propTypes = {
    ...Svg.propTypes,
    height: PropTypes.number,
    width: PropTypes.number,
    style: ScrollView.propTypes.style,
    scrollHorizontal: ScrollView.propTypes.horizontal,
    scrollEnabled: ScrollView.propTypes.scrollEnabled,
  };

  static defaultProps = {
    scrollHorizontal: true,
    scrollEnabled: false,
  };

  static childContextTypes = {
    height: PropTypes.number,
    width: PropTypes.number,
  };

  getChildContext = () => {
    const { height, width } = this.getChartDimensions();
    return {
      height,
      width,
    }
  };

  getChartDimensions = () => {
    const deviceDimensions = Dimensions.get('window');
    const height = this.props.height || deviceDimensions.height;
    const width = this.props.width || deviceDimensions.width;
    return { height, width };
  };

  render() {
    const { width, height } = this.getChartDimensions();
    const { style, scrollHorizontal, scrollEnabled } = this.props;

    return (
      <ScrollView style={style} horizontal={scrollHorizontal} scrollEnabled={scrollEnabled}>
        <Svg height={height} width={width} {...this.props} />
      </ScrollView>
    );
  }
}