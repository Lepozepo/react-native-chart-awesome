import React, { Component, PropTypes } from 'react';
import {
  G,
  Path,
} from 'react-native-svg';
import calculateLines from 'paths-js/stock';
import isPlainObject from 'lodash/isPlainObject';
import _isFinite from 'lodash/isFinite';
import every from 'lodash/every';

export default class LineChart extends Component {
  static propTypes = {
    // calculateLines props
    data: PropTypes.oneOfType([
      PropTypes.arrayOf(
        PropTypes.arrayOf(
          PropTypes.object
        )
      ),
      PropTypes.arrayOf(
        PropTypes.arrayOf(
          PropTypes.arrayOf(function(propValue, key, componentName, location, propFullName) {
            if (propValue.length !== 2 && !every(propValue, _isFinite)) {
              return new Error(`Invalid prop ${propFullName} supplied to ${componentName}. If you are passing
                an array of arrays of arrays, the last array must be two numbers.
              `);
            }
          })
        )
      ),
    ]).isRequired,
    xaccessor: PropTypes.func,
    yaccessor: PropTypes.func,
    pathProps: PropTypes.object,
    width: PropTypes.number,
    height: PropTypes.number,
    max: PropTypes.number,
    min: PropTypes.number,
    sort: PropTypes.bool,
    closed: PropTypes.bool,

    // Path Props
    fill: Path.propTypes.fill,
    stroke: Path.propTypes.stroke,
    strokeWidth: Path.propTypes.strokeWidth,
    // Custom
    isFilled: PropTypes.bool,
  };

  static defaultProps = {
    xaccessor(datum) {
      if (isPlainObject(datum)) return datum.position;
      return datum && datum[0];
    },
    yaccessor(datum) {
      if (isPlainObject(datum)) return datum.value;
      return datum && datum[1];
    },
    sort: false,
    stroke: 'black',
    strokeWidth: 2,
    fill: 'none',
    isFilled: false,
  };

  static contextTypes = {
    height: PropTypes.number,
    width: PropTypes.number,
  };

  getDimensions = () => {
    const height = this.props.height || this.context.height;
    const width = this.props.width || this.context.width;
    return { height, width };
  };

  getLineChart = () => {
    const { data, xaccessor, yaccessor, pathProps, max, min, sort, closed } = this.props;
    const { height, width } = this.getDimensions();
    return calculateLines({
      data,
      xaccessor,
      yaccessor,
      compute: pathProps,
      height,
      width,
      max,
      min,
      sort,
      closed,
    });
  }

  render() {
    const { isFilled } = this.props;
    const lineChart = this.getLineChart();
    return (
      <G>
        {lineChart.curves.map((curve, key) => {
          const { line, area, index, item, ...computedPathProps } = curve;
          const d = isFilled ? area.path.print() : line.path.print();

          return (
            <Path
              key={key}
              d={d}
              fill={this.props.fill}
              stroke={this.props.stroke}
              strokeWidth={this.props.strokeWidth}
              {...computedPathProps}
            />
          );
        })}
      </G>
    );
  }
}