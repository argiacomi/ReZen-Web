'use client';

import React from 'react';
import clsx from 'clsx';
import styled, { extractStyling } from '@styles';

export const svgClasses = {
  root: 'Svg-Root'
};

const SvgRoot = styled('svg')(({ theme, ownerState }) => {
  const lightFill = theme.colors[ownerState.color]?.body || theme.colors[ownerState.color] || ownerState.color;
  const darkFill = theme.colors[ownerState.color]?.body || theme.colors[ownerState.color] || ownerState.color;

  return {
    ['circle, path, line, polygon, polyline, rect, ellipse']: {
      fill: lightFill,
      [theme.getColorSchemeSelector()]: {
        fill: darkFill
      },
      ...(ownerState.color === 'monochrome' && {
        fill: darkFill,
        [theme.getColorSchemeSelector()]: {
          fill: darkFill
        }
      })
    },
    ...ownerState.cssStyles
  };
});

const Svg = React.forwardRef((props, ref) => {
  const { src: SvgComponent, className, background, color, width, height, ...otherProps } = props;

  // Check if SvgComponent is provided
  if (typeof SvgComponent !== 'function') {
    throw new Error('Source component must be a React functional component.');
  }

  const { cssStyles, other } = extractStyling(otherProps);

  const defaultSvgProps = SvgComponent({}).props;

  // Extract or compute viewBox
  const viewBox =
    defaultSvgProps.viewBox ||
    (defaultSvgProps.width && defaultSvgProps.height && `0 0 ${defaultSvgProps.width} ${defaultSvgProps.height}`);

  if (!viewBox) {
    console.warn('Unable to determine viewBox for SVG. Ensure SVG has either width and height or a viewBox specified.');
  }

  const ownerState = {
    ...props,
    background,
    color,
    width,
    height,
    defaultSvgProps,
    viewBox,
    cssStyles
  };

  return (
    <SvgRoot
      as={SvgComponent}
      className={clsx(svgClasses.root, className)}
      ownerState={ownerState}
      fill={background}
      width={width}
      height={height}
      viewBox={viewBox}
      ref={ref}
      {...other}
    />
  );
});

Svg.displayName = 'Svg';
export default Svg;
