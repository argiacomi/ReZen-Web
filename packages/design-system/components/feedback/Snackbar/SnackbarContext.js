'use client';

import React from 'react';

export const SnackbarContext = React.createContext({});

if (process.env.NODE_ENV !== 'production') {
  SnackbarContext.displayName = 'SnackbarContext';
}

SnackbarContext;

export const useSnackbarQueue = () => React.useContext(SnackbarContext);
