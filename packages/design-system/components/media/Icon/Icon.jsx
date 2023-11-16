'use client';

import React from 'react';
import { iconLibraries } from '@styles';
import styled, { extractStyling } from '@styles';
import { useSlotProps } from '@hooks';

export const iconClasses = {
  root: 'Icon-Root'
};

const sizeMapping = {
  inherit: 'inherit',
  mini: 'sm',
  small: 'xl',
  medium: '2xl',
  large: '4xl',
  jumob: '5xl'
};

const IconRoot = styled('span')(({ theme, ownerState }) => {
  const size = ownerState.fontSize || ownerState.size;
  let fontSize;
  if (typeof size === 'string') {
    const sizeStyle = theme.typography.size[sizeMapping[size]] || {};
    fontSize = sizeStyle.fontSize || size;
  } else if (typeof size === 'number') {
    fontSize = theme.pxToRem(size);
  }

  return {
    userSelect: 'none',
    width: '1em',
    height: '1em',
    display: 'inline-block',
    fill: ownerState.isSvgElement ? undefined : 'currentColor',
    flexShrink: 0,
    transition: theme.transition.create('fill', {
      duration: theme.transition.duration.shorter
    }),
    fontSize: fontSize,
    color:
      theme.colors[ownerState.color]?.body ??
      {
        action: theme.colors.action.active,
        disabled: theme.colors.disabled.text,
        inherit: undefined
      }[ownerState.color],
    ...ownerState.cssStyles
  };
});

const Icon = React.forwardRef((props, ref) => {
  const {
    children,
    size = 'medium',
    htmlColor,
    icon: iconProp,
    slots = {},
    slotProps = {},
    titleAccess,
    ...otherProps
  } = props;

  const { cssStyles, other } = extractStyling(otherProps);

  const Icon = iconLibraries(iconProp);

  const isSvgElement =
    (Icon &&
      Icon()?.props?.children?.every?.((currentValue) =>
        ['circle', 'path', 'line', 'polygon', 'polyline', 'rect', 'ellipse'].includes(currentValue.type)
      )) ||
    false;

  const ownerState = {
    ...props,
    cssStyles,
    color: otherProps.color,
    isSvgElement,
    size
  };

  const component = Icon || 'span';
  const IconComponent = slots.root || IconRoot;

  const iconRootProps = useSlotProps({
    elementType: IconComponent,
    externalSlotProps: slotProps.root,
    externalForwardedProps: other,
    additionalProps: {
      'data-testid': iconProp,
      focusable: 'false',
      fill: htmlColor,
      'aria-hidden': titleAccess ? undefined : true,
      ref: ref,
      role: titleAccess ? 'img' : undefined
    },
    ownerState,
    className: iconClasses.root
  });

  return (
    <IconComponent as={component} {...iconRootProps}>
      {children}
    </IconComponent>
  );
});

Icon.displayName = 'Icon';

export default Icon;
