'use client';

import React from 'react';

const RadioGroupContext = React.createContext(undefined);

if (process.env.NODE_ENV !== 'production') {
  RadioGroupContext.displayName = 'RadioGroupContext';
}

export default RadioGroupContext;

export function useRadioGroup() {
  return React.useContext(RadioGroupContext);
}
