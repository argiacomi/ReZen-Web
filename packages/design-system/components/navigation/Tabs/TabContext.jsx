'use client';

import React from 'react';

const Context = React.createContext(null);
if (process.env.NODE_ENV !== 'production') {
  Context.displayName = 'TabContext';
}

function useUniquePrefix() {
  const [id, setId] = React.useState(null);
  React.useEffect(() => {
    setId(`tab-p-${Math.round(Math.random() * 1e5)}`);
  }, []);
  return id;
}

export default function TabContext(props) {
  const { children, value } = props;
  const idPrefix = useUniquePrefix();

  const context = React.useMemo(() => {
    return { idPrefix, value };
  }, [idPrefix, value]);

  return <Context.Provider value={context}>{children}</Context.Provider>;
}

export function useTabContext() {
  return React.useContext(Context);
}

export function getPanelId(context, value) {
  const { idPrefix } = context;
  if (idPrefix === null) {
    return null;
  }
  return `${context.idPrefix}-P-${value}`;
}

export function getTabId(context, value) {
  const { idPrefix } = context;
  if (idPrefix === null) {
    return null;
  }
  return `${context.idPrefix}-T-${value}`;
}
