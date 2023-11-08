'use client';

import React from 'react';
import styled, { extractStyling } from '@styles';
import { useSlotProps } from '@hooks';
import ListContext from './ListContext';

export const listClasses = {
  root: 'List-Root',
  padding: 'Padding',
  dense: 'Dense',
  subheader: 'Subheader',
  horizontal: 'Horizontal',
  vertical: 'Vertical'
};

const ListRoot = styled('ul')(({ theme, ownerState }) => ({
  listStyle: 'none',
  margin: 0,
  padding: 0,
  position: 'relative',
  ...(!ownerState.disablePadding && {
    paddingTop: theme.pxToRem(8),
    paddingBottom: theme.pxToRem(8)
  }),
  ...(ownerState.subheader && {
    paddingTop: 0
  }),
  ...ownerState.cssStyles
}));

const List = React.forwardRef(function List(props, ref) {
  const {
    children,
    component = 'ul',
    defaultValue,
    dense = false,
    disablePadding = false,
    slotProps = {},
    slots = {},
    subheader,
    ...otherProps
  } = props;

  const context = React.useMemo(() => ({ dense }), [dense]);

  const { cssStyles, other } = extractStyling(otherProps);

  const ownerState = {
    ...props,
    component,
    dense,
    disablePadding,
    subheader
  };

  const classes = {
    root: [
      listClasses.root,
      !ownerState.disablePadding && listClasses.padding,
      ownerState.dense && listClasses.dense,
      ownerState.subheader && listClasses.subheader
    ]
  };

  const ListComponent = slots.root || ListRoot;

  const listRootProps = useSlotProps({
    elementType: ListComponent,
    externalSlotProps: slotProps.root,
    externalForwardedProps: other,
    additionalProps: {
      ref: ref
    },
    ownerState,
    className: classes.root
  });

  return (
    <ListContext.Provider value={context}>
      <ListComponent as={component} {...listRootProps}>
        {subheader}
        {children}
      </ListComponent>
    </ListContext.Provider>
  );
});
List.displayName = 'List';

export default List;
