'use client';

import React from 'react';
import clsx from 'clsx';
import styled, { extractStyling, shouldForwardProp } from '@styles';
import { useEnhancedEffect, useForkRef } from '@hooks';
import { dividerClasses } from '@components/display/Divider';
import { ListContext, listItemIconClasses, listItemTextClasses } from '@components/display/List';
import { ButtonBase } from '@components/inputs/ButtonBase';

export const menuItemClasses = {
  root: 'MenuItem-Root',
  dense: 'Dense',
  disabled: 'Disabled',
  divider: 'Divider',
  gutters: 'Gutters',
  selected: 'Selected'
};

const MenuItemRoot = styled(ButtonBase, {
  shouldForwardProp: (prop) => shouldForwardProp(prop) || prop === 'classes',
  name: 'MenuItem',
  slot: 'Root'
})(({ theme, ownerState }) => ({
  ...theme.typography.body1,
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  position: 'relative',
  textDecoration: 'none',
  minHeight: theme.pxToRem(48),
  paddingTop: 6,
  paddingBottom: 6,
  boxSizing: 'border-box',
  whiteSpace: 'nowrap',
  ...(!ownerState.disableGutters && {
    paddingLeft: 16,
    paddingRight: 16
  }),
  ...(ownerState.divider && {
    borderBottom: `1px solid ${theme.colors.divider}`,
    backgroundClip: 'padding-box'
  }),
  '&:hover': {
    textDecoration: 'none',
    backgroundColor: theme.colors.action.hover,
    '@media (hover: none)': {
      backgroundColor: 'transparent'
    }
  },
  [`&.${menuItemClasses.selected}`]: {
    backgroundColor: theme.colors.alpha.add(theme.colors.primary.body, theme.colors.action.selectedOpacity),
    [`&.${menuItemClasses.focusVisible}`]: {
      backgroundColor: theme.colors.alpha.add(
        theme.colors.primary.body,
        `calc(${theme.colors.action.selectedOpacity} + ${theme.colors.action.focusOpacity})`
      )
    }
  },
  [`&.${menuItemClasses.selected}:hover`]: {
    backgroundColor: theme.colors.alpha.add(
      theme.colors.primary.body,
      `calc(${theme.colors.action.selectedOpacity} + ${theme.colors.action.hoverOpacity})`
    ),
    '@media (hover: none)': {
      backgroundColor: theme.colors.alpha.add(theme.colors.primary.body, theme.colors.action.selectedOpacity)
    }
  },
  [`&.${menuItemClasses.focusVisible}`]: {
    backgroundColor: theme.colors.action.focus
  },
  [`&.${menuItemClasses.disabled}`]: {
    opacity: theme.colors.action.disabledOpacity
  },
  [`& + .${dividerClasses.root}`]: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  [`& + .${dividerClasses.inset}`]: {
    marginLeft: 52
  },
  [`& .${listItemTextClasses.root}`]: {
    marginTop: 0,
    marginBottom: 0
  },
  [`& .${listItemTextClasses.inset}`]: {
    paddingLeft: 36
  },
  [`& .${listItemIconClasses.root}`]: {
    minWidth: 36
  },
  ...(!ownerState.dense && {
    [theme.breakpoints.up('sm')]: {
      minHeight: 'auto'
    }
  }),
  ...(ownerState.dense && {
    minHeight: 32,
    paddingTop: 4,
    paddingBottom: 4,
    ...theme.typography.body2,
    [`& .${listItemIconClasses.root} svg`]: {
      fontSize: '1.25rem'
    }
  }),
  ...ownerState.cssStyles
}));

const MenuItem = React.forwardRef((props, ref) => {
  const {
    autoFocus = false,
    className,
    component = 'li',
    dense = false,
    disabled = false,
    disableGutters = false,
    divider = false,
    focusVisibleClassName,
    role = 'menuitem',
    tabIndex: tabIndexProp,
    selected = false,
    slotProps = {},
    slots = {},
    ...otherProps
  } = props;

  const { cssStyles, other } = extractStyling(otherProps);

  const context = React.useContext(ListContext);
  const childContext = React.useMemo(
    () => ({
      dense: dense || context.dense || false,
      disableGutters
    }),
    [context.dense, dense, disableGutters]
  );

  const menuItemRef = React.useRef(null);
  useEnhancedEffect(() => {
    if (autoFocus) {
      if (menuItemRef.current) {
        menuItemRef.current.focus();
      } else if (process.env.NODE_ENV !== 'production') {
        console.error('Unable to set focus to a MenuItem whose component has not been rendered.');
      }
    }
  }, [autoFocus]);

  const ownerState = {
    ...props,
    cssStyles,
    dense: childContext.dense,
    disabled,
    disableGutters,
    divider,
    selected
  };

  const classes = {
    root: [
      ...(props.classes?.root ?? []),
      menuItemClasses.root,
      ownerState.dense && menuItemClasses.dense,
      ownerState.disabled && menuItemClasses.disabled,
      !ownerState.disableGutters && menuItemClasses.gutters,
      ownerState.divider && menuItemClasses.divider,
      ownerState.selected && menuItemClasses.selected
    ]
  };

  const handleRef = useForkRef(menuItemRef, ref);

  let tabIndex;
  if (!disabled) {
    tabIndex = tabIndexProp !== undefined ? tabIndexProp : -1;
  }

  return (
    <ListContext.Provider value={childContext}>
      <MenuItemRoot
        ref={handleRef}
        role={role}
        tabIndex={tabIndex}
        component={component}
        focusVisibleClassName={clsx(classes.focusVisible, focusVisibleClassName)}
        className={clsx(classes.root, className)}
        {...other}
        ownerState={ownerState}
        classes={classes}
      />
    </ListContext.Provider>
  );
});

MenuItem.displayName = 'MenuItem';

export default MenuItem;
