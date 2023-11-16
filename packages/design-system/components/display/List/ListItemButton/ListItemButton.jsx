'use client';

import React from 'react';
import clsx from 'clsx';
import styled, { extractStyling, shouldForwardProp } from '@styles';
import { useEnhancedEffect, useForkRef, useSlotProps } from '@hooks';
import { ButtonBase } from '@components/inputs/ButtonBase';
import ListContext, { useListContext } from '../ListContext';

export const listItemButtonClasses = {
  root: 'ListItemButton-Root',
  alignItems: 'AlignItemsFlexStart',
  dense: 'Dense',
  disableGutters: 'Gutters',
  divider: 'Divider',
  selected: 'Selected'
};

const ListItemButtonRoot = styled(ButtonBase, {
  shouldForwardProp: (prop) => shouldForwardProp(prop) || prop === 'classes',
  name: 'ListItemButton',
  slot: 'Root'
})(({ theme, ownerState }) => ({
  display: 'flex',
  flexGrow: 1,
  justifyContent: 'flex-start',
  alignItems: 'center',
  position: 'relative',
  textDecoration: 'none',
  minWidth: 0,
  boxSizing: 'border-box',
  textAlign: 'left',
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
  transition: theme.transition.create('background-color', {
    duration: theme.transition.duration.shortest
  }),
  '&:hover': {
    textDecoration: 'none',
    backgroundColor: theme.colors.selected,
    '@media (hover: none)': {
      backgroundColor: 'transparent'
    }
  },
  [`&.${listItemButtonClasses.selected}`]: {
    backgroundColor: theme.colors.alpha.add(theme.colors.monochrome.body, theme.mode === 'light' ? 0.08 : 0.16),
    [`&.${listItemButtonClasses.focusVisible}`]: {
      backgroundColor: theme.colors.alpha.add(theme.colors.monochrome.body, theme.mode === 'light' ? 0.2 : 0.28)
    }
  },
  [`&.${listItemButtonClasses.selected}:hover`]: {
    backgroundColor: theme.colors.alpha.add(theme.colors.monochrome.body, theme.mode === 'light' ? 0.2 : 0.28),
    '@media (hover: none)': {
      backgroundColor: theme.colors.alpha.add(theme.colors.monochrome.body, theme.mode === 'light' ? 0.08 : 0.16)
    }
  },
  [`&.${listItemButtonClasses.focusVisible}`]: {
    backgroundColor: theme.colors.selected
  },
  [`&.${listItemButtonClasses.disabled}`]: {
    opacity: 0.38
  },
  ...(ownerState.divider && {
    borderBottom: `1px solid ${theme.colors.divider}`,
    backgroundClip: 'padding-box'
  }),
  ...(ownerState.alignItems === 'flex-start' && {
    alignItems: 'flex-start'
  }),
  ...(!ownerState.disableGutters && {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  }),
  ...(ownerState.dense && {
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5)
  }),
  ...ownerState.cssStyles
}));

const ListItemButton = React.forwardRef((props, ref) => {
  const {
    alignItems = 'center',
    autoFocus = false,
    component = 'div',
    children: childrenProp,
    dense = false,
    disableGutters = false,
    divider = false,
    focusVisibleClassName,
    onChange,
    onClick,
    selected,
    value,
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
        console.error('Unable to set focus to a ListItemButton whose component has not been rendered.');
      }
    }
  }, [autoFocus]);

  const children = React.Children.toArray(childrenProp);

  const handleClick = (event) => {
    if (!selected && onChange) {
      onChange(event, value);
    }

    if (onClick) {
      onClick(event);
    }
  };

  const ownerState = {
    ...props,
    alignItems,
    cssStyles,
    dense: childContext.dense,
    disableGutters,
    divider,
    selected
  };

  const classes = {
    root: [
      listItemButtonClasses.root,
      ownerState.alignItems && listItemButtonClasses.alignItemsFlexStart,
      ownerState.dense && listItemButtonClasses.dense,
      ownerState.disableGutters && listItemButtonClasses.gutters,
      ownerState.divider && listItemButtonClasses.divider,
      ownerState.selected && listItemButtonClasses.selected
    ],
    focusVisible: listItemButtonClasses.focusVisible
  };

  const listItemButtonRootProps = useSlotProps({
    elementType: ListItemButtonRoot,
    externalForwardedProps: other,
    additionalProps: {
      component: (other.href || other.to) && component === 'div' ? 'button' : component,
      disabled: ownerState.disabled,
      focusVisibleClassName: clsx(classes.focusVisible, focusVisibleClassName),
      href: other.href || other.to,
      onClick: handleClick,
      ref: handleRef,
      tabIndex: selected ? 0 : -1
    },
    ownerState,
    className: classes.root
  });

  return (
    <ListContext value={childContext}>
      <ListItemButtonRoot {...listItemButtonRootProps}>{children}</ListItemButtonRoot>
    </ListContext>
  );
});

ListItemButton.displayName = 'ListItemButton';

export default ListItemButton;
