'use client';

import React from 'react';
import styled, { extractStyling } from '@styles';
import { useSlotProps } from '@hooks';

export const cardActionsClasses = {
  root: 'CardActions-Root',
  spacing: 'Spacing'
};

const CardActionsRoot = styled('div')(({ theme, ownerState }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: 8,
  ...(!ownerState.disableSpacing && {
    '& > :not(:first-of-type)': {
      marginLeft: 8
    }
  }),
  ...ownerState.cssStyles
}));

const CardActions = React.forwardRef((props, ref) => {
  const { disableSpacing = false, component = 'div', slots = {}, slotProps = {}, ...otherProps } = props;

  const { cssStyles, other } = extractStyling(otherProps);

  const ownerState = { ...props, cssStyles, disableSpacing };

  const classes = {
    root: [cardActionsClasses.root, !ownerState.disableSpacing && cardActionsClasses.spacing]
  };

  const CardActionsComponent = slots.root || CardActionsRoot;
  const cardActionsRootProps = useSlotProps({
    elementType: CardActionsComponent,
    externalSlotProps: slotProps.root,
    externalForwardedProps: other,
    additionalProps: {
      ref: ref
    },
    ownerState,
    className: classes.root
  });

  return <CardActionsComponent as={component} {...cardActionsRootProps} />;
});

CardActions.displayName = 'CardActions';

export default CardActions;
