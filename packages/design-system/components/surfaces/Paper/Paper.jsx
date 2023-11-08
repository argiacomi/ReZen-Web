'use client';

import React from 'react';
import styled, { extractStyling } from '@styles';
import { useSlotProps } from '@hooks';

export const paperClasses = {
  root: 'Paper-Root',
  rounded: 'Rounded'
};

const PaperRoot = styled('div')(({ theme, ownerState }) => ({
  backgroundColor: theme.colors.background,
  '&:before': { backgroundColor: theme.colors.background },
  color: theme.colors.text.primary,
  transition: theme.transition.create('box-shadow'),
  ...(!ownerState.square && {
    borderRadius: theme.rounded.md
  }),
  ...(ownerState.outlined && {
    border: `1px solid ${theme.colors.divider}`,
    boxShadow: 'none'
  }),
  ...(!ownerState.outlined && { boxShadow: theme.boxShadow[ownerState.elevation] }),
  ...ownerState.cssStyles
}));

const Paper = React.forwardRef((props, ref) => {
  const {
    children,
    component = 'div',
    elevation = 3,
    slots = {},
    slotProps = {},
    square = false,
    outlined = false,
    ...otherProps
  } = props;

  const { cssStyles, other } = extractStyling(otherProps);

  const ownerState = { ...props, cssStyles, elevation, square, outlined };

  const classes = {
    root: [paperClasses.root, !ownerState.square && paperClasses.rounded]
  };

  const PaperComponent = slots.root || PaperRoot;
  const paperRootProps = useSlotProps({
    elementType: PaperComponent,
    externalSlotProps: slotProps.root,
    externalForwardedProps: other,
    additionalProps: {
      ref: ref
    },
    ownerState,
    className: classes.root
  });

  return (
    <PaperComponent as={component} {...paperRootProps}>
      {children}
    </PaperComponent>
  );
});

Paper.displayName = 'Paper';

export default Paper;
