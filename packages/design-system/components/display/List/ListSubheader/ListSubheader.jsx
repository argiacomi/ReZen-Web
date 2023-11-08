'use client';

import React from 'react';
import styled, { extractStyling } from '@styles';
import { useSlotProps } from '@hooks';

export const listSubheaderClasses = {
  root: 'ListSubheader-Root',
  gutter: 'Gutters',
  inset: 'Inset',
  sticky: 'Sticky'
};

const ListSubheaderRoot = styled('li', {
  name: 'ListSubheader',
  slot: 'Root'
})(({ theme, ownerState }) => ({
  boxSizing: 'border-box',
  lineHeight: theme.pxToRem(48),
  listStyle: 'none',
  color: theme.colors.text.secondary,
  fontFamily: theme.typography.fontFamily,
  fontWeight: theme.typography.fontWeightMedium,
  fontSize: theme.pxToRem(14),
  ...(ownerState.color === 'primary' && {
    color: theme.colors.primary.body
  }),
  ...(ownerState.color === 'inherit' && {
    color: 'inherit'
  }),
  ...(!ownerState.disableGutters && {
    paddingLeft: theme.pxToRem(16),
    paddingRight: theme.pxToRem(16)
  }),
  ...(ownerState.inset && {
    paddingLeft: theme.pxToRem(72)
  }),
  ...(!ownerState.disableSticky && {
    position: 'sticky',
    top: 0,
    zIndex: 1,
    backgroundColor: theme.colors.background
  }),
  ...ownerState.cssStyles
}));

const ListSubheader = React.forwardRef((props, ref) => {
  const {
    color = 'default',
    component: componentProp = 'li',
    disableGutters = false,
    disableSticky = false,
    inset = false,
    slots = {},
    slotProps = {},
    ...otherProps
  } = props;

  const { cssStyles, other } = extractStyling(otherProps);

  const ownerState = {
    ...props,
    cssStyles,
    color,
    disableGutters,
    disableSticky,
    inset
  };

  const classes = {
    root: [
      listSubheaderClasses.root,
      !disableGutters && listSubheaderClasses.gutters,
      inset && listSubheaderClasses.inset,
      !disableSticky && listSubheaderClasses.sticky
    ]
  };

  const component = componentProp || 'li';
  const ListSubheaderComponent = slots.root || ListSubheaderRoot;
  const listSubheaderRootProps = useSlotProps({
    elementType: ListSubheaderComponent,
    externalSlotProps: slotProps.root,
    externalForwardedProps: other,
    additionalProps: {
      ref: ref
    },
    ownerState,
    className: classes.root
  });

  return <ListSubheaderComponent as={component} {...listSubheaderRootProps} />;
});

ListSubheader.displayName = 'ListSubheader';

export default ListSubheader;
