import React, { Component } from 'react';
import PropTypes from 'prop-types';
import newPath from 'paths-js/path';
import {
  G,
  Path,
  Svg,
} from 'react-native-svg';
import _isFinite from 'lodash/isFinite';

export default class Axis extends Component {
  static propTypes = {
    style: Svg.propTypes.style,
    width: PropTypes.number,
    height: PropTypes.number,
    direction: PropTypes.string,
    position: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    stroke: Path.propTypes.stroke,
    strokeWidth: Path.propTypes.strokeWidth,
    ticks: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.arrayOf(
        PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number,
        ])
      ),
    ]),
    min: PropTypes.number,
    max: PropTypes.number,
    tickLength: PropTypes.number,
  };

  static defaultProps = {
    direction: 'horizontal',
    position: '0%',
    stroke: 'black',
    strokeWidth: 1,
    tickLength: 2,
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
    const { direction } = this.props;
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

  renderTicks = () => {
    const { ticks, direction, tickLength } = this.props;
    if (_isFinite(ticks)) return null;

    const { width, height } = this.getDimensions();
    const axisPosition = this.getAxisPosition();

    const amountOfTicks = ticks.length;

    return ticks.map((tick, tickId) => {
      let path;
      switch (direction) {
        case 'vertical': {
          const tickOffset = height / amountOfTicks;
          const tickPositionY = (tickId + 1) * tickOffset;
          path = newPath()
            .moveto(axisPosition, tickPositionY)
            .hlineto(tickLength);
          break;
        }
        case 'horizontal':
        default: {
          const tickOffset = width / amountOfTicks;
          const tickPositionX = (tickId + 1) * tickOffset;
          path = newPath()
            .moveto(tickPositionX, axisPosition)
            .vlineto(tickLength);
        }
      }

      return (
        <Path
          d={path.print()}
          stroke={this.props.stroke}
          strokeWidth={this.props.strokeWidth}
        />
      );
    });
  };

  render() {
    const path = this.getLinePath();
    // const { width, height } = this.getDimensions();
    // const { style } = this.props;

    // console.log(path.print());
    return (
      <G>
        <Path
          d={path.print()}
          stroke={this.props.stroke}
          strokeWidth={this.props.strokeWidth}
        />
        {this.renderTicks()}
      </G>
    );
  }
}
