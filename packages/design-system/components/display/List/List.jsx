'use client';

import React from 'react';
import { isFragment } from 'react-is';
import styled, { extractStyling } from '@styles';
import { useSlotProps } from '@hooks';
import ListContext, { getItemId, useListContext } from './ListContext';

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
    children: childrenProp,
    component = 'ul',
    defaultValue,
    dense = false,
    disablePadding = false,
    onChange,
    slotProps = {},
    slots = {},
    subheader,
    ...otherProps
  } = props;

  const childContext = { dense };
  const valueToIndex = new Map();

  const { cssStyles, other } = extractStyling(otherProps);

  const context = useListContext();

  if (context === null) {
    throw new TypeError('No ListContext provided');
  }

  let childIndex = 0;
  const children = React.Children.map(childrenProp, (child) => {
    if (!React.isValidElement(child)) {
      return null;
    }

    if (!child.type.displayName.startsWith('ListItem')) {
      return child;
    }

    if (process.env.NODE_ENV !== 'production') {
      if (isFragment(child)) {
        console.error(
          ["The List component doesn't accept a Fragment as a child.", 'Consider providing an array instead.'].join(
            '\n'
          )
        );
      }
    }

    const childValue = child.props.value === undefined ? childIndex : child.props.value;
    valueToIndex.set(childValue, childIndex);
    const selected = childValue === context.value;

    childIndex += 1;
    return React.cloneElement(child, {
      onChange,
      selected,
      value: childValue,
      ...(childIndex === 1 && context.value === false && !child.props.tabIndex ? { tabIndex: 0 } : {}),
      'aria-controls': getItemId(context, child.props.value),
      id: getItemId(context, child.props.value)
    });
  });

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
    <ListContext value={childContext}>
      <ListComponent as={component} {...listRootProps}>
        {subheader}
        {children}
      </ListComponent>
    </ListContext>
  );
});
List.displayName = 'List';

export default List;
