import React from 'react';
import clsx from 'clsx';
import styled, { extractStyling } from '@styles';
import { useSlotProps } from '@hooks';

export const buttonClasses = {
  root: 'Button-Root'
};

const Button = React.forwardRef((props, ref) => {
  const {
    children,
    slots = {},
    slotProps = {},
    ...otherProps
  } = props;

  const { cssStyles, other } = extractStyling(otherProps);

  const ownerState = {
    ...props,
  };

  const classes = {
    root: [
      buttonClasses.root
    ],
  };

  const ButtonComponent = slots.root || ButtonRoot;

  const buttonRootProps = useSlotProps({
    elementType: ButtonComponent,
    externalSlotProps: slotProps.root,
    externalForwardedProps: other,
    additionalProps: {
      ref: ref,
      slotProps: slotProps
    },
    ownerState,
    className: classes.root
  })

  return (
    <ButtonComponent {...buttonRootProps}>
      {children}
    </ButtonComponent>
  );
});
Button.displayName = 'Button';

export default Button;