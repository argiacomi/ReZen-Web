'use client';

import React from 'react';
import styled, { extractStyling } from '@styles';
import { useSlotProps } from '@hooks';
import { formControlState, useFormControl } from '../FormControlContext';

export const formLabelClasses = {
  root: 'FormLabel-Root',
  disabled: 'FormLabel-Disabled',
  error: 'FormLabel-Error',
  focused: 'FormLabel-Focused'
};

export const FormLabelRoot = styled('label', {
  name: 'FormLabel',
  slot: 'Root'
})(({ theme, ownerState }) => ({
  color: theme.colors.text.secondary,
  ...theme.typography.body1,
  lineHeight: '1.4375em',
  padding: 0,
  position: 'relative',
  [`&.${formLabelClasses.focused}`]: {
    color: theme.colors[ownerState.color].body
  },
  [`&.${formLabelClasses.disabled}`]: {
    color: theme.colors.text.disabled
  },
  [`&.${formLabelClasses.error}`]: {
    color: theme.colors.danger.body
  },
  ...ownerState.cssStyles
}));

const AsteriskComponent = styled('span', {
  name: 'FormLabel',
  slot: 'Asterisk'
})(({ theme }) => ({
  [`&.${formLabelClasses.error}`]: {
    color: theme.colors.danger.body
  }
}));

const FormLabel = React.forwardRef((props, ref) => {
  const { children, component: componentProp = 'label', slots = {}, slotProps = {}, ...otherProps } = props;

  const { cssStyles, other } = extractStyling(otherProps);

  const formControl = useFormControl();

  const fcs = formControlState({
    props,
    formControl,
    states: ['color', 'required', 'focused', 'disabled', 'error', 'filled']
  });

  const ownerState = {
    ...props,
    cssStyles,
    color: fcs.color || 'primary',
    disabled: fcs.disabled,
    error: fcs.error,
    filled: fcs.filled,
    focused: fcs.focused,
    required: fcs.required
  };

  const classes = {
    root: [
      formLabelClasses.root,
      ownerState.disabled && formLabelClasses.disabled,
      ownerState.error && formLabelClasses.error,
      ownerState.focused && formLabelClasses.focused
    ],
    asterisk: [formLabelClasses.asterisk, ownerState.error && formLabelClasses.error]
  };

  const component = componentProp ?? 'label';
  const FormLabelRootComponent = slots.root ?? FormLabelRoot;
  const formLabelRootprops = useSlotProps({
    elementType: FormLabelRootComponent,
    externalSlotProps: slotProps.root,
    externalForwardedProps: other,
    additionalProps: {
      ref: ref
    },
    ownerState,
    className: classes.root
  });

  return (
    <FormLabelRootComponent as={component} {...formLabelRootprops}>
      {children}
      {fcs.required && (
        <AsteriskComponent ownerState={ownerState} aria-hidden className={classes.asterisk}>
          &thinsp;{'*'}
        </AsteriskComponent>
      )}
    </FormLabelRootComponent>
  );
});

FormLabel.displayName = 'FormLabel';

export default FormLabel;
