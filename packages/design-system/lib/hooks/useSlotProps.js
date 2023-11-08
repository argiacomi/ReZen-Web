'use client';

import { appendOwnerState, mergeSlotProps, resolveComponentProps } from '../utils';
import { useForkRef } from './useForkRef';

export function useSlotProps(parameters) {
  const { elementType, externalSlotProps, ownerState, ...rest } = parameters;

  const resolvedComponentsProps = resolveComponentProps(externalSlotProps, ownerState);

  const { props: mergedProps, internalRef } = mergeSlotProps({
    ...rest,
    externalSlotProps: resolvedComponentsProps
  });

  const ref = useForkRef(internalRef, resolvedComponentsProps?.ref, parameters.additionalProps?.ref);

  const props = appendOwnerState(
    elementType,
    {
      ...mergedProps,
      ref
    },
    ownerState
  );

  return props;
}
