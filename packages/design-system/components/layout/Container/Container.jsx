'use client';

import React from 'react';
import styled, { extractStyling, useTheme } from '@styles';
import { useSlotProps } from '@hooks';

export const containerClasses = {
  root: 'Container-Root',
  fixed: 'Fixed',
  disableGutters: 'DisableGutters'
};

const ContainerRoot = styled('div')(
  ({ theme, ownerState }) => ({
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    boxSizing: 'border-box',
    display: 'block',
    ...(!ownerState.disableGutters && {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3)
      }
    })
  }),
  ({ theme, ownerState }) =>
    ownerState.fixed &&
    Object.keys(theme.breakpoints.values).reduce((acc, breakpointValueKey) => {
      const breakpoint = breakpointValueKey;
      const value = theme.breakpoints.values[breakpoint];
      if (breakpoint !== 'xs') {
        acc[theme.breakpoints.up(breakpoint)] = {
          maxWidth: value
        };
      }
      return acc;
    }, {}),
  ({ theme, ownerState }) => ({
    ...(ownerState.maxWidth === 'xs' && {
      [theme.breakpoints.up('xs')]: {
        maxWidth: Math.max(theme.breakpoints.values.sm, 444)
      }
    }),
    ...(ownerState.maxWidth &&
      ownerState.maxWidth !== 'xs' && {
        [theme.breakpoints.up(ownerState.maxWidth)]: {
          maxWidth: theme.breakpoints.values[ownerState.maxWidth]
        }
      })
  }),
  ({ ownerState }) => ({ ...ownerState.cssStyles })
);

const Container = React.forwardRef((props, ref) => {
  const theme = useTheme();
  const maxBreakpoint = theme.breakpoints.keys[theme.breakpoints.keys.length - 1];

  const {
    component: componentProp = 'div',
    disableGutters = false,
    fixed = false,
    maxWidth = fixed ? maxBreakpoint : '2xl',
    slots = {},
    slotProps = {},
    ...otherProps
  } = props;

  const { cssStyles, other } = extractStyling(otherProps);

  const ownerState = {
    ...props,
    cssStyles,
    disableGutters,
    fixed,
    maxWidth
  };

  const classes = {
    root: [
      containerClasses.root,
      ownerState.fixed && containerClasses.fixed,
      ownerState.disableGutters && containerClasses.disableGutters
    ]
  };

  const component = componentProp || 'div';
  const ContainerComponent = slots.root || ContainerRoot;

  const containerRootProps = useSlotProps({
    elementType: ContainerComponent,
    externalSlotProps: slotProps.root,
    externalForwardedProps: other,
    additionalProps: {
      ref: ref
    },
    ownerState,
    className: classes.root
  });

  return <ContainerComponent as={component} {...containerRootProps} />;
});
Container.displayName = 'Container';

export default Container;
