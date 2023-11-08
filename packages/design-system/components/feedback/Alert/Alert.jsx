'use client';

import React from 'react';
import styled, { extractStyling } from '@styles';
import { useSlotProps } from '@hooks';
import { IconButton } from '@components/inputs';
import { Icon as BaseIcon } from '@components/media/Icon';
import { Paper } from '@components/surfaces/Paper';
import CloseIcon from '@icons/Close';
import DangerOutlineIcon from '@icons/DangerOutline';
import InfoOutlinedIcon from '@icons/InfoOutlined';
import ReportProblemOutlinedIcon from '@icons/ReportProblemOutlined';
import SuccessOutlinedIcon from '@icons/SuccessOutlined';

export const alertClasses = {
  root: 'Alert-Root',
  action: 'Alert-Action',
  icon: 'Alert-Icon',
  message: 'Alert-Message'
};

const variantStyles = (theme, ownerState, colorProp) => {
  const color = colorProp === 'info' ? 'primary' : colorProp;

  return {
    standard: {
      color: theme.colors[color][600],
      backgroundColor: theme.colors.alpha.add(theme.colors[color][300], 0.35),
      [`& .${alertClasses.icon}`]: {
        color: theme.colors[color].body
      },
      [`${theme.getColorSchemeSelector()}`]: {
        backgroundColor: theme.colors.alpha.add(theme.colors[color][500], 0.2)
      }
    },
    outlined: {
      color: theme.colors[color][600],
      border: `1px solid ${theme.colors[color][600]}`,
      [`& .${alertClasses.icon}`]: { color: theme.colors[color].body }
    },
    filled: {
      fontWeight: theme.typography.weight.medium,
      backgroundColor: theme.colors[color].body,
      color: theme.colors[color].text,
      [theme.getColorSchemeSelector()]: {
        backgroundColor: theme.colors[color][600]
      }
    }
  }[ownerState.variant];
};

const AlertRoot = styled(Paper)(({ theme, ownerState }) => {
  const color = ownerState.color || ownerState.severity;

  return {
    ...theme.typography.body2,
    backgroundColor: 'transparent',
    display: 'flex',
    padding: `6px 16px`,
    ...(color && variantStyles(theme, ownerState, color)),
    ...ownerState.cssStyles
  };
});

const AlertIcon = styled('div')(({ theme }) => ({
  marginRight: 12,
  padding: `8px 0px`,
  display: 'flex',
  fontSize: 24,
  opacity: 0.9
}));

const AlertMessage = styled('div')(({ theme }) => ({
  padding: `8px 0px`,
  minWidth: 0,
  overflow: 'auto'
}));

const AlertAction = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  padding: `4px 0px 0px 16px`,
  marginLeft: 'auto',
  marginRight: -8
}));

const Icon = styled(BaseIcon)({
  stroke: 'currentcolor',
  fill: 'none'
});

const defaultIconMapping = {
  success: <SuccessOutlinedIcon size='inherit' />,
  warning: <ReportProblemOutlinedIcon size='inherit' />,
  danger: <DangerOutlineIcon size='inherit' />,
  info: <InfoOutlinedIcon size='inherit' />
};

const Alert = React.forwardRef((props, ref) => {
  const {
    action,
    children,
    closeText = 'Close',
    color,
    icon,
    iconMapping = defaultIconMapping,
    onClose,
    role = 'alert',
    severity = 'success',
    slots = {},
    slotProps = {},
    variant = 'standard',
    ...otherProps
  } = props;

  const { cssStyles, other } = extractStyling(otherProps);

  const ownerState = {
    ...props,
    cssStyles,
    color,
    severity,
    variant
  };

  const AlertRootComponent = slots.root ?? AlertRoot;
  const AlertCloseButton = slots.closeButton ?? IconButton;
  const AlertCloseIcon = slots.closeIcon ?? CloseIcon;

  const closeButtonProps = slotProps.closeButton;
  const closeIconProps = slotProps.closeIcon;

  const alertRootProps = useSlotProps({
    elementType: AlertRootComponent,
    externalSlotProps: slotProps.root,
    externalForwardedProps: other,
    additionalProps: {
      ref: ref
    },
    ownerState,
    className: alertClasses.root
  });

  return (
    <AlertRootComponent role={role} elevation={0} {...alertRootProps}>
      {icon !== false ? (
        <AlertIcon ownerState={ownerState} className={alertClasses.icon}>
          {icon || iconMapping[severity] || defaultIconMapping[severity]}
        </AlertIcon>
      ) : null}
      <AlertMessage ownerState={ownerState} className={alertClasses.message}>
        {children}
      </AlertMessage>
      {action != null ? (
        <AlertAction ownerState={ownerState} className={alertClasses.action}>
          {action}
        </AlertAction>
      ) : null}
      {action == null && onClose ? (
        <AlertAction ownerState={ownerState} className={alertClasses.action}>
          <AlertCloseButton
            size='small'
            aria-label={closeText}
            title={closeText}
            color='inherit'
            onClick={onClose}
            {...closeButtonProps}
          >
            <AlertCloseIcon size='small' {...closeIconProps} />
          </AlertCloseButton>
        </AlertAction>
      ) : null}
    </AlertRootComponent>
  );
});

Alert.displayName = 'Alert';

export default Alert;
