import React from 'react';
import clsx from 'clsx';
import styled, { extractStyling } from '@styles';
import { useSlotProps } from '@hooks';

export const containerClasses = {
  root: 'Container-Root'
};

const Container = React.forwardRef((props, ref) => {
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
      containerClasses.root
    ],
  };

  const ContainerComponent = slots.root || ContainerRoot;

  const containerRootProps = useSlotProps({
    elementType: ContainerComponent,
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
    <ContainerComponent {...containerRootProps}>
      {children}
    </ContainerComponent>
  );
});
Container.displayName = 'Container';

export default Container;