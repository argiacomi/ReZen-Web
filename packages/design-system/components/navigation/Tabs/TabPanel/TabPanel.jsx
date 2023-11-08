'use client';

import React from 'react';
import clsx from 'clsx';
import styled, { extractStyling } from '@styles';
import { getPanelId, getTabId, useTabContext } from '../TabContext';

export const tabPanelClasses = {
  root: 'TabPanel-Root'
};

const TabPanelRoot = styled('div', {
  name: 'TabPanel',
  slot: 'Root'
})(({ theme, ownerState }) => ({
  padding: theme.spacing(3),
  ...ownerState.cssStyles
}));

const TabPanel = React.forwardRef((props, ref) => {
  const { children, className, value, ...otherProps } = props;

  const { cssStyles, other } = extractStyling(otherProps);

  const ownerState = {
    ...props,
    cssStyles
  };

  const classes = {
    root: [tabPanelClasses.root]
  };

  const context = useTabContext();

  if (context === null) {
    throw new TypeError('No TabContext provided');
  }
  const id = getPanelId(context, value);
  const tabId = getTabId(context, value);

  return (
    <TabPanelRoot
      aria-labelledby={tabId}
      className={clsx(classes.root, className)}
      hidden={value !== context.value}
      id={id}
      ref={ref}
      role='tabpanel'
      ownerState={ownerState}
      {...other}
    >
      {value === context.value && children}
    </TabPanelRoot>
  );
});

TabPanel.displayName = 'TabPanel';

export default TabPanel;
