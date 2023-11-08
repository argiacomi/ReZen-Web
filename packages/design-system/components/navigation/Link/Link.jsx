'use client';

import React from 'react';
import styled, { extractStyling } from '@styles';
import { useForkRef, useIsFocusVisible, useSlotProps } from '@hooks';
import { Text } from '@components/typography/Text';

export const linkClasses = {
  root: 'Link-Root',
  none: 'UnderlineNone',
  hover: 'UnderlineHover',
  always: 'UnderlineAlways',
  button: 'Button',
  focusVisible: 'FocusVisible'
};

const LinkRoot = styled(Text)(({ theme, ownerState }) => {
  return {
    ...(ownerState.underline === 'none' && {
      textDecoration: 'none'
    }),
    ...(ownerState.underline === 'hover' && {
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline'
      }
    }),
    ...(ownerState.underline === 'always' && {
      textDecoration: 'underline',
      ...(ownerState.color !== 'inherit' && {
        textDecorationColor: theme.colors.alpha.add(theme.colors.alpha.getColorFromPath(theme, ownerState.color), 0.4)
      }),
      '&:hover': {
        textDecorationColor: 'inherit'
      }
    }),
    ...(ownerState.component === 'button' && {
      position: 'relative',
      WebkitTapHighlightColor: 'transparent',
      backgroundColor: 'transparent',
      outline: 0,
      border: 0,
      margin: 0,
      borderRadius: 0,
      padding: 0,
      cursor: 'pointer',
      userSelect: 'none',
      verticalAlign: 'middle',
      MozAppearance: 'none',
      WebkitAppearance: 'none',
      '&::-moz-focus-inner': {
        borderStyle: 'none'
      },
      [`&.${linkClasses.focusVisible}`]: {
        outline: 'auto'
      }
    }),
    ...ownerState.cssStyles
  };
});

const Link = React.forwardRef((props, ref) => {
  const {
    color = 'primary',
    component = 'a',
    onBlur,
    onFocus,
    slots = {},
    slotProps = {},
    underline = 'always',
    variant = 'inherit',
    ...otherProps
  } = props;

  const { cssStyles, other } = extractStyling(otherProps);

  const {
    isFocusVisibleRef,
    onBlur: handleBlurVisible,
    onFocus: handleFocusVisible,
    ref: focusVisibleRef
  } = useIsFocusVisible();

  const [focusVisible, setFocusVisible] = React.useState(false);
  const handlerRef = useForkRef(ref, focusVisibleRef);

  const ownerState = {
    ...props,
    cssStyles,
    color,
    component,
    focusVisible,
    underline,
    variant
  };

  const handleBlur = (event) => {
    handleBlurVisible(event);
    if (isFocusVisibleRef.current === false) {
      setFocusVisible(false);
    }
    if (onBlur) {
      onBlur(event);
    }
  };

  const handleFocus = (event) => {
    handleFocusVisible(event);
    if (isFocusVisibleRef.current === true) {
      setFocusVisible(true);
    }
    if (onFocus) {
      onFocus(event);
    }
  };

  const classes = {
    root: [
      linkClasses.root,
      linkClasses[ownerState.underline],
      ownerState.component === 'button' && linkClasses.button,
      ownerState.focusVisible && linkClasses.focusVisible
    ]
  };

  const LinkComponent = slots.root || LinkRoot;

  const linkRootProps = useSlotProps({
    elementType: LinkComponent,
    externalSlotProps: slotProps.root,
    externalForwardedProps: other,
    additionalProps: {
      color,
      component: component,
      onBlur: handleBlur,
      onFocus: handleFocus,
      rel: 'noopener',
      ref: { handlerRef },
      target: '_blank',
      variant
    },
    ownerState,
    className: classes.root
  });

  return <LinkComponent {...linkRootProps} />;
});

Link.displayName = 'Link';

export default Link;
