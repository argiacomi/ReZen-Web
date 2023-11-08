import { createBreakpoints, getOverlappingBreakpoints, traverseBreakpoints } from './breakpointHelpers';

export const breakPoints = {
  breakpoints: {
    keys: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
    values: {
      xs: '0px',
      sm: '480px',
      md: '768px',
      lg: '1280px',
      xl: '1536px',
      '2xl': '1920px'
    },
    default: { xs: '0px' },
    step: 5,
    unit: 'px',
    create: (breakpoints = this.breakpoints) => createBreakpoints(breakpoints),
    traverse: (breakpointBase, layoutConfig, iterator) => traverseBreakpoints(breakpointBase, layoutConfig, iterator),
    overlap: (props) => getOverlappingBreakpoints(props),
    up: (key) => {
      const value = breakPoints.breakpoints.values[key];
      return `@media (min-width:${value})`;
    },
    down: (key) => {
      const value = breakPoints.breakpoints.values[key];
      return `@media (max-width:${Number.parseInt(value) - breakPoints.breakpoints.step / 100}${
        breakPoints.breakpoints.unit
      })`;
    },
    between: (start, end) => {
      const breakpointKeys =
        typeof breakPoints.breakpoints.keys === 'function'
          ? breakPoints.breakpoints.keys()
          : breakPoints.breakpoints.keys;
      const endIndex = breakpointKeys.indexOf(end);
      return breakPoints.breakpoints.up(start) + ' and ' + `${endIndex !== -1 && breakPoints.breakpoints.down(end)}`;
    },
    only: (key) => {
      const breakpointKeys =
        typeof breakPoints.breakpoints.keys === 'function'
          ? breakPoints.breakpoints.keys()
          : breakPoints.breakpoints.keys;
      if (breakpointKeys.indexOf(key) + 1 < breakpointKeys.length) {
        return breakPoints.breakpoints.between(key, breakpointKeys[breakpointKeys.indexOf(key) + 1]);
      }
      return breakPoints.breakpoints.up(key);
    },
    not: (key) => {
      const breakpointKeys =
        typeof breakPoints.breakpoints.keys === 'function'
          ? breakPoints.breakpoints.keys()
          : breakPoints.breakpoints.keys;
      const keyIndex = breakpointKeys.indexOf(key);
      if (keyIndex === 0) {
        return breakPoints.breakpoints.up(breakpointKeys[1]);
      }
      if (keyIndex === breakpointKeys.length - 1) {
        return breakPoints.breakpoints.down(breakpointKeys[keyIndex]);
      }

      return this.breakpoints
        .between(key, breakpointKeys[breakpointKeys.indexOf(key) + 1])
        .replace('@media', '@media not all and');
    }
  }
};
