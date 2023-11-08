'use client';

import React from 'react';
import clsx from 'clsx';
import styled, { extractStyling } from '@styles';
import { useSlotProps } from '@hooks';
import { Icon } from '@components/media/Icon';
import { ButtonBase } from '../ButtonBase';
import { toggleButtonGroupClasses } from '../ToggleButtonGroup';

export const toggleButtonClasses = {
  root: 'ToggleButton-Root',
  selected: 'Selected',
  disabled: 'Disabled'
};

const ToggleButtonRoot = styled(ButtonBase)(({ theme, ownerState }) => ({
  appearance: 'none',
  fontWeight: theme.typography.weight.medium,
  letterSpacing: '0.025em',
  borderRadius: theme.rounded.base,
  border: `1px solid ${theme.colors.divider}`,
  colord: theme.colors.text.primary,
  ...{
    mini: { padding: '0.25rem', ...theme.typography.size.xs },
    small: { padding: '0.5rem', ...theme.typography.size.sm },
    medium: { padding: '0.75rem', ...theme.typography.size.base },
    large: { padding: '1rem', ...theme.typography.size.lg },
    jumbo: { padding: '1.25rem', ...theme.typography.size.xl }
  }[ownerState.size],
  [`&.${toggleButtonGroupClasses.selected}`]: {
    ...(ownerState.color === 'default' && {
      backgroundColor: theme.colors.alpha.add(theme.colors.monochrome[200], 0.2),
      '&:hover': {
        backgroundColor: theme.colors.alpha.add(theme.colors.monochrome[200], 0.3)
      }
    }),
    ...(ownerState.color !== 'default' && {
      color: theme.colors[ownerState.color][500],
      backgroundColor: theme.colors.alpha.add(theme.colors[ownerState.color][500], 0.2),
      '&:hover': {
        backgroundColor: theme.colors.alpha.add(theme.colors[ownerState.color][500], 0.4)
      },
      [theme.getColorSchemeSelector('dark')]: {
        backgroundColor: theme.colors.alpha.add(theme.colors[ownerState.color][500], 0.3),
        '&:hover': {
          backgroundColor: theme.colors.alpha.add(theme.colors[ownerState.color][500], 0.25)
        }
      }
    })
  },
  ...(ownerState.disabled && {
    boxShadow: 'none',
    filter: 'none',
    pointerEvents: 'none',
    color: ownerState.selected ? theme.colors.disabled.text : theme.colors.disabled.body
  }),
  ...(ownerState.disableElevation && {
    boxShadow: 'none',
    filter: 'none'
  }),
  ...(ownerState.fullWidth && {
    width: '100%'
  }),
  ...ownerState.cssStyles
}));

const ToggleButton = React.forwardRef((props, ref) => {
  const {
    children,
    color = 'default',
    component: componentProp = 'button',
    disabled = false,
    disableRipple = false,
    disableFocusRipple = false,
    focusVisibleClassName,
    fullWidth = false,
    onChange,
    onClick,
    selected,
    size = 'medium',
    slots = {},
    slotProps = {},
    value,
    ...otherProps
  } = props;

  const { cssStyles, other } = extractStyling(otherProps);

  const ownerState = {
    ...props,
    color,
    cssStyles,
    disabled,
    disableFocusRipple,
    fullWidth,
    size
  };

  const classes = {
    root: [
      toggleButtonClasses.root,
      ownerState.selected && toggleButtonClasses.selected,
      ownerState.disabled && toggleButtonClasses.disabled
    ]
  };

  const handleChange = (event) => {
    if (onClick) {
      onClick(event, value);
      if (event.defaultPrevented) {
        return;
      }
    }

    if (onChange) {
      onChange(event, value);
    }
  };

  let iconArray;
  if (props.icon) iconArray = Array.isArray(props.icon) ? props.icon : [props.icon];

  const component = componentProp || 'button';
  const ToggleButtonComponent = slots.root || ToggleButtonRoot;

  const toggleButtonRootProps = useSlotProps({
    elementType: ToggleButtonComponent,
    externalSlotProps: slotProps.root,
    externalForwardedProps: other,
    additionalProps: {
      disabled: disabled,
      disableRipple,
      focusRipple: !disableFocusRipple,
      focusVisibleClassName: clsx(slotProps?.focusVisible, focusVisibleClassName),
      onClick: handleChange,
      onChange,
      value,
      'aria-pressed': selected,
      ref: ref,
      slotProps: slotProps
    },
    ownerState,
    className: classes.root
  });

  return (
    <ToggleButtonComponent component={component} {...toggleButtonRootProps}>
      {iconArray ? iconArray.map((icon, index) => <Icon key={index} icon={icon} transition='none' />) : null}
      {children}
    </ToggleButtonComponent>
  );
});

ToggleButton.displayName = 'ToggleButton';

export default ToggleButton;
