'use client';

import React from 'react';

const Tablelvl2Context = React.createContext();

if (process.env.NODE_ENV !== 'production') {
  Tablelvl2Context.displayName = 'Tablelvl2Context';
}

export default Tablelvl2Context;

export const useTablelvl2Context = () => {
  return React.useContext(Tablelvl2Context);
};
