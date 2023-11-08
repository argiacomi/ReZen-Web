'use client';

import React from 'react';
import clsx from 'clsx';
import styled, { extractStyling, useTheme } from '@styles';
import { useSlotProps } from '@hooks';
import { capitalize } from '@utils';
import { ButtonBase } from '@components/inputs/ButtonBase';
import KeyboardArrowLeft from '@icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@icons/KeyboardArrowRight';

export const tabScrollButtonClasses = {
  root: 'TabScrollButton-Root',
  disabled: 'Disabled'
};

const TabScrollButtonRoot = styled(ButtonBase, {
  name: 'TabScrollButton',
  slot: 'Root'
})(({ ownerState }) => ({
  width: 40,
  flexShrink: 0,
  opacity: 0.8,
  [`&.${tabScrollButtonClasses.disabled}`]: {
    opacity: 0
  },
  ...(ownerState.orientation === 'vertical' && {
    width: '100%',
    height: 40,
    '& svg': {
      transform: `rotate(${ownerState.isRtl ? -90 : 90}deg)`
    }
  }),
  ...ownerState.cssStyles
}));

const TabScrollButton = React.forwardRef((props, ref) => {
  const { className, slots = {}, slotProps = {}, direction, orientation, disabled, ...otherProps } = props;

  const { cssStyles, other } = extractStyling(otherProps);

  const theme = useTheme();
  const isRtl = theme.direction === 'rtl';

  const ownerState = { ...props, cssStyles, isRtl };

  const classes = {
    root: [
      tabScrollButtonClasses.root,
      capitalize(direction === 'left' ? 'start' : 'end'),
      ownerState.disabled && tabScrollButtonClasses.disabled
    ]
  };
  const StartButtonIcon = slots.StartScrollButtonIcon ?? KeyboardArrowLeft;
  const EndButtonIcon = slots.EndScrollButtonIcon ?? KeyboardArrowRight;

  const startButtonIconProps = useSlotProps({
    elementType: StartButtonIcon,
    externalSlotProps: slotProps.startScrollButtonIcon,
    additionalProps: {
      fontSize: 'small'
    },
    ownerState
  });

  const endButtonIconProps = useSlotProps({
    elementType: EndButtonIcon,
    externalSlotProps: slotProps.endScrollButtonIcon,
    additionalProps: {
      fontSize: 'small'
    },
    ownerState
  });

  return (
    <TabScrollButtonRoot
      component='div'
      className={clsx(classes.root, className)}
      ref={ref}
      role={null}
      ownerState={ownerState}
      tabIndex={null}
      {...other}
    >
      {direction === 'left' ? <StartButtonIcon {...startButtonIconProps} /> : <EndButtonIcon {...endButtonIconProps} />}
    </TabScrollButtonRoot>
  );
});

TabScrollButton.displayName = 'TabScrollButton';

export default TabScrollButton;
