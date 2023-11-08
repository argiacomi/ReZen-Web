'use client';

import React from 'react';
import styled, { extractStyling } from '@styles';
import { useSlotProps } from '@hooks';
import { Text } from '@components/typography';

export const alertTitleClasses = {
  root: 'AlertTitle-Root'
};

const AlertTitleRoot = styled(Text)(({ theme, ownerState }) => ({
  fontWeight: theme.typography.weight.medium,
  marginTop: -2,
  ...ownerState.cssStyles
}));

const AlertTitle = React.forwardRef((props, ref) => {
  const { component: componentProp = Text, slots = {}, slotProps = {}, ...otherProps } = props;

  const { cssStyles, other } = extractStyling(otherProps);

  const ownerState = { ...props, cssStyles };

  const component = componentProp || Text;
  const AlertTitleComponent = slots.root || AlertTitleRoot;
  const alertTitleRootProps = useSlotProps({
    elementType: AlertTitleComponent,
    externalSlotProps: slotProps.root,
    externalForwardedProps: other,
    additionalProps: {
      component: 'div',
      gutterBottom: true,
      ref: ref
    },
    ownerState,
    className: alertTitleClasses.root
  });

  return <AlertTitleComponent as={component} {...alertTitleRootProps} />;
});
AlertTitle.displayName = 'AlertTitle';

export default AlertTitle;
