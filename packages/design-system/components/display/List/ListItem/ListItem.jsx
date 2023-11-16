'use client';

import React from 'react';
import clsx from 'clsx';
import styled, { extractStyling } from '@styles';
import { useEnhancedEffect, useForkRef, useSlotProps } from '@hooks';
import { ButtonBase } from '@components/inputs/ButtonBase';
import ListContext, { useListContext } from '../ListContext';
import { listItemButtonClasses } from '../ListItemButton';
import { ListItemSecondaryAction } from '../ListItemSecondaryAction';

export const listItemClasses = {
  root: 'ListItem-Root',
  button: 'Button',
  dense: 'Dense',
  gutters: 'Gutters',
  padding: 'Padding',
  divider: 'Divider',
  disabled: 'Disabled',
  flexStart: 'AlignItemsFlexStart',
  focusVisible: 'FocusVisible',
  selected: 'Selected'
};

export const ListItemRoot = styled('div', {
  name: 'ListItem',
  slot: 'Root'
})(({ theme, ownerState }) => ({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  position: 'relative',
  textDecoration: 'none',
  width: '100%',
  boxSizing: 'border-box',
  textAlign: 'left',
  ...(!ownerState.disablePadding && {
    paddingTop: theme.pxToRem(8),
    paddingBottom: theme.pxToRem(8),
    ...(ownerState.dense && {
      paddingTop: theme.pxToRem(4),
      paddingBottom: theme.pxToRem(4)
    }),
    ...(!ownerState.disableGutters && {
      paddingLeft: theme.pxToRem(16),
      paddingRight: theme.pxToRem(16)
    }),
    ...(!!ownerState.secondaryAction && {
      paddingRight: theme.pxToRem(48)
    })
  }),
  ...(!!ownerState.secondaryAction && {
    [`& > .${listItemButtonClasses.root}`]: {
      paddingRight: theme.pxToRem(48)
    }
  }),
  [`&.${listItemClasses.focusVisible}`]: {
    backgroundColor: theme.colors.action.focus
  },
  [`&.${listItemClasses.selected}`]: {
    backgroundColor: theme.colors.alpha.add(theme.colors.primary.body, theme.colors.action.selectedOpacity),
    [`&.${listItemClasses.focusVisible}`]: {
      backgroundColor: theme.colors.alpha.add(
        theme.colors.primary.body,
        `calc(${theme.colors.action.selectedOpacity} + ${theme.colors.action.focusOpacity})`
      )
    }
  },
  [`&.${listItemClasses.disabled}`]: {
    opacity: theme.colors.action.disabledOpacity
  },
  ...(ownerState.alignItems === 'flex-start' && {
    alignItems: 'flex-start'
  }),
  ...(ownerState.divider && {
    borderBottom: `1px solid ${theme.colors.divider}`,
    backgroundClip: 'padding-box'
  }),
  ...(ownerState.button && {
    transition: theme.transition.create('background-color', {
      duration: theme.transition.duration.shortest
    }),
    '&:hover': {
      textDecoration: 'none',
      backgroundColor: theme.colors.action.hover,
      '@media (hover: none)': {
        backgroundColor: 'transparent'
      }
    },
    [`&.${listItemClasses.selected}:hover`]: {
      backgroundColor: theme.colors.alpha.add(
        theme.colors.primary.body,
        `calc(${theme.colors.action.selectedOpacity} + ${theme.colors.action.hoverOpacity})`
      ),
      '@media (hover: none)': {
        backgroundColor: theme.colors.alpha.add(theme.colors.primary.body, theme.colors.action.selectedOpacity)
      }
    }
  }),
  ...ownerState.cssStyles
}));

const ListItem = React.forwardRef((props, ref) => {
  const {
    alignItems = 'center',
    autoFocus = false,
    button = false,
    children: childrenProp,
    component: componentProp = 'li',
    dense = false,
    disabled = false,
    disableGutters = false,
    disablePadding = false,
    divider = false,
    focusVisibleClassName,
    secondaryAction,
    selected = false,
    slots = {},
    slotProps = {},
    ...otherProps
  } = props;

  const { cssStyles, other } = extractStyling(otherProps);

  const listItemRef = React.useRef(null);
  const handleRef = useForkRef(listItemRef, ref);

  const context = useListContext();
  const childContext = React.useMemo(
    () => ({
      dense: dense || context.dense || false,
      alignItems,
      disableGutters
    }),
    [alignItems, context.dense, dense, disableGutters]
  );

  useEnhancedEffect(() => {
    if (autoFocus) {
      if (listItemRef.current) {
        listItemRef.current.focus();
      } else if (process.env.NODE_ENV !== 'production') {
        console.error('Unable to set focus to a ListItem whose component has not been rendered.');
      }
    }
  }, [autoFocus]);

  const children = React.Children.toArray(childrenProp);

  const ownerState = {
    ...props,
    cssStyles,
    alignItems,
    autoFocus,
    button,
    dense: childContext.dense,
    disabled,
    disableGutters,
    disablePadding,
    divider,
    selected
  };

  const classes = {
    root: [
      listItemClasses.root,
      ownerState.dense && listItemClasses.dense,
      !ownerState.disableGutters && listItemClasses.gutters,
      !ownerState.disablePadding && listItemClasses.padding,
      ownerState.divider && listItemClasses.divider,
      ownerState.disabled && listItemClasses.disabled,
      ownerState.button && listItemClasses.button,
      ownerState.alignItems === 'flex-start' && listItemClasses.alignItemsFlexStart,
      ownerState.selected && listItemClasses.selected
    ]
  };

  const RootComponent = slots.root || ListItemRoot;
  const listItemRootProps = useSlotProps({
    elementType: RootComponent,
    externalSlotProps: slotProps.root,
    externalForwardedProps: other,
    additionalProps: {
      ref: handleRef,
      disabled: ownerState.disabled
    },
    ownerState,
    className: classes.root
  });

  let Component = componentProp || 'li';

  if (button) {
    listItemRootProps.component = componentProp || 'div';
    listItemRootProps.focusVisibleClassName = clsx(classes.focusVisible, focusVisibleClassName);

    Component = ButtonBase;
  }

  return (
    <ListContext value={childContext}>
      <RootComponent as={Component} {...listItemRootProps}>
        {children}
        {secondaryAction && <ListItemSecondaryAction>{secondaryAction}</ListItemSecondaryAction>}
      </RootComponent>
    </ListContext>
  );
});
ListItem.displayName = 'ListItem';

export default ListItem;
