'use client';

import React from 'react';
import styled, { extractStyling } from '@styles';
import { useSlotProps } from '@hooks';
import { Icon, iconClasses } from '@components/media/Icon';
import { ButtonBase } from '../ButtonBase';

export const iconButtonClasses = {
  root: 'IconButton-Root',
  disabled: 'Disabled'
};

const IconButtonRoot = styled(ButtonBase)(
  ({ theme, ownerState }) => ({
    textAlign: 'center',
    flex: '0 0 auto',
    padding: theme.spacing(1),
    borderRadius: '50%',
    overflow: 'visible',
    color: theme.colors.action.active,
    transition: theme.transition.create('background-color', {
      duration: theme.transition.duration.shortest
    }),
    ...(!ownerState.disableRipple && {
      '&:hover': {
        backgroundColor: theme.colors.alpha.add(theme.colors.action.active, theme.colors.action.hoverOpacity),
        '@media (hover: none)': {
          backgroundColor: 'transparent'
        }
      }
    }),
    ...(ownerState.edge === 'start' && {
      marginLeft: ownerState.size === 'small' ? theme.spacing(-3 / 16) : theme.spacing(-12 / 16)
    }),
    ...(ownerState.edge === 'end' && {
      marginRight: ownerState.size === 'small' ? theme.spacing(-3 / 16) : theme.spacing(-12 / 16)
    })
  }),
  ({ theme, ownerState }) => {
    const color = theme.colors?.[ownerState.color];
    return {
      ...(ownerState.color === 'inherit' && {
        color: 'inherit'
      }),
      ...(ownerState.color !== 'inherit' &&
        ownerState.color !== 'default' && {
          color: color?.body,
          ...(!ownerState.disableRipple && {
            '&:hover': {
              ...(color && {
                backgroundColor: theme.colors.alpha.add(color.body, theme.colors.action.hoverOpacity)
              }),
              '@media (hover: none)': {
                backgroundColor: 'transparent'
              }
            }
          })
        }),
      padding: theme.pxToRem(
        {
          mini: 6,
          small: 6,
          medium: 8,
          large: 12,
          jumbo: 12
        }[ownerState.size]
      ),
      [`& .${iconClasses.root}`]: {
        fontSize: theme.pxToRem(
          {
            mini: 14,
            small: 18,
            medium: 24,
            large: 28,
            jumbo: 32
          }[ownerState.size]
        )
      },
      ...(ownerState.disabled && {
        color: theme.colors.disabled.text,
        fill: theme.colors.disabled.text,
        pointerEvents: 'none'
      })
    };
  },
  ({ ownerState }) => ownerState.cssStyles
);

const IconButton = React.forwardRef((props, ref) => {
  const {
    edge = false,
    children,
    color = 'inherit',
    component = 'button',
    disabled = false,
    disableRipple = false,
    disableFocusRipple = false,
    icon,
    size = 'medium',
    slots = {},
    slotProps = {},
    ...otherProps
  } = props;

  const { cssStyles, other } = extractStyling(otherProps);

  const iconArray = Array.isArray(icon) ? icon : [icon];
  const icons = iconArray.length;

  const ownerState = {
    ...props,
    cssStyles,
    color,
    disabled,
    disableFocusRipple,
    edge,
    icons,
    size
  };

  const classes = {
    root: [iconButtonClasses.root, ownerState.disabled && iconButtonClasses.disabled]
  };

  const IconButtonComponent = slots.root || IconButtonRoot;

  const buttonRootProps = useSlotProps({
    elementType: IconButtonComponent,
    externalSlotProps: slotProps.root,
    externalForwardedProps: other,
    additionalProps: {
      centerRipple: true,
      disabled,
      disableRipple,
      focusRipple: !disableFocusRipple,
      ref: ref
    },
    ownerState,
    className: classes.root
  });

  return (
    <IconButtonComponent component={component} {...buttonRootProps}>
      {props.icon
        ? iconArray.map((icon, index) => <Icon key={index} icon={icon} transition='none' {...slotProps.icon} />)
        : children}
    </IconButtonComponent>
  );
});

IconButton.displayName = 'IconButton';

export default IconButton;
