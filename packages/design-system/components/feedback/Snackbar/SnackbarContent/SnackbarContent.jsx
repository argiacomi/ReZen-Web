'use client';

import React from 'react';
import clsx from 'clsx';
import styled from '@styles';
import { Paper } from '@components/surfaces';

export const snackbarContentClasses = {
  root: 'SnackbarContent-Root',
  action: 'SnackbarContent-Action',
  message: 'SnackbarContent-Message'
};

const SnackbarContentRoot = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  color: 'rgba(0, 0, 0, 0.89)',
  backgroundColor: theme.colors.alpha.darken(theme.colors.background, 0.8),
  [`${theme.getColorSchemeSelector()}`]: {
    color: 'rgb(255, 255, 255)',
    backgroundColor: theme.colors.alpha.lighten(theme.colors.background, 0.25)
  },
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  padding: '6px 16px',
  borderRadius: theme.rounded.md,
  flexGrow: 1,
  [theme.breakpoints.up('sm')]: {
    flexGrow: 'initial',
    minWidth: 288
  }
}));

const SnackbarContentMessage = styled('div')(({ theme }) => ({
  padding: `8px 0`
}));

const SnackbarContentAction = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginLeft: 'auto',
  paddingLeft: 16,
  marginRight: -8
}));

const SnackbarContent = React.forwardRef((props, ref) => {
  const { action, className, message, role = 'alert', ...other } = props;
  const ownerState = props;

  return (
    <SnackbarContentRoot
      role={role}
      square
      elevation={6}
      className={clsx(snackbarContentClasses.root, className)}
      ownerState={ownerState}
      ref={ref}
      {...other}
    >
      <SnackbarContentMessage className={snackbarContentClasses.message} ownerState={ownerState}>
        {message}
      </SnackbarContentMessage>
      {action ? (
        <SnackbarContentAction className={snackbarContentClasses.action} ownerState={ownerState}>
          {action}
        </SnackbarContentAction>
      ) : null}
    </SnackbarContentRoot>
  );
});

SnackbarContent.displayName = 'SnackbarContent';

export default SnackbarContent;
