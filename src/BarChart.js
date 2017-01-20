import React, { Component, PropTypes } from 'react';
import {
  G,
  Path,
} from 'react-native-svg';
import calculateBars from 'paths-js/bar';

export default class BarChart extends Component {
  static propTypes = {
    data: PropTypes.arrayOf(
      PropTypes.arrayOf(
        PropTypes.object
      )
    ).isRequired,
    accessor: PropTypes.func,
    compute: PropTypes.func,
    width: PropTypes.number,
    height: PropTypes.number,
    gutter: PropTypes.number,
    offset: PropTypes.array,
    max: PropTypes.number,
    min: PropTypes.number,
  };

  static defaultProps = {
    accessor(datum) {
      return datum.value;
    },
    gutter: 0,
    offset: [0, 0],
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

  render() {
    const barChart = calculateBars({
      ...this.props,
      ...this.getDimensions(),
    });

    return (
      <G>
        {barChart.curves.map(({ line: { path } }, key) => (
          <Path
            key={key}
            d={path.print()}
            fill="black"
            stroke="#F5FCFF"
            strokeWidth={1}
          />
        ))}
      </G>
    );
  }
}