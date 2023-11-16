'use client';

import React from 'react';
import styled, { extractStyling } from '@styles';
import { useSlotProps } from '@hooks';
import { useListContext } from '../ListContext';

const listItemSecondaryActionClasses = {
  root: 'ListItemSecondaryAction-Root',
  disabkeGutters: 'DisableGutters'
};

const ListItemSecondaryActionRoot = styled('div', {
  name: 'ListItemSecondaryAction',
  slot: 'Root'
})(({ ownerState }) => ({
  position: 'absolute',
  right: 16,
  top: '50%',
  transform: 'translateY(-50%)',
  ...(ownerState.disableGutters && {
    right: 0
  }),
  ...ownerState.cssStyles
}));

const ListItemSecondaryAction = React.forwardRef((props, ref) => {
  const { component: componentProp = 'div', slots = {}, slotProps = {}, ...otherProps } = props;

  const { cssStyles, other } = extractStyling(otherProps);
  const context = useListContext();
  const ownerState = { ...props, cssStyles, disableGutters: context.disableGutters };

  const classes = {
    root: [
      listItemSecondaryActionClasses.root,
      ownerState.disableGutters && listItemSecondaryActionClasses.disableGutters
    ]
  };

  const component = componentProp || 'div';
  const ListItemSecondaryActionComponent = slots.root || ListItemSecondaryActionRoot;
  const listItemSecondaryActionRootProps = useSlotProps({
    elementType: ListItemSecondaryActionComponent,
    externalSlotProps: slotProps.root,
    externalForwardedProps: other,
    additionalProps: {
      ref: ref
    },
    ownerState,
    className: classes.root
  });

  return <ListItemSecondaryActionComponent as={component} {...listItemSecondaryActionRootProps} />;
});

ListItemSecondaryAction.displayName = 'ListItemSecondaryAction';

export default ListItemSecondaryAction;
