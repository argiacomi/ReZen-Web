'use client';

import React from 'react';
import { useEnhancedEffect } from './useEnhancedEffect';

export function useEventCallback(fn) {
  const ref = React.useRef(fn);
  useEnhancedEffect(() => {
    ref.current = fn;
  });
  return React.useRef((...args) => ref.current(...args)).current;
}
