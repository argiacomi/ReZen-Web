'use client';

import React from 'react';
import styled from '@styles';
import { ButtonBase } from '@components/inputs/ButtonBase';
import MoreHorizIcon from '@icons/MoreHoriz';

const BreadcrumbCollapsedButton = styled(ButtonBase)(({ theme }) => ({
  display: 'flex',
  marginLeft: 4,
  marginRight: 4,
  backgroundColor: theme.colors.default[100],
  color: theme.colors.default[900],
  borderRadius: 2,
  '&:hover, &:focus': {
    backgroundColor: theme.colors.default[200],
    [`${theme.getColorSchemeSelector()}`]: {
      backgroundColor: theme.colors.default[800]
    }
  },
  '&:active': {
    boxShadow: theme.boxShadow[0],
    backgroundColor: theme.colors.alpha.darken(theme.colors.default[200], 0.12),
    [`${theme.getColorSchemeSelector()}`]: {
      backgroundColor: theme.colors.alpha.lighten(theme.colors.default[800], 0.12)
    }
  },
  [theme.getColorSchemeSelector()]: {
    backgroundColor: theme.colors.default[900],
    color: theme.colors.default[100],
    '&:hover, &:focus': {
      backgroundColor: theme.colors.default[800]
    },
    '&:active': {
      backgroundColor: theme.colors.alpha.lighten(theme.colors.default[800], 0.12)
    }
  }
}));

const BreadcrumbCollapsedIcon = styled(MoreHorizIcon)({
  width: 24,
  height: 16
});

const BreadcrumbCollapsed = React.forwardRef((props, ref) => {
  const { slots = {}, slotProps = {}, ...otherProps } = props;
  const ownerState = props;

  return (
    <li ref={ref}>
      <BreadcrumbCollapsedButton className='Breadcrumb-CollapsedButton' {...otherProps} ownerState={ownerState}>
        <BreadcrumbCollapsedIcon as={slots.CollapsedIcon} ownerState={ownerState} {...slotProps.collapsedIcon} />
      </BreadcrumbCollapsedButton>
    </li>
  );
});

BreadcrumbCollapsed.displayName = 'BreadcrumbCollapsed';

export default BreadcrumbCollapsed;
