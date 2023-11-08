'use client';

import React from 'react';

const TableContext = React.createContext();

if (process.env.NODE_ENV !== 'production') {
  TableContext.displayName = 'TableContext';
}

export default TableContext;

export const useTableContext = () => {
  return React.useContext(TableContext);
};
