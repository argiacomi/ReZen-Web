'use client';

import React from 'react';
import clsx from 'clsx';
import styled from '@styles';

export const componentClasses = {
  root: 'SnackbarContainer-Root',
  snackbar: 'SnackbarContainer-Snackbar'
};

const SnackbarContainerRoot = styled('div')(({ theme, ownerState }) => ({
  display: 'flex',
  maxHeight: '100%',
  position: 'fixed',
  zIndex: theme.zIndex.snackbar,
  height: 'auto',
  width: 'auto',
  transition: theme.transition.create(['top', 'right', 'bottom', 'left', 'max-width'], {
    duration: 300,
    easing: 'ease'
  }),
  [`.${componentClasses.snackbar}`]: {
    padding: `12px 0px`,
    transition: 'padding 300ms ease 0ms'
  },
  maxWidth: `calc(100% - 40px)`,
  [theme.breakpoints.down('xs')]: {
    width: '100%',
    maxWidth: `calc(100% - 24px)`
  },
  ...(ownerState.dense && {
    [`& .${componentClasses.snackbar}`]: {
      padding: `2px 0px`
    }
  }),
  ...{
    top: {
      top: 14,
      flexDirection: 'column'
    },
    bottom: {
      bottom: 14,
      flexDirection: 'column-reverse'
    }
  }[ownerState.anchorOrigin?.vertical],
  ...{
    left: {
      left: 20,
      [theme.breakpoints.up('sm')]: {
        alignItems: 'flex-start'
      },
      [theme.breakpoints.down('xs')]: {
        left: 16
      }
    },
    right: {
      right: 20,
      [theme.breakpoints.up('sm')]: {
        alignItems: 'flex-end'
      },
      [theme.breakpoints.down('xs')]: {
        right: 16
      }
    },
    center: {
      left: '50%',
      transform: 'translateX(-50%)',
      [theme.breakpoints.up('sm')]: {
        alignItems: 'center'
      }
    }
  }[ownerState.anchorOrigin?.horizontal]
}));

const SnackbarContainer = React.forwardRef((props, ref) => {
  const {
    classes = {},
    className,
    anchorOrigin = { vertical: 'bottom', horizontal: 'left' },
    dense = false,
    children
  } = props;

  const ownerState = {
    ...props,
    anchorOrigin,
    dense
  };

  return (
    <SnackbarContainerRoot
      className={clsx(componentClasses.root, classes.root, className)}
      ownerState={ownerState}
      ref={ref}
    >
      {children}
    </SnackbarContainerRoot>
  );
});

SnackbarContainer.displayName = 'SnackbarContainer';

export default SnackbarContainer;
