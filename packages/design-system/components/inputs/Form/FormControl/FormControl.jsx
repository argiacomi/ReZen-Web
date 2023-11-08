'use client';

import React from 'react';
import clsx from 'clsx';
import styled, { extractStyling } from '@styles';
import { isAdornedStart, isElement, isFilled } from '@utils';
import { FormControlContext } from '../FormControlContext';

export const formControlClasses = {
  root: 'FormControl-Root',
  marginNormal: 'MarginNormal',
  marginDense: 'MarginDense',
  fullWidth: 'FullWidth'
};

const FormControlRoot = styled('div', {
  name: 'FormControl',
  slot: 'Root'
})(({ theme, ownerState }) => ({
  display: 'inline-flex',
  flexDirection: 'column',
  position: 'relative',
  minWidth: 0,
  padding: 0,
  margin: 0,
  border: 0,
  verticalAlign: 'top',
  ...(ownerState.margin === 'normal' && {
    marginTop: theme.pxToRem(16),
    marginBottom: theme.pxToRem(8)
  }),
  ...(ownerState.margin === 'dense' && {
    marginTop: theme.pxToRem(8),
    marginBottom: theme.pxToRem(4)
  }),
  ...(ownerState.fullWidth && {
    width: '100%'
  }),
  ...ownerState.cssStyles
}));

const FormControl = React.forwardRef((props, ref) => {
  const {
    children,
    className,
    color = 'primary',
    component = 'div',
    disabled = false,
    error = false,
    focused: visuallyFocused,
    fullWidth = false,
    hiddenLabel = false,
    margin = 'none',
    required = false,
    size = 'medium',
    variant = 'outlined',
    ...otherProps
  } = props;

  const { cssStyles, other } = extractStyling(otherProps);

  const ownerState = {
    ...props,
    cssStyles,
    color,
    component,
    disabled,
    error,
    fullWidth,
    hiddenLabel,
    margin,
    required,
    size,
    variant
  };

  const classes = {
    root: [
      formControlClasses.root,
      ownerState.margin === 'normal' && formControlClasses.marginNormal,
      ownerState.margin === 'dense' && formControlClasses.marginDense,
      ownerState.fullWidth && formControlClasses.fullWidth
    ]
  };

  const [adornedStart, setAdornedStart] = React.useState(() => {
    let initialAdornedStart = false;

    if (children) {
      React.Children.forEach(children, (child) => {
        if (!isElement(child, ['Input', 'Select'])) {
          return;
        }

        const input = isElement(child, ['Select']) ? child.props.input : child;

        if (input && isAdornedStart(input.props)) {
          initialAdornedStart = true;
        }
      });
    }
    return initialAdornedStart;
  });

  const [filled, setFilled] = React.useState(() => {
    let initialFilled = false;

    if (children) {
      React.Children.forEach(children, (child) => {
        if (!isElement(child, ['Input', 'Select'])) {
          return;
        }
        if (isFilled(child.props, true) || isFilled(child.props.inputProps, true)) {
          initialFilled = true;
        }
      });
    }

    return initialFilled;
  });

  const [focusedState, setFocused] = React.useState(false);
  if (disabled && focusedState) {
    setFocused(false);
  }

  const focused = visuallyFocused !== undefined && !disabled ? visuallyFocused : focusedState;

  let registerEffect;
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const registeredInput = React.useRef(false);
    registerEffect = () => {
      if (registeredInput.current) {
        console.error(
          [
            'There are multiple `InputBase` components inside a FormControl.',
            'This creates visual inconsistencies, only use one `InputBase`.'
          ].join('\n')
        );
      }

      registeredInput.current = true;
      return () => {
        registeredInput.current = false;
      };
    };
  }

  const childContext = React.useMemo(() => {
    return {
      adornedStart,
      setAdornedStart,
      color,
      disabled,
      error,
      filled,
      focused,
      fullWidth,
      hiddenLabel,
      size,
      onBlur: () => {
        setFocused(false);
      },
      onEmpty: () => {
        setFilled(false);
      },
      onFilled: () => {
        setFilled(true);
      },
      onFocus: () => {
        setFocused(true);
      },
      registerEffect,
      required,
      variant
    };
  }, [
    adornedStart,
    color,
    disabled,
    error,
    filled,
    focused,
    fullWidth,
    hiddenLabel,
    registerEffect,
    required,
    size,
    variant
  ]);

  return (
    <FormControlContext.Provider value={childContext}>
      <FormControlRoot
        as={component}
        ownerState={ownerState}
        className={clsx(classes.root, className)}
        ref={ref}
        {...other}
      >
        {children}
      </FormControlRoot>
    </FormControlContext.Provider>
  );
});

FormControl.displayName = 'FormControl';

export default FormControl;
