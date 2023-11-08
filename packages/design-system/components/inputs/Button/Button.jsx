'use client';

import React from 'react';
import clsx from 'clsx';
import styled, { extractStyling, shouldForwardProp } from '@styles';
import { useSlotProps } from '@hooks';
import { mergeProps } from '@utils';
import { Icon, iconClasses } from '@components/media/Icon';
import { ButtonBase } from '../ButtonBase';
import { ButtonGroupContext } from '../ButtonGroup';

export const buttonClasses = {
  root: 'Button-Root',
  startIcon: 'Button-StartIcon',
  endIcon: 'Button-EndIcon',
  active: 'Active',
  disabled: 'Disabled',
  disableElevation: 'DisableElevation',
  focusVisible: 'FocusVisible',
  fullWidth: 'FullWidth'
};

const variantStyles = (theme, ownerState) =>
  ({
    colorText: {
      color: theme.colors[ownerState.color]?.body,
      backgroundColor: 'transparent',
      filter: theme.dropShadow[4],
      padding: theme.pxToRem(
        ...{
          mini: [3, 5],
          small: [4, 5],
          medium: [6, 8],
          large: [8, 11],
          jumbo: [10, 14],
          auto: [6, 8]
        }[ownerState.size]
      ),
      '&:hover': {
        backgroundColor: theme.colors.alpha.add(theme.colors[ownerState.color]?.body, 0.2)
      },
      [`&.${buttonClasses.disabled}`]: { color: theme.colors.disabled.text }
    },
    text: {
      color: theme.colors.text.primary,
      backgroundColor: 'transparent',
      filter: theme.dropShadow[4],
      padding: theme.pxToRem(
        ...{
          mini: [2, 10],
          small: [4, 10],
          medium: [6, 16],
          large: [8, 22],
          jumbo: [10, 28],
          auto: [6, 16]
        }[ownerState.size]
      ),
      '&:hover': {
        color: theme.colors[ownerState.color]?.body,
        backgroundColor: theme.colors.alpha.add(theme.colors[ownerState.color]?.body, 0.2)
      },
      [`&.${buttonClasses.disabled}`]: { color: theme.colors.disabled.text }
    },
    outlined: {
      color: theme.colors[ownerState.color]?.body,
      backgroundColor: 'transparent',
      boxShadow: theme.boxShadow[4],
      border: `1px solid ${theme.colors.alpha.add(theme.colors[ownerState.color]?.body, 1)}`,
      padding: theme.pxToRem(
        ...{
          mini: [1, 10],
          small: [3, 10],
          medium: [5, 16],
          large: [7, 22],
          jumbo: [9, 28],
          auto: [5, 16]
        }[ownerState.size]
      ),
      '&:hover': { backgroundColor: theme.colors.alpha.add(theme.colors[ownerState.color]?.body, 0.2) },
      [`&.${buttonClasses.disabled}`]: {
        color: theme.colors.disabled.text,
        borderColor: theme.colors.disabled.body
      }
    },
    filled: {
      color: theme.colors[ownerState.color]?.text,
      backgroundColor: theme.colors[ownerState.color]?.body,
      boxShadow: theme.boxShadow[4],
      padding: theme.pxToRem(
        ...{
          mini: [2, 10],
          small: [4, 10],
          medium: [6, 16],
          large: [8, 22],
          jumbo: [10, 28],
          auto: [6, 16]
        }[ownerState.size]
      ),
      '&:hover': { backgroundColor: theme.colors[ownerState.color]?.[600] },
      [`&.${buttonClasses.disabled}`]: {
        color: theme.colors.alpha.darken(theme.colors.disabled.text, 0.5),
        backgroundColor: theme.colors.disabled.body
      }
    }
  })[ownerState.variant];

const ButtonRoot = styled(ButtonBase, {
  shouldForwardProp: (prop) => shouldForwardProp(prop) || prop === 'classes',
  name: 'Button',
  slot: 'Root'
})(
  ({ theme, ownerState }) => ({
    fontFamily: 'inherit',
    ...theme.typography.button,
    fontSize: {
      mini: '.8125rem',
      small: '.875rem',
      medium: '0.9375rem',
      large: '1rem',
      jumbo: '1.125rem',
      auto: '0.9375rem'
    }[ownerState.size],
    borderRadius: theme.rounded.md,
    minWidth: { mini: 64, small: 64, medium: 80, large: 96, jumbo: 128 }[ownerState.size],
    overflow: 'hidden',
    transition: theme.transition.create(['background-color', 'box-shadow', 'border-color', 'color'], {
      duration: theme.transition.duration.shortest
    }),
    '&:active': { transform: 'scale(0.95)' },
    [`&.${buttonClasses.focusVisible}`]: { transform: 'scale(0.95)' },
    ...(ownerState.fullWidth && {
      width: '100%'
    }),
    [`&.${buttonClasses.disabled}`]: {
      boxShadow: 'none',
      filter: 'none',
      pointerEvents: 'none'
    },
    '&:hover': {
      textDecoration: 'none',
      '@media (hover: none)': {
        backgroundColor: 'transparent'
      }
    },
    ...variantStyles(theme, ownerState),
    ...(ownerState.color === 'inherit' && {
      color: 'inherit',
      backgroundColor: 'transparent'
    })
  }),
  ({ ownerState }) => ({
    ...(ownerState.disableElevation && {
      boxShadow: 'none',
      filter: 'none',
      '&:hover': {
        boxShadow: 'none',
        filter: 'none'
      },
      [`&.${buttonClasses.focusVisible}`]: {
        boxShadow: 'none',
        filter: 'none'
      },
      '&:active': {
        boxShadow: 'none',
        filter: 'none'
      },
      [`&.${buttonClasses.disabled}`]: {
        boxShadow: 'none',
        filter: 'none'
      }
    })
  }),
  ({ ownerState }) => ownerState.cssStyles
);

const ButtonIcon = styled('span')(({ ownerState }) => ({
  display: 'inherit',
  alignItems: 'inherit',
  justifyContent: 'inherit',
  fontSize: 'inherit',
  marginTop: 1,
  marginBottom: 2,
  marginLeft: ownerState.position === 'start' ? 0 : 5,
  marginRight: ownerState.position === 'start' ? 5 : 0,
  lineHeight: 'inherit',
  height: {
    mini: '.875rem',
    small: '1rem',
    medium: '1.125rem',
    large: '1.25rem',
    jumbo: '1.375rem',
    auto: '1.125rem'
  }[ownerState.size],
  width: {
    mini: '.875rem',
    small: '1rem',
    medium: '1.125rem',
    large: '1.25rem',
    jumbo: '1.375rem',
    auto: '1.125rem'
  }[ownerState.size],
  [`& .${iconClasses.root}`]: {
    fontSize: {
      mini: '.875rem',
      small: '1rem',
      medium: '1.125rem',
      large: '1.25rem',
      jumbo: '1.375rem',
      auto: '1.125rem'
    }[ownerState.size]
  }
}));

const Button = React.forwardRef((inProps, ref) => {
  const contextProps = React.useContext(ButtonGroupContext);
  const props = mergeProps(contextProps, inProps);

  const {
    children,
    color = 'primary',
    component: componentProp = 'button',
    disabled = false,
    disableElevation = false,
    disableFocusRipple = false,
    endIcon: endIconProp,
    focusVisibleClassName,
    fullWidth = false,
    size = 'medium',
    slots = {},
    slotProps = {},
    startIcon: startIconProp,
    variant = 'text',
    ...otherProps
  } = props;

  const { cssStyles, other } = extractStyling(otherProps);

  const ownerState = {
    ...props,
    color,
    cssStyles,
    disabled,
    disableElevation,
    disableFocusRipple,
    fullWidth,
    size,
    variant
  };

  const classes = {
    root: [
      buttonClasses.root,
      ownerState.disableElevation && buttonClasses.disableElevation,
      ownerState.fullWidth && buttonClasses.fullWidth
    ],
    startIcon: buttonClasses.startIcon,
    endIcon: buttonClasses.endIcon
  };

  const StartIconComponent = slots.startIcon || ButtonIcon;
  const startIconProps = useSlotProps({
    elementType: StartIconComponent,
    externalSlotProps: slotProps.startIcon,
    ownerState: { ...ownerState, position: 'start' },
    className: classes.startIcon
  });

  const startIcon = startIconProp && (
    <StartIconComponent {...startIconProps}>
      <Icon icon={startIconProp} transition='none' />
    </StartIconComponent>
  );

  const EndIconComponent = slots.endIcon || ButtonIcon;
  const endIconProps = useSlotProps({
    elementType: StartIconComponent,
    externalSlotProps: slotProps.endIcon,
    ownerState: { ...ownerState, position: 'end' },
    className: classes.endIcon
  });

  const endIcon = endIconProp && (
    <EndIconComponent {...endIconProps}>
      <Icon icon={endIconProp} transition='none' />
    </EndIconComponent>
  );

  const component = componentProp || 'button';
  const ButtonComponent = slots.root || ButtonRoot;

  const buttonRootProps = useSlotProps({
    elementType: ButtonComponent,
    externalSlotProps: slotProps.root,
    externalForwardedProps: other,
    additionalProps: {
      disabled: disabled,
      focusRipple: !disableFocusRipple,
      focusVisibleClassName: clsx(slotProps?.focusVisible, focusVisibleClassName),
      ref: ref,
      slotProps: slotProps
    },
    ownerState,
    className: classes.root
  });

  return (
    <ButtonComponent component={component} {...buttonRootProps}>
      {startIcon}
      {children}
      {endIcon}
    </ButtonComponent>
  );
});
Button.displayName = 'Button';

export default Button;
