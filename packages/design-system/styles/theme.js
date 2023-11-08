import { animations, breakPoints, colors, shadows, typography } from './themeHelpers';

const theme = {
  getColorSchemeSelector: (colorScheme = '') => {
    if (colorScheme === '') {
      return '[data-theme=dark] &';
    }
    return `[data-theme=${colorScheme}] &`;
  },
  defaultSpacing: '0.5rem',
  spacing: (...spaces) => spaces.map((space) => `calc(${theme.defaultSpacing} * ${space})`).join(' '),
  pxToRem: (...px) => {
    return px
      .map((value) => {
        let int;
        if (typeof value === 'string') int = px.match(/(\d+)px/);
        if (typeof value === 'string') {
          return `${int(int.group(1)) / 16}rem`;
        }
        return `${value / 16}rem`;
      })
      .join(' ');
  },
  ...animations,
  ...breakPoints,
  ...colors,
  ...shadows,
  ...typography,
  rounded: {
    none: '0px',
    sm: '0.125rem',
    base: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    '3xl': '1.5rem',
    full: '9999px',
    arrowInnerRadius: '0.125rem',
    arrowOuterRadius: '0.25rem'
  },
  zIndex: {
    mobileStepper: 1000,
    fab: 1050,
    speedDial: 1050,
    appBar: 1100,
    drawer: 1200,
    modal: 1300,
    snackbar: 1400,
    tooltip: 1500
  }
};

export default theme;
