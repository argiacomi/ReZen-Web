import Color from 'color';

const defaultColors = {
  white: '#f8f9fa',
  black: '#0f0f0f',
  contrastThreshold: 3,
  tonalOffset: 0.2
};

const createVariableColors = (colors) => {
  return {
    light: {
      background: colors.white,
      action: {
        active: 'rgba(0, 0, 0, 0.54)',
        hover: 'rgba(60, 64, 67, 0.08)',
        hoverOpacity: 0.1,
        selected: 'rgba(0, 0, 0, 0.08)',
        selectedOpacity: 0.08,
        focus: 'rgba(0, 0, 0, 0.12)',
        focusOpacity: 0.12,
        activatedOpacity: 0.12
      },
      disabled: {
        background: 'rgba(0, 0, 0, 0.12)',
        body: '#cdcdcd',
        text: '#8f8f8f',
        opacity: 0.38
      },
      divider: 'rgba(175, 175, 175)',
      text: {
        primary: 'rgba(0, 0, 0, 0.89)',
        secondary: 'rgba(0, 0, 0, 0.6)'
      },
      monochrome: {
        body: colors.black,
        text: colors.white,
        50: '#2d2d2d',
        100: '#282828',
        200: '#232323',
        300: '#1e1e1e',
        400: '#191919',
        500: '#141414',
        600: '#0f0f0f',
        700: '#0a0a0a',
        800: '#050505',
        900: '#000000'
      }
    },
    dark: {
      background: '#222426',
      action: {
        active: '#ffffff',
        hover: 'rgba(255, 255, 255, 0.08)',
        hoverOpacity: 0.24,
        selected: 'rgba(255, 255, 255, 0.16)',
        selectedOpacity: 0.16,
        focus: 'rgba(255, 255, 255, 0.12)',
        focusOpacity: 0.12,
        activatedOpacity: 0.24
      },
      disabled: {
        body: 'rgba(255, 255, 255, 0.25)',
        text: '#616161',
        opacity: 0.38
      },
      divider: 'rgba(97, 97, 97)',
      text: {
        primary: 'rgba(255, 255, 255)',
        secondary: 'rgba(255, 255, 255, 0.7)'
      },
      monochrome: {
        body: colors.white,
        text: colors.black,
        50: '#ffffff',
        100: '#fafafa',
        200: '#f0f0f0',
        300: '#e6e6e6',
        400: '#e1e1e1',
        500: '#dcdcdc',
        600: '#d7d7d7',
        700: '#d2d2d2',
        800: '#cdcdcd',
        900: '#C8C8C8'
      }
    }
  };
};

const createThemeColors = (colors) => {
  return {
    white: '#f8f9fa',
    black: '#0f0f0f',
    contrastThreshold: 3,
    tonalOffset: 0.2,
    primary: {
      light: {
        body: '#412dee',
        text: colors.white
      },
      dark: {
        body: 'rgb(26, 188, 254)'
      },
      50: '#eae9ff',
      100: '#cbc7ff',
      200: '#a6a2ff',
      300: '#7f7dff',
      400: '#615cff',
      500: '#4538fa',
      600: '#412dee',
      700: '#381de1',
      800: '#3001d6',
      900: '#2a00bd'
    },
    secondary: {
      light: {
        body: '#8b00f3',
        text: colors.white
      },
      dark: {
        body: '#b35cff'
      },
      50: '#f3e4ff',
      100: '#e0bbfe',
      200: '#ca8dfe',
      300: '#b35cff',
      400: '#a02fff',
      500: '#8b00f3',
      600: '#7600ee',
      700: '#5406e6',
      800: '#2c0ede',
      900: '#0016d1'
    },
    tertiary: {
      light: {
        body: '#f24f1e',
        text: colors.white
      },
      dark: {
        body: '#fd6f43'
      },
      50: '#fbe9e7',
      100: '#feccbc',
      200: '#feaa91',
      300: '#fd8965',
      400: '#fd6f43',
      500: '#fd5522',
      600: '#f24f1e',
      700: '#e44919',
      800: '#d64215',
      900: '#bd350c'
    },
    success: {
      light: {
        body: '#00c56c',
        text: colors.white
      },
      dark: {
        body: '#00c56c'
      },
      50: '#e4f8ed',
      100: '#beeed3',
      200: '#91e3b8',
      300: '#59d99a',
      400: '#0acf83',
      500: '#00c56c',
      600: '#00b561',
      700: '#00a254',
      800: '#009147',
      900: '#007032'
    },
    warning: {
      light: {
        body: '#f3d127',
        text: colors.white
      },
      dark: {
        body: '#f5e74e',
        text: colors.black
      },
      50: '#fefce6',
      100: '#fcf7c1',
      200: '#faf198',
      300: '#f7ec6f',
      400: '#f5e74e',
      500: '#f2e22a',
      600: '#f3d127',
      700: '#f2b91e',
      800: '#f0a114',
      900: '#ed7801'
    },
    danger: {
      light: {
        body: '#fd380e',
        text: colors.white
      },
      dark: {
        body: '#ff5034'
      },
      50: '#ffebec',
      100: '#ffcdcd',
      200: '#ff9b8f',
      300: '#ff7262',
      400: '#ff5034',
      500: '#ff4405',
      600: '#fd380e',
      700: '#eb2c09',
      800: '#dd2400',
      900: '#cd1800'
    },
    default: {
      light: {
        body: '#757575',
        text: colors.white
      },
      dark: {
        body: '#bdbdbd',
        text: colors.black
      },
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#eeeeee',
      300: '#e0e0e0',
      400: '#bdbdbd',
      500: '#9e9e9e',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121'
    }
  };
};

const colorsAlpha = {
  alpha: {
    overlay: (elevation = 0) => {
      const alphaValue = 4.5 * Math.log(elevation + 1) + 2;
      return (alphaValue / 100).toFixed(2);
    },
    add: (color = '', alpha = 0.05) => {
      if (color.startsWith('#') || color.startsWith('rgb')) {
        const colorObj = Color(color)?.alpha(alpha) || '';
        return colorObj.string();
      } else if (color.startsWith('var')) {
        return `rgba(${color.slice(0, -1)}-channel), ${alpha})`;
      } else {
        return color;
      }
    },
    lighten: (color, coefficient = 0.15) => {
      if (color.startsWith('#') || color.startsWith('rgb')) {
        const colorObj = Color(color)?.lighten(coefficient);
        return colorObj.string();
      } else if (color.startsWith('var')) {
        if (parseFloat(color.slice(color.length - 4, -1))) {
          return `${color.slice(0, color.length - 5)}-${Math.max(
            Math.round((parseFloat(color.slice(color.length - 4, -1)) * (1 - coefficient)) / 100) * 100,
            50
          )})`;
        } else {
          return `hsl(from ${color} h s calc(l * ${1 + coefficient}))`;
        }
      } else {
        return color;
      }
    },
    darken: (color, coefficient = 0.15) => {
      if (typeof color === 'string') {
        if (color.startsWith('#') || color.startsWith('rgb')) {
          const colorObj = Color(color)?.darken(coefficient);
          return colorObj.string();
        } else if (color.startsWith('var')) {
          if (parseFloat(color.slice(color.length - 4, -1))) {
            return `${color.slice(0, color.length - 5)}-${Math.min(
              Math.round((parseFloat(color.slice(color.length - 4, -1)) * (1 + coefficient)) / 100) * 100,
              900
            )})`;
          } else {
            return `hsl(from ${color} h s calc(l * ${1 - coefficient}))`;
          }
        } else {
          return color;
        }
      } else if (typeof color === 'object') {
        const newColor = {};
        for (const [key, value] of Object.entries(color)) {
          newColor[key] = colorsAlpha.alpha.darken(value, coefficient);
        }
        return newColor;
      }
    },
    emphasize: (color, coefficient = 0.15) => {
      const colorObj = Color(color).isLight() ? Color(color).darken(coefficient) : Color(color).lighten(coefficient);
      return colorObj.string();
    },
    contrastText: (color) => {
      return Color(color).contrast(Color('rgba(0, 0, 0, 0.89)')) >= 3 ? 'rgba(0, 0, 0, 0.89)' : 'rgba(252, 252, 252,)';
    },
    getColorFromPath: (obj, path) => {
      if (typeof path === 'string') {
        const parts = path.split('.');
        let currentPart = obj.colors;

        for (const part of parts) {
          if (currentPart[part] !== undefined) {
            currentPart = currentPart[part];
          } else {
            return undefined;
          }
        }

        if (typeof currentPart === 'object') {
          return currentPart[500];
        }

        return currentPart;
      } else if (typeof path === 'function') {
        return path(obj);
      }
    }
  }
};

export const colors = {
  colors: {
    ...defaultColors,
    ...createVariableColors(defaultColors),
    ...createThemeColors(defaultColors),
    ...colorsAlpha
  }
};
