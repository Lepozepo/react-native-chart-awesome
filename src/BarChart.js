import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  G,
  Path,
} from 'react-native-svg';
import calculateBars from 'paths-js/bar';
import isPlainObject from 'lodash/isPlainObject';

export default class BarChart extends Component {
  static propTypes = {
    // calculateBars props
    data: PropTypes.oneOfType([
      PropTypes.arrayOf(
        PropTypes.arrayOf(
          PropTypes.object
        )
      ),
      PropTypes.arrayOf(
        PropTypes.arrayOf(
          PropTypes.number
        )
      ),
    ]).isRequired,
    accessor: PropTypes.func,
    pathProps: PropTypes.object,
    width: PropTypes.number,
    height: PropTypes.number,
    gutter: PropTypes.number,
    offset: PropTypes.array,
    max: PropTypes.number,
    min: PropTypes.number,
    // Path Props
    fill: Path.propTypes.fill,
    stroke: Path.propTypes.stroke,
    strokeWidth: Path.propTypes.strokeWidth,
  };

  static defaultProps = {
    accessor(datum) {
      if (isPlainObject(datum)) return datum.value;
      return datum;
    },
    gutter: 0,
    offset: [0, 0],
    fill: 'black',
  };

  static contextTypes = {
    height: PropTypes.number,
    width: PropTypes.number,
    min: PropTypes.number,
    max: PropTypes.number,
  };

  getMinMax = () => {
    const min = this.props.min || this.context.min;
    const max = this.props.max || this.context.max;
    return { min, max };
  };

  getDimensions = () => {
    const height = this.props.height || this.context.height;
    const width = this.props.width || this.context.width;
    return { height, width };
  };

  getBarChart = () => {
    const { data, accessor, pathProps, gutter, offset } = this.props;
    const { min, max } = this.getMinMax();
    const { height, width } = this.getDimensions();
    return calculateBars({
      data,
      accessor,
      compute: pathProps,
      height,
      width,
      gutter,
      max,
      min,
      offset,
    });
  }

  render() {
    const barChart = this.getBarChart();
    const { children } = this.props;
    return (
      <G>
        {barChart.curves.map((curve, key) => {
          const { line: { path }, group, index, item, ...computedPathProps } = curve;
          return (
            <Path
              key={key}
              d={path.print()}
              fill={this.props.fill}
              stroke={this.props.stroke}
              strokeWidth={this.props.strokeWidth}
              {...computedPathProps}
            />
          );
        })}
        {children}
      </G>
    );
  }
}