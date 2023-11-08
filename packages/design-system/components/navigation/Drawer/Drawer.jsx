'use client';

import React from 'react';
import clsx from 'clsx';
import styled, { extractStyling, useTheme } from '@styles';
import { capitalize } from '@utils';
import { Paper } from '@components/surfaces';
import { Modal, Slide } from '@components/utils';

const drawerClasses = {
  root: 'Drawer-Root',
  docked: 'Docked',
  modal: 'Drawer-Modal',
  paper: 'Drawer-Paper'
};

const DrawerRoot = styled(Modal, {
  name: 'Drawer',
  slot: 'Root'
})(({ theme, ownerState }) => ({
  zIndex: theme.zIndex.drawer,
  ...ownerState.cssStyles
}));

const DrawerDockedRoot = styled('div', {
  name: 'Drawer',
  slot: 'Docked'
})(({ ownerState }) => ({
  flex: '0 0 auto',
  ...ownerState.cssStyles
}));

const DrawerPaper = styled(Paper, {
  name: 'Drawer',
  slot: 'Paper'
})(({ theme, ownerState }) => ({
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  flex: '1 0 auto',
  zIndex: theme.zIndex.drawer,
  WebkitOverflowScrolling: 'touch',
  position: 'fixed',
  top: 0,
  outline: 0,
  ...(ownerState.anchor === 'left' && {
    left: 0
  }),
  ...(ownerState.anchor === 'top' && {
    top: 0,
    left: 0,
    right: 0,
    height: 'auto',
    maxHeight: '100%'
  }),
  ...(ownerState.anchor === 'right' && {
    right: 0
  }),
  ...(ownerState.anchor === 'bottom' && {
    top: 'auto',
    left: 0,
    bottom: 0,
    right: 0,
    height: 'auto',
    maxHeight: '100%'
  }),
  ...(ownerState.anchor === 'left' &&
    ownerState.variant !== 'temporary' && {
      borderRight: `1px solid ${theme.colors.divider}`
    }),
  ...(ownerState.anchor === 'top' &&
    ownerState.variant !== 'temporary' && {
      borderBottom: `1px solid ${theme.colors.divider}`
    }),
  ...(ownerState.anchor === 'right' &&
    ownerState.variant !== 'temporary' && {
      borderLeft: `1px solid ${theme.colors.divider}`
    }),
  ...(ownerState.anchor === 'bottom' &&
    ownerState.variant !== 'temporary' && {
      borderTop: `1px solid ${theme.colors.divider}`
    })
}));

const oppositeDirection = {
  left: 'right',
  right: 'left',
  top: 'down',
  bottom: 'up'
};

export function isHorizontal(anchor) {
  return ['left', 'right'].indexOf(anchor) !== -1;
}

export function getAnchor(theme, anchor) {
  return theme.direction === 'rtl' && isHorizontal(anchor) ? oppositeDirection[anchor] : anchor;
}

const Drawer = React.forwardRef((props, ref) => {
  const theme = useTheme();
  const defaultTransitionDuration = {
    enter: theme.transition.duration.enteringScreen,
    exit: theme.transition.duration.leavingScreen
  };

  const {
    anchor: anchorProp = 'left',
    BackdropProps,
    children,
    className,
    elevation = 16,
    hideBackdrop = false,
    ModalProps: { BackdropProps: BackdropPropsProp, ...ModalProps } = {},
    onClose,
    open = false,
    PaperProps = {},
    SlideProps,
    TransitionComponent = Slide,
    transitionDuration = defaultTransitionDuration,
    variant = 'temporary',
    ...otherProps
  } = props;

  const { cssStyles, other } = extractStyling(otherProps);

  const mounted = React.useRef(false);
  React.useEffect(() => {
    mounted.current = true;
  }, []);

  const anchorInvariant = getAnchor(theme, anchorProp);
  const anchor = anchorProp;

  const ownerState = {
    ...props,
    anchor,
    cssStyles,
    elevation,
    open,
    variant,
    ...other
  };

  const classes = {
    root: drawerClasses.root,
    docked: (ownerState.variant === 'permanent' || ownerState.variant === 'persistent') && drawerClasses.docked,
    modal: drawerClasses.modal,
    paper: drawerClasses.paper
  };

  const drawer = (
    <DrawerPaper
      elevation={variant === 'temporary' ? elevation : 0}
      square
      {...PaperProps}
      className={clsx(classes.paper, PaperProps.className)}
      ownerState={ownerState}
    >
      {children}
    </DrawerPaper>
  );

  if (variant === 'permanent') {
    return (
      <DrawerDockedRoot
        className={clsx(classes.root, classes.docked, className)}
        ownerState={ownerState}
        ref={ref}
        {...other}
      >
        {drawer}
      </DrawerDockedRoot>
    );
  }

  const slidingDrawer = (
    <TransitionComponent
      in={open}
      direction={oppositeDirection[anchorInvariant]}
      timeout={transitionDuration}
      appear={mounted.current}
      {...SlideProps}
    >
      {drawer}
    </TransitionComponent>
  );

  if (variant === 'persistent') {
    return (
      <DrawerDockedRoot
        className={clsx(classes.root, classes.docked, className)}
        ownerState={ownerState}
        ref={ref}
        {...other}
      >
        {slidingDrawer}
      </DrawerDockedRoot>
    );
  }

  return (
    <DrawerRoot
      BackdropProps={{
        ...BackdropProps,
        ...BackdropPropsProp,
        transitionDuration
      }}
      className={clsx(classes.root, classes.modal, className)}
      open={open}
      ownerState={ownerState}
      onClose={onClose}
      hideBackdrop={hideBackdrop}
      ref={ref}
      {...other}
      {...ModalProps}
    >
      {slidingDrawer}
    </DrawerRoot>
  );
});

Drawer.displayName = 'Drawer';

export default Drawer;
