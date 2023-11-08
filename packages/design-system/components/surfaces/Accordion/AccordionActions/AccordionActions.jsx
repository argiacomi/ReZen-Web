'use client';

import React from 'react';
import clsx from 'clsx';
import styled from '@styles';

export const accordionActionsClasses = {
  root: 'AccordionActions-Root',
  spacing: 'Spacing'
};

const AccordionActionsRoot = styled('div')(({ theme, ownerState }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: 8,
  justifyContent: 'flex-end',
  ...(!ownerState.disableSpacing && {
    '& > :not(:first-of-type)': {
      marginLeft: 8
    }
  })
}));

const AccordionActions = React.forwardRef((props, ref) => {
  const { className, disableSpacing = false, ...other } = props;

  const ownerState = {
    ...props,
    disableSpacing
  };

  const classes = {
    root: [accordionActionsClasses.root, !ownerState.disableSpacing && accordionActionsClasses.spacing]
  };

  return (
    <AccordionActionsRoot className={clsx(classes.root, className)} ref={ref} ownerState={ownerState} {...other} />
  );
});
AccordionActions.displayName = 'AccordionActions';

export default AccordionActions;
