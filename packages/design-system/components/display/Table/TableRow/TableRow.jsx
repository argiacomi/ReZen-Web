'use client';

import React from 'react';
import clsx from 'clsx';
import styled, { extractStyling } from '@styles';
import { useTablelvl2Context } from '..';

export const tableRowClasses = {
  root: 'TableRow-Root'
};

const TableRowRoot = styled('tr', {
  name: 'TableRow',
  slot: 'Root'
})(({ theme, ownerState }) => ({
  color: 'inherit',
  display: 'table-row',
  verticalAlign: 'middle',
  outline: 0,
  [`&.${tableRowClasses.hover}:hover`]: {
    backgroundColor: theme.colors.hover
  },
  [`&.${tableRowClasses.selected}`]: {
    backgroundColor: theme.colors.alpha.add(theme.colors.primary.body, theme.colors.selectedOpacity),
    '&:hover': {
      backgroundColor: theme.colors.alpha.add(
        theme.colors.primary.body,
        theme.colors.selectedOpacity + theme.colors.hoverOpacity
      )
    }
  },
  ...ownerState.cssStyles
}));

const defaultComponent = 'tr';

const TableRow = React.forwardRef((props, ref) => {
  const { className, component = defaultComponent, hover = false, selected = false, ...otherProps } = props;

  const { cssStyles, other } = extractStyling(otherProps);

  const tablelvl2 = useTablelvl2Context();

  const ownerState = {
    ...props,
    component,
    cssStyles,
    hover,
    selected,
    head: tablelvl2 && tablelvl2.variant === 'head',
    footer: tablelvl2 && tablelvl2.variant === 'footer'
  };

  const classes = {
    root: [
      tableRowClasses.root,
      ownerState.selected && tableRowClasses.selected,
      ownerState.hover && tableRowClasses.hover,
      ownerState.head && tableRowClasses.head,
      ownerState.footer && tableRowClasses.footer
    ]
  };

  return (
    <TableRowRoot
      as={component}
      ref={ref}
      className={clsx(classes.root, className)}
      role={component === defaultComponent ? null : 'row'}
      ownerState={ownerState}
      {...other}
    />
  );
});

TableRow.displayName = 'TableRow';

export default TableRow;
