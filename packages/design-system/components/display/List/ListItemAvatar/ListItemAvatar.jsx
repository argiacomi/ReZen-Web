'use client';

import React from 'react';
import styled, { extractStyling } from '@styles';
import { useSlotProps } from '@hooks';
import ListContext from '../ListContext';

export const listItemAvatarClasses = {
  root: 'ListItemAvatar-Root',
  flexStart: 'AlignItemsFlexStart'
};

const ListItemAvatarRoot = styled('div', {
  name: 'ListItemAvatar',
  slot: 'Root'
})(({ theme, ownerState }) => ({
  minWidth: theme.pxToRem(56),
  flexShrink: 0,
  ...(ownerState.alignItems === 'flex-start' && {
    marginTop: theme.pxToRem(56)
  }),
  ...ownerState.cssStyles
}));

const ListItemAvatar = React.forwardRef((props, ref) => {
  const { component: componentProp = 'div', slots = {}, slotProps = {}, ...otherProps } = props;

  const { cssStyles, other } = extractStyling(otherProps);

  const context = React.useContext(ListContext);
  const ownerState = { ...props, alignItems: context.alignItems, cssStyles };

  const classes = {
    root: [listItemAvatarClasses.root, ownerState.alignItems === 'flex-start' && listItemAvatarClasses.flexStart]
  };

  const component = componentProp || 'div';
  const ListItemAvatarRootComponent = slots.root || ListItemAvatarRoot;
  const listItemAvatarRootProps = useSlotProps({
    elementType: ListItemAvatarRootComponent,
    externalSlotProps: slotProps.root,
    externalForwardedProps: other,
    additionalProps: {
      ref: ref
    },
    ownerState,
    className: classes.root
  });

  return <ListItemAvatarRoot as={component} {...listItemAvatarRootProps} />;
});

ListItemAvatar.displayName = 'ListItemAvatar';

export default ListItemAvatar;
