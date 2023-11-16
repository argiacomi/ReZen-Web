'use client';

import React from 'react';
import { isFragment } from 'react-is';
import clsx from 'clsx';
import styled, { extractStyling, shouldForwardProp, useTheme } from '@styles';
import { useSlotProps } from '@hooks';
import { Popover, PopoverPopper } from '@components/utils/Popover';
import { MenuList } from './MenuList';

const RTL_ORIGIN = {
  vertical: 'top',
  horizontal: 'right'
};

const LTR_ORIGIN = {
  vertical: 'top',
  horizontal: 'left'
};

export const menuClasses = {
  root: 'Menu-Root',
  list: 'Menu-List',
  popper: 'Menu-Popper',
  expanded: 'Expanded'
};

const MenuRoot = styled(Popover, {
  shouldForwardProp: (prop) => shouldForwardProp(prop) || prop === 'classes',
  name: 'Menu',
  slot: 'Root'
})({});

export const MenuPopper = styled(PopoverPopper, {
  name: 'Menu',
  slot: 'Popper'
})(({ theme, ownerState }) => ({
  maxHeight: `calc(100% - ${theme.pxToRem(96)})`,
  WebkitOverflowScrolling: 'touch',
  overflow: ownerState.arrow ? 'visible' : undefined
}));

const MenuMenuList = styled(MenuList, {
  name: 'Menu',
  slot: 'List',
  overridesResolver: (props, styles) => styles.list
})({
  outline: 0
});

const Menu = React.forwardRef((props, ref) => {
  const {
    anchorEl,
    anchorOrigin = { vertical: 'bottom', horizontal: 'left' },
    arrow = false,
    autoFocus = true,
    children,
    dense = false,
    disableAutoFocusItem = false,
    disableScrollLock = true,
    onClose,
    open,
    PaperProps = {},
    slots = {},
    slotProps = {},
    transformOrigin,
    transition = 'Grow',
    transitionDuration = 'auto',
    TransitionProps: { onEntering, ...TransitionProps } = {},
    variant = 'selectedMenu',
    ...otherProps
  } = props;

  const { cssStyles, other } = extractStyling(otherProps);

  const theme = useTheme();
  const isRtl = theme.direction === 'rtl';

  const ownerState = {
    ...props,
    cssStyles,
    autoFocus,
    disableAutoFocusItem,
    onEntering,
    transitionDuration,
    TransitionProps,
    variant
  };

  const classes = {
    root: [menuClasses.root, ownerState.open && menuClasses.expanded],
    list: [menuClasses.list, ownerState.open && menuClasses.expanded],
    popper: menuClasses.popper
  };

  const autoFocusItem = autoFocus && !disableAutoFocusItem && open;

  const menuListActionsRef = React.useRef(null);

  const handleEntering = (element, isAppearing) => {
    if (menuListActionsRef.current) {
      menuListActionsRef.current.adjustStyleForScrollbar(element, theme);
    }

    if (onEntering) {
      onEntering(element, isAppearing);
    }
  };

  const handleListKeyDown = (event) => {
    if (event.key === 'Tab') {
      event.preventDefault();

      if (onClose) {
        onClose(event, 'tabKeyDown');
      }
    }
  };

  let activeItemIndex = -1;

  React.Children.map(children, (child, index) => {
    if (!React.isValidElement(child)) {
      return;
    }

    if (process.env.NODE_ENV !== 'production') {
      if (isFragment(child)) {
        console.error(
          ["The Menu component doesn't accept a Fragment as a child.", 'Consider providing an array instead.'].join(
            '\n'
          )
        );
      }
    }

    if (!child.props.disabled) {
      if (variant === 'selectedMenu' && child.props.selected) {
        activeItemIndex = index;
      } else if (activeItemIndex === -1) {
        activeItemIndex = index;
      }
    }
  });

  const Root = slots.root ?? MenuRoot;
  const MenuList = slots.list ?? MenuMenuList;

  const MenuRootProps = useSlotProps({
    elementType: Root,
    externalForwardedProps: other,
    externalSlotProps: slotProps.root,
    additionalProps: {
      anchorEl,
      anchorOrigin,
      arrow,
      disableScrollLock,
      open,
      role: undefined,
      ref: ref,
      slots: { popper: slots.popper || MenuPopper },
      slotProps: { popper: { ...slotProps.popper, ...cssStyles, className: classes.popper } },
      transformOrigin: transformOrigin || (isRtl ? RTL_ORIGIN : LTR_ORIGIN),
      transition,
      transitionDuration,
      TransitionProps: { onEntering: handleEntering, ...TransitionProps }
    },
    ownerState,
    className: [classes.root]
  });

  const MenuListProps = useSlotProps({
    elementType: MenuList,
    externalSlotProps: slotProps.list,
    additionalProps: {
      dense,
      role: 'menu',
      variant
    },
    ownerState,
    className: classes.list
  });

  return (
    <MenuRoot onClose={onClose} {...MenuRootProps}>
      <MenuMenuList
        onKeyDown={handleListKeyDown}
        actions={menuListActionsRef}
        autoFocus={autoFocus && (activeItemIndex === -1 || disableAutoFocusItem)}
        autoFocusItem={autoFocusItem}
        {...MenuListProps}
      >
        {children}
      </MenuMenuList>
    </MenuRoot>
  );
});

Menu.displayName = 'Menu';

export default Menu;
