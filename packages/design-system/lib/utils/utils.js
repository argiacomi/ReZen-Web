'use client';

import React from 'react';

//--- Document and Window Utilities ---//

export const isBrowser = typeof window !== 'undefined';

export function ownerDocument(node) {
  return (node && node.ownerDocument) || document;
}

export function ownerWindow(node) {
  const doc = ownerDocument(node);
  return doc.defaultView || window;
}

export const visuallyHidden = {
  border: 0,
  clip: 'rect(0 0 0 0)',
  height: '1px',
  margin: -1,
  overflow: 'hidden',
  padding: 0,
  position: 'absolute',
  whiteSpace: 'nowrap',
  width: '1px'
};

//--- Function Utilities ---//

export function createChainedFunction(funcs, id) {
  return funcs.reduce(
    (acc, func) => {
      if (func === null || func === undefined) {
        return acc;
      }

      return function chainedFunction(...args) {
        if (id && args.indexOf(id) === -1) {
          args.push(id);
        }
        acc.apply(this, args);
        func.apply(this, args);
      };
    },
    () => {}
  );
}

export function debounce(func, wait = 166) {
  let timeout;
  function debounced(...args) {
    const later = () => {
      func.apply(this, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  }
  debounced.clear = () => {
    clearTimeout(timeout);
  };
  return debounced;
}

//--- Scrolling and Size Utilities ---//

export const reflow = (node) => node.scrollTop;

export function getScrollbarSize(doc) {
  const documentWidth = doc.documentElement.clientWidth;
  return Math.abs(window.innerWidth - documentWidth);
}

let cachedType;

export function detectScrollType() {
  if (cachedType) {
    return cachedType;
  }

  const dummy = document.createElement('div');
  const container = document.createElement('div');
  container.style.width = '10px';
  container.style.height = '1px';
  dummy.appendChild(container);
  dummy.dir = 'rtl';
  dummy.style.fontSize = '14px';
  dummy.style.width = '4px';
  dummy.style.height = '1px';
  dummy.style.position = 'absolute';
  dummy.style.top = '-1000px';
  dummy.style.overflow = 'scroll';

  document.body.appendChild(dummy);

  cachedType = 'reverse';

  if (dummy.scrollLeft > 0) {
    cachedType = 'default';
  } else {
    dummy.scrollLeft = 1;
    if (dummy.scrollLeft === 0) {
      cachedType = 'negative';
    }
  }

  document.body.removeChild(dummy);
  return cachedType;
}

export function getNormalizedScrollLeft(element, direction) {
  const scrollLeft = element.scrollLeft;

  if (direction !== 'rtl') {
    return scrollLeft;
  }

  const type = detectScrollType();

  switch (type) {
    case 'negative':
      return element.scrollWidth - element.clientWidth + scrollLeft;
    case 'reverse':
      return element.scrollWidth - element.clientWidth - scrollLeft;
    default:
      return scrollLeft;
  }
}

//--- Comparison Utilities ---//

export function areArraysEqual(array1, array2, itemComparer) {
  return array1.length === array2.length && array1.every((value, index) => itemComparer(value, array2[index]));
}

export function areEqualValues(a, b) {
  if (typeof b === 'object' && b !== null) {
    return a === b;
  }

  // The value could be a number, the DOM will stringify it anyway.
  return String(a) === String(b);
}

//--- Input Utilities ---//

export function hasValue(value) {
  return value != null && !(Array.isArray(value) && value.length === 0);
}

export function isFilled(obj, SSR = false) {
  return (
    obj && ((hasValue(obj.value) && obj.value !== '') || (SSR && hasValue(obj.defaultValue) && obj.defaultValue !== ''))
  );
}

export function isAdornedStart(obj) {
  return obj.startAdornment;
}

export function isElement(element, names) {
  return React.isValidElement(element) && names.indexOf(element.type.displayName) !== -1;
}

//--- ClassName Utility ---//
export function capitalize(string) {
  if (typeof string !== 'string') {
    throw new Error('`capitalize(string)` expects a string argument.');
  }

  return string.charAt(0).toUpperCase() + string.slice(1);
}

//--- Formatting and Calculation Utilities ---//

// Calculates a duration based on a provided height value (in pixels), useful for transitions involving height changes.
export function getAutoHeightDuration(timeout, wrapperSize) {
  if (timeout !== 'auto' || !wrapperSize) {
    return 0;
  }
  return Math.round((4 + 15 * (wrapperSize / 36) ** 0.25 + wrapperSize / 36 / 5) * 10);
}

function easeInOutSin(time) {
  return (1 + Math.sin(Math.PI * time - Math.PI / 2)) / 2;
}

//--- Animation Execution Utilities  ---//

export function animate(property, element, to, options = {}, cb = () => {}) {
  const { ease = easeInOutSin, duration = 300 } = options;

  let start = null;
  const from = element[property];
  let cancelled = false;

  const cancel = () => {
    cancelled = true;
  };

  const step = (timestamp) => {
    if (cancelled) {
      cb(new Error('Animation cancelled'));
      return;
    }

    if (start === null) {
      start = timestamp;
    }
    const time = Math.min(1, (timestamp - start) / duration);

    element[property] = ease(time) * (to - from) + from;

    if (time >= 1) {
      requestAnimationFrame(() => {
        cb(null);
      });
      return;
    }

    requestAnimationFrame(step);
  };

  if (from === to) {
    cb(new Error('Element already at target position'));
    return cancel;
  }

  requestAnimationFrame(step);
  return cancel;
}
