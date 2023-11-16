'use client';

import React from 'react';
import styled, { extractStyling } from '@styles';
import { useSlotProps } from '@hooks';
import { Text } from '@components/typography/Text';
import { useListContext } from '../ListContext';

export const listItemTextClasses = {
  root: 'ListItemText-Root',
  primary: 'ListItemText-Primary',
  secondary: 'ListItemText-Secondary',
  inset: 'ListItemText-Inset'
};

const ListItemTextRoot = styled('div', {
  name: 'ListItemText',
  slot: 'Root'
})(({ theme, ownerState }) => ({
  flex: '1 1 auto',
  minWidth: 0,
  marginTop: theme.pxToRem(4),
  marginBottom: theme.pxToRem(4),
  ...(ownerState.primary &&
    ownerState.secondary && {
      marginTop: theme.pxToRem(6),
      marginBottom: theme.pxToRem(6)
    }),
  ...(ownerState.inset && {
    paddingLeft: theme.pxToRem(56)
  }),
  ...ownerState.cssStyles
}));

const ListItemText = React.forwardRef((props, ref) => {
  const {
    children,
    component: componentProp = 'div',
    disableText = false,
    inset = false,
    primary: primaryProp,
    primaryTextProps,
    secondary: secondaryProp,
    secondaryTextProps,
    slots = {},
    slotProps = {},
    ...otherProps
  } = props;

  const { cssStyles, other } = extractStyling(otherProps);

  const context = useListContext();

  let primary = primaryProp != null ? primaryProp : children;
  let secondary = secondaryProp;

  const ownerState = {
    ...props,
    cssStyles,
    disableText,
    inset,
    primary: !!primary,
    secondary: !!secondary,
    dense: context.dense
  };

  if (primary != null && primary.type !== Text && !disableText) {
    primary = (
      <Text
        variant={context.dense ? 'body2' : 'body1'}
        className={listItemTextClasses.primary}
        color='text.primary'
        component={primaryTextProps?.variant ? undefined : 'span'}
        display='block'
        {...primaryTextProps}
      >
        {primary}
      </Text>
    );
  }

  if (secondary != null && secondary.type !== Text && !disableText) {
    secondary = (
      <Text
        variant='body2'
        className={listItemTextClasses.secondary}
        color='text.secondary'
        display='block'
        {...secondaryTextProps}
      >
        {secondary}
      </Text>
    );
  }

  const classes = {
    root: [listItemTextClasses.root, ownerState.inset && listItemTextClasses.inset]
  };

  const component = componentProp || 'div';
  const ListItemTextComponent = slots.root || ListItemTextRoot;
  const listItemTextRootProps = useSlotProps({
    elementType: ListItemTextComponent,
    externalSlotProps: slotProps.root,
    externalForwardedProps: other,
    additionalProps: {
      ref: ref
    },
    ownerState,
    className: classes.root
  });

  return (
    <ListItemTextComponent as={component} {...listItemTextRootProps}>
      {primary}
      {secondary}
    </ListItemTextComponent>
  );
});

ListItemText.displayName = 'ListItemText';

export default ListItemText;
