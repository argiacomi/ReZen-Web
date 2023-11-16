'use client';

import React from 'react';

const Context = React.createContext(null);
if (process.env.NODE_ENV !== 'production') {
  Context.displayName = 'ListContext';
}

function useUniquePrefix() {
  const [id, setId] = React.useState(null);
  React.useEffect(() => {
    setId(`list-${Math.round(Math.random() * 1e5)}`);
  }, []);
  return id;
}

export default function ListContext(props) {
  const { children, value } = props;
  const idPrefix = useUniquePrefix();

  const context = React.useMemo(() => {
    if (!(typeof value === 'object')) {
      return { idPrefix, value };
    }
    return { idPrefix, ...value };
  }, [idPrefix, value]);

  return <Context.Provider value={context}>{children}</Context.Provider>;
}

export function useListContext() {
  return React.useContext(Context);
}

export function getItemId(context, value) {
  const { idPrefix } = context;
  if (idPrefix === null) {
    return null;
  }
  return `${context.idPrefix}-I-${value}`;
}
