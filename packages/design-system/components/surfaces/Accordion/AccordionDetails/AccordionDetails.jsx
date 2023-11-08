'use client';

import React from 'react';
import clsx from 'clsx';
import styled from '@styles';

export const accordionDetailsClasses = { root: 'AccordionDetails-Root' };

const AccordionDetailsRoot = styled('div')(({ theme }) => ({
  padding: `8px 16px 8px`
}));

const AccordionDetails = React.forwardRef((props, ref) => {
  const { className, ...other } = props;

  return <AccordionDetailsRoot className={clsx(accordionDetailsClasses.root, className)} ref={ref} {...other} />;
});
AccordionDetails.displayName = 'AccordionDetails';

export default AccordionDetails;
