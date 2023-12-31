'use client';

import React from 'react';
import clsx from 'clsx';
import styled, { extractStyling } from '@styles';
import { capitalize } from '@utils';
import { ButtonBase } from '@components/inputs/ButtonBase';

export const tabClasses = {
  root: 'Tab-Root',
  iconWrapper: 'Tab-IconWrapper',
  disabled: 'Disabled',
  fullWidth: 'FullWidth',
  labelIcon: 'LabelIcon',
  selected: 'Selected',
  wrapped: 'Wrapped'
};

const TabRoot = styled(ButtonBase, {
  name: 'Tab',
  slot: 'Root'
})(({ theme, ownerState }) => ({
  ...theme.typography.button,
  maxWidth: 360,
  minWidth: 90,
  position: 'relative',
  minHeight: 48,
  flexShrink: 0,
  padding: '12px 16px',
  overflow: 'hidden',
  whiteSpace: 'normal',
  textAlign: 'center',
  ...(ownerState.label && {
    flexDirection: ownerState.iconPosition === 'top' || ownerState.iconPosition === 'bottom' ? 'column' : 'row'
  }),
  lineHeight: 1.25,
  ...(ownerState.icon &&
    ownerState.label && {
      minHeight: 72,
      paddingTop: 9,
      paddingBottom: 9,
      [`& > .${tabClasses.iconWrapper}`]: {
        ...(ownerState.iconPosition === 'top' && {
          marginBottom: 6
        }),
        ...(ownerState.iconPosition === 'bottom' && {
          marginTop: 6
        }),
        ...(ownerState.iconPosition === 'start' && {
          marginRight: theme.spacing(1)
        }),
        ...(ownerState.iconPosition === 'end' && {
          marginLeft: theme.spacing(1)
        })
      }
    }),
  ...(ownerState.textColor === 'inherit' && {
    color: 'inherit',
    opacity: 0.6, // same opacity as theme.palette.text.secondary
    [`&.${tabClasses.selected}`]: {
      opacity: 1
    },
    [`&.${tabClasses.disabled}`]: {
      opacity: theme.colors.action.disabledOpacity
    }
  }),
  ...(ownerState.textColor === 'primary' && {
    color: theme.colors.text.secondary,
    [`&.${tabClasses.selected}`]: {
      color: theme.colors.primary.body
    },
    [`&.${tabClasses.disabled}`]: {
      color: theme.colors.disabled.text
    }
  }),
  ...(ownerState.textColor === 'secondary' && {
    color: theme.colors.text.secondary,
    [`&.${tabClasses.selected}`]: {
      color: theme.colors.secondary.body
    },
    [`&.${tabClasses.disabled}`]: {
      color: theme.colors.disabled.text
    }
  }),
  ...(ownerState.fullWidth && {
    flexShrink: 1,
    flexGrow: 1,
    flexBasis: 0,
    maxWidth: 'none'
  }),
  ...(ownerState.wrapped && {
    fontSize: theme.pxToRem(12)
  }),
  ...ownerState.cssStyles
}));

const Tab = React.forwardRef((props, ref) => {
  const {
    className,
    disabled = false,
    disableFocusRipple = false,
    fullWidth,
    icon: iconProp,
    iconPosition = 'top',
    indicator,
    label,
    onChange,
    onClick,
    onFocus,
    selected,
    selectionFollowsFocus,
    textColor = 'inherit',
    value,
    wrapped = false,
    ...otherProps
  } = props;

  const { cssStyles, other } = extractStyling(otherProps);

  const ownerState = {
    ...props,
    cssStyles,
    disabled,
    disableFocusRipple,
    selected,
    icon: !!iconProp,
    iconPosition,
    label: !!label,
    fullWidth,
    textColor,
    wrapped
  };

  const classes = {
    root: [
      tabClasses.root,
      ownerState.icon && ownerState.label && tabClasses.labelIcon,
      ownerState.fullWidth && tabClasses.fullWidth,
      ownerState.wrapped && tabClasses.wrapped,
      ownerState.selected && tabClasses.selected,
      ownerState.disabled && tabClasses.disabled
    ],
    iconWrapper: [tabClasses.iconWrapper]
  };
  const icon =
    iconProp && label && React.isValidElement(iconProp)
      ? React.cloneElement(iconProp, {
          className: clsx(classes.iconWrapper, iconProp.props.className)
        })
      : iconProp;
  const handleClick = (event) => {
    if (!selected && onChange) {
      onChange(event, value);
    }

    if (onClick) {
      onClick(event);
    }
  };

  const handleFocus = (event) => {
    if (selectionFollowsFocus && !selected && onChange) {
      onChange(event, value);
    }

    if (onFocus) {
      onFocus(event);
    }
  };

  return (
    <TabRoot
      focusRipple={!disableFocusRipple}
      className={clsx(classes.root, className)}
      ref={ref}
      role='tab'
      aria-selected={selected}
      disabled={disabled}
      onClick={handleClick}
      onFocus={handleFocus}
      ownerState={ownerState}
      tabIndex={selected ? 0 : -1}
      {...other}
    >
      {iconPosition === 'top' || iconPosition === 'start' ? (
        <React.Fragment>
          {icon}
          {label}
        </React.Fragment>
      ) : (
        <React.Fragment>
          {label}
          {icon}
        </React.Fragment>
      )}

      {indicator}
    </TabRoot>
  );
});

Tab.displayName = 'Tab';

export default Tab;
