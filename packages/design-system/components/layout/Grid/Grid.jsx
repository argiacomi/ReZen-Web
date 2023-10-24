import React from 'react';
import clsx from 'clsx';
import styled, { extractStyling } from '@styles';
import { useSlotProps } from '@hooks';

export const gridClasses = {
  root: 'Grid-Root'
};

const Grid = React.forwardRef((props, ref) => {
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
      gridClasses.root
    ],
  };

  const GridComponent = slots.root || GridRoot;

  const gridRootProps = useSlotProps({
    elementType: GridComponent,
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
    <GridComponent {...gridRootProps}>
      {children}
    </GridComponent>
  );
});
Grid.displayName = 'Grid';

export default Grid;