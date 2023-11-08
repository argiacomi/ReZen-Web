'use client';

import React from 'react';

const DialogContext = React.createContext({});

if (process.env.NODE_ENV !== 'production') {
  DialogContext.displayName = 'DialogContext';
}

export default DialogContext;

export function useDialogContext() {
  return React.useContext(DialogContext);
}
