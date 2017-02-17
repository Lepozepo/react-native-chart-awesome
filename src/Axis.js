import React, { Component, PropTypes } from 'react';
import newPath from 'paths-js/path';
import {
  G,
  Path,
} from 'react-native-svg';
import _isFinite from 'lodash/isFinite'

export default class Axis extends Component {
  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    direction: PropTypes.string,
    position: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    stroke: Path.propTypes.stroke,
    strokeWidth: Path.propTypes.strokeWidth,
  };

  static defaultProps = {
    direction: 'horizontal',
    position: '0%',
    stroke: 'black',
    strokeWidth: 1,
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

  getAxisPosition = () => {
    const { width, height } = this.getDimensions();
    const { position, strokeWidth, direction } = this.props;

    const lineOffset = strokeWidth / 2;
    const dimensionLength = direction === 'horizontal' ? height : width;
    let positionOffset = 0;
    if (_isFinite(position)) {
      positionOffset = position;
    } else {
      if (direction === 'horizontal') {
        positionOffset = (((100 - (parseFloat(position)) || 0) / 100) * dimensionLength);
      } else {
        positionOffset = (((parseFloat(position) || 0) / 100) * dimensionLength);
      }
    }

    const canvasUpperBoundary = dimensionLength - lineOffset;
    const canvasLowerBoundary = lineOffset;
    const isClippedByUpperBoundary = positionOffset > canvasUpperBoundary;
    const isClippedByLowerBoundary = positionOffset < canvasLowerBoundary;

    if (isClippedByUpperBoundary) return canvasUpperBoundary;
    if (isClippedByLowerBoundary) return canvasLowerBoundary;
    return positionOffset;
  };

  getLinePath = () => {
    const { width, height } = this.getDimensions();
    const { position, strokeWidth, direction } = this.props;
    const axisPosition = this.getAxisPosition();

    let path = '';
    switch (direction) {
      case 'vertical':
        path = newPath()
          .moveto(axisPosition, 0)
          .lineto(axisPosition, height);
        break;
      case 'horizontal':
      default:
        path = newPath()
          .moveto(0, axisPosition)
          .lineto(width, axisPosition);
    }
    return path;
  };

  render() {
    const path = this.getLinePath();

    console.log(path.print());
    return (
      <G>
        <Path
          d={path.print()}
          stroke={this.props.stroke}
          strokeWidth={this.props.strokeWidth}
        />
      </G>
    );
  }
}