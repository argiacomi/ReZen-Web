'use client';

import React from 'react';
import styled, { extractStyling } from '@styles';
import { useSlotProps } from '@hooks';

export const cardContentClasses = {
  root: 'CardContent-Root'
};

const CardContentRoot = styled('div')(({ theme, ownerState }) => ({
  padding: 16,
  '&:last-child': {
    paddingBottom: 24
  },
  ...ownerState.cssStyles
}));

const CardContent = React.forwardRef((props, ref) => {
  const { component = 'div', slots = {}, slotProps = {}, ...otherProps } = props;

  const { cssStyles, other } = extractStyling(otherProps);

  const ownerState = { ...props, cssStyles };

  const CardContentComponent = slots.root || CardContentRoot;
  const cardContentRootProps = useSlotProps({
    elementType: CardContentComponent,
    externalSlotProps: slotProps.root,
    externalForwardedProps: other,
    additionalProps: {
      ref: ref
    },
    ownerState,
    className: cardContentClasses.root
  });

  return <CardContentComponent as={component} {...cardContentRootProps} />;
});

CardContent.displayName = 'CardContent';

export default CardContent;
