import React from 'react';
import { isBrowser } from '../utils';

export const useEnhancedEffect =
  isBrowser ? React.useLayoutEffect : React.useEffect;
