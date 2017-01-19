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
      return datum.value
    },
    gutter: 0,
    offset: [0, 0],
  };

  render() {
    const d = calculateBars(this.props).print();

    return (
      <G>
        <Path
          d={d}
          fill="black"
          stroke="#F5FCFF"
          strokeWidth={1}
        />
      </G>
    );
  }
}