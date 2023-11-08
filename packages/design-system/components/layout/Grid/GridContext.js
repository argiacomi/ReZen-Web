'use client';

import React from 'react';

const GridContext = React.createContext();

if (process.env.NODE_ENV !== 'production') {
  GridContext.displayName = 'GridContext';
}

export default GridContext;
