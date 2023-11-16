'use client';

import React from 'react';
import styled, { extractStyling } from '@styles';
import { useSlotProps } from '@hooks';
import { useListContext } from '../ListContext';

export const listItemIconClasses = {
  root: 'ListItemIcon-Root',
  flexStart: 'AlignItemsFlexStart'
};

const ListItemIconRoot = styled('div', {
  name: 'ListItemIcon',
  slot: 'Root'
})(({ theme, ownerState }) => ({
  minWidth: theme.pxToRem(56),
  color: theme.colors.action.active,
  flexShrink: 0,
  display: 'inline-flex',
  ...(ownerState.alignItems === 'flex-start' && {
    marginTop: theme.pxToRem(8)
  }),
  ...ownerState.cssStyles
}));

const ListItemIcon = React.forwardRef((props, ref) => {
  const { component: componentProp = 'div', slots = {}, slotProps = {}, ...otherProps } = props;

  const { cssStyles, other } = extractStyling(otherProps);

  const context = useListContext();
  const ownerState = { ...props, cssStyles, alignItems: context.alignItems };

  const classes = {
    root: [listItemIconClasses.root, ownerState.alignItems === 'flex-start' && listItemIconClasses.flexStart]
  };

  const component = componentProp || 'div';
  const ListItemIconRootComponent = slots.root || ListItemIconRoot;
  const listItemIconRootProps = useSlotProps({
    elementType: ListItemIconRootComponent,
    externalSlotProps: slotProps.root,
    externalForwardedProps: other,
    additionalProps: {
      ref: ref
    },
    ownerState,
    className: classes.root
  });

  return <ListItemIconRootComponent as={component} {...listItemIconRootProps} />;
});

ListItemIcon.displayName = 'ListItemIcon';

export default ListItemIcon;
