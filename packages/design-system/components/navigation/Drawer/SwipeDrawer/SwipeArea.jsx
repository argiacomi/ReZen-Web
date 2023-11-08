'use client';

import React from 'react';
import clsx from 'clsx';
import styled from '@styles';
import { capitalize } from '@utils';
import { isHorizontal } from '../Drawer';

const SwipeAreaRoot = styled('div')(({ theme, ownerState }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  bottom: 0,
  zIndex: theme.zIndex.drawer - 1,
  ...(ownerState.anchor === 'left' && {
    right: 'auto'
  }),
  ...(ownerState.anchor === 'right' && {
    left: 'auto',
    right: 0
  }),
  ...(ownerState.anchor === 'top' && {
    bottom: 'auto',
    right: 0
  }),
  ...(ownerState.anchor === 'bottom' && {
    top: 'auto',
    bottom: 0,
    right: 0
  })
}));

const SwipeArea = React.forwardRef((props, ref) => {
  const { anchor, classes = {}, className, width, style, ...other } = props;

  const ownerState = props;

  return (
    <SwipeAreaRoot
      className={clsx('PrivateSwipeArea-root', classes.root, classes[`anchor${capitalize(anchor)}`], className)}
      ref={ref}
      style={{
        [isHorizontal(anchor) ? 'width' : 'height']: width,
        ...style
      }}
      ownerState={ownerState}
      {...other}
    />
  );
});

SwipeArea.displayName = 'SwipeArea';

export default SwipeArea;
