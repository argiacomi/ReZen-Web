'use client';

import React from 'react';
import styled, { extractStyling } from '@styles';
import { useSlotProps } from '@hooks';

export const dividerClasses = {
  root: 'Divider-Root',
  wrapper: 'Divider-Wrapper',
  absolute: 'Absolute',
  vertical: 'Vertical',
  horizontal: 'Horizontal',
  flexItem: 'FlexItem',
  withChildren: 'WithChildren'
};

const DividerRoot = styled('div')(
  ({ theme, ownerState }) => ({
    margin: 0,
    flexShrink: 0,
    borderWidth: 0,
    borderStyle: 'solid',
    borderColor: theme.colors.divider,
    borderBottomWidth: 'thin',
    ...(ownerState.absolute && {
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '100%'
    }),
    ...(ownerState.light && {
      borderColor: theme.colors.alpha(theme.colors.divider, 0.08)
    }),
    ...(ownerState.variant === 'inset' && {
      marginLeft: theme.pxToRem(72)
    }),

    ...(ownerState.variant === 'middle' &&
      ownerState.orientation === 'horizontal' && {
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2)
      }),
    ...(ownerState.variant === 'middle' &&
      ownerState.orientation === 'vertical' && {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1)
      }),
    ...(ownerState.orientation === 'vertical' && {
      height: '100%',
      borderBottomWidth: 0,
      borderRightWidth: 'thin'
    }),
    ...(ownerState.flexItem && {
      alignSelf: 'stretch',
      height: 'auto'
    })
  }),
  ({ ownerState }) => ({
    ...(ownerState.children && {
      display: 'flex',
      whiteSpace: 'nowrap',
      textAlign: 'center',
      border: 0,
      '&::before, &::after': {
        content: '""',
        alignSelf: 'center'
      }
    })
  }),
  ({ theme, ownerState }) => ({
    ...(ownerState.children &&
      ownerState.orientation !== 'vertical' && {
        '&::before, &::after': {
          position: 'relative',
          width: '100%',
          height: 0,
          borderTop: `thin solid ${theme.colors.divider}`
        }
      })
  }),
  ({ theme, ownerState }) => ({
    ...(ownerState.children &&
      ownerState.orientation === 'vertical' && {
        flexDirection: 'column',
        '&::before, &::after': {
          position: 'static',
          width: 0,
          height: '100%',
          borderLeft: `thin solid ${theme.colors.divider}`
        }
      })
  }),
  ({ ownerState }) => ({
    ...(ownerState.orientation !== 'vertical' &&
      {
        right: {
          '&::before': {
            width: '90%'
          },
          '&::after': {
            width: '10%'
          }
        },
        left: {
          '&::before': {
            width: '10%'
          },
          '&::after': {
            width: '90%'
          }
        }
      }[ownerState.textAlign])
  }),
  ({ ownerState }) => ownerState.cssStyles
);

const DividerWrapper = styled('span')(({ theme, ownerState }) => ({
  display: 'inline-block',
  paddingLeft: `calc(${theme.spacing(1)} * 1.2)`,
  paddingRight: `calc(${theme.spacing(1)} * 1.2)`,
  ...(ownerState.orientation === 'vertical' && {
    paddingTop: `calc(${theme.spacing(1)} * 1.2)`,
    paddingBottom: `calc(${theme.spacing(1)} * 1.2)`
  })
}));

const Divider = React.forwardRef((props, ref) => {
  const {
    absolute = false,
    children,
    component = children ? 'div' : 'hr',
    flexItem = false,
    light = false,
    orientation = 'horizontal',
    role = component !== 'hr' ? 'separator' : undefined,
    slots = {},
    slotProps = {},
    textAlign = 'center',
    variant = 'fullWidth',
    ...otherProps
  } = props;

  const { cssStyles, other } = extractStyling(otherProps);

  const ownerState = {
    ...props,
    absolute,
    component,
    cssStyles,
    flexItem,
    light,
    orientation,
    role,
    textAlign,
    variant
  };

  const classes = {
    root: [
      dividerClasses.root,
      ownerState.absolute && dividerClasses.absolute,
      dividerClasses[orientation],
      ownerState.flexItem && dividerClasses.flexItem,
      children && dividerClasses.withChildren
    ],
    wrapper: [dividerClasses.wrapper, `Wrapper${orientation}`]
  };

  const DividerComponent = slots.root || DividerRoot;
  const DividerWrapperComponent = slots.wrapper || DividerWrapper;

  const dividerRootProps = useSlotProps({
    elementType: DividerComponent,
    externalSlotProps: slotProps.root,
    externalForwardedProps: other,
    additionalProps: {
      ref: ref,
      role
    },
    ownerState,
    className: classes.root
  });

  const dividerWrapperProps = useSlotProps({
    elementType: DividerWrapperComponent,
    externalSlotProps: slotProps.wrapper,
    ownerState,
    className: classes.wrapper
  });

  return (
    <DividerComponent as={component} {...dividerRootProps}>
      {children ? <DividerWrapperComponent {...dividerWrapperProps}>{children}</DividerWrapperComponent> : null}
    </DividerComponent>
  );
});
Divider.displayName = 'Divider';

export default Divider;
