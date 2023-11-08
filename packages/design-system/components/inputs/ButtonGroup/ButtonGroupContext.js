'use client';

import React from 'react';

const ButtonGroupContext = React.createContext();

if (process.env.NODE_ENV !== 'production') {
  ButtonGroupContext.displayName = 'ButtonGroupContext';
}

export default ButtonGroupContext;
