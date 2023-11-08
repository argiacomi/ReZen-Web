'use client';

import React from 'react';
import { isBrowser } from '../utils';

export const useEnhancedEffect = typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;
