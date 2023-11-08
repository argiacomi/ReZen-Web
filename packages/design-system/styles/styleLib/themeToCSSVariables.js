import Color from 'color';

/**
 * Converts a nested theme object to a flat CSS variables object.
 * @param {Object} obj - The theme object.
 * @param {Array} [prefix=[]] - The prefix array for CSS variable names, representing the nesting level.
 * @param {Object} [cssVars={}] - An object to collect the CSS variables, passed through recursive calls.
 * @returns {Object} The CSS variables object.
 */
const themeToCssVars = (obj, prefix = [], cssVars = { default: {}, dark: {} }, inDarkMode = false) => {
  if (Array.isArray(obj)) {
    obj.forEach((item, index) => {
      themeToCssVars(item, prefix.concat(`${index}`), cssVars, inDarkMode);
    });
  } else if (typeof obj === 'object') {
    Object.entries(obj).forEach(([key, value]) => {
      if (key === 'keyframe' || key === 'duration' || key.includes('arrow')) {
        return;
      }
      if (key === 'dark') {
        themeToCssVars(value, prefix, cssVars, true);
      } else if (key === 'light') {
        themeToCssVars(value, prefix, cssVars, false);
      } else {
        themeToCssVars(value, prefix.concat(key), cssVars, inDarkMode);
      }
    });
  } else if (['string', 'number', 'boolean'].includes(typeof obj)) {
    const cssVarKey = `--${prefix.filter(Boolean).join('-')}`;
    const channelKey = `--${prefix.concat('channel').filter(Boolean).join('-')}`;

    if (prefix.includes('colors') && typeof obj === 'string') {
      const channelArray = Color(obj).rgb().array();
      if (inDarkMode) {
        cssVars.dark[channelKey] = `${channelArray[0]}, ${channelArray[1]}, ${channelArray[2]}`;
      } else {
        cssVars.default[channelKey] = `${channelArray[0]}, ${channelArray[1]}, ${channelArray[2]}`;
      }
    }

    if (inDarkMode) {
      cssVars.dark[cssVarKey] = obj;
    } else {
      cssVars.default[cssVarKey] = obj;
    }
  }

  return cssVars;
};

/**
 * Maps a theme object to its CSS variable references.
 * @param {Object} obj - The theme object.
 * @param {string} prefix - The prefix for CSS variable names.
 * @returns {Object} The theme mapping object.
 */
const themeToCssVarsMapping = (obj, prefix = [], themeKey) => {
  const cssVarsTheme = Array.isArray(obj) ? [] : {};

  if (Array.isArray(obj)) {
    return obj;
  } else if (typeof obj === 'object') {
    Object.entries(obj).forEach(([key, value]) => {
      if (key === 'keyframe' || key === 'duration' || key.includes('arrow')) {
        cssVarsTheme[key] = value;
        return;
      }
      if (key === 'light' || key === 'dark') {
        Object.entries(value).forEach(([nestedKey, nestedValue]) => {
          cssVarsTheme[nestedKey] = themeToCssVarsMapping(nestedValue, prefix.concat(nestedKey), nestedKey);
        });
      } else {
        cssVarsTheme[key] = themeToCssVarsMapping(value, prefix.concat(key), key);
      }
    });
  } else if (['string', 'number', 'boolean'].includes(typeof obj)) {
    const cssVarKey = `var(--${prefix.filter(Boolean).join('-')})`;
    return cssVarKey;
  } else {
    return obj;
  }

  return cssVarsTheme;
};

/**
 * Converts a theme object to a CSS variables object and a theme mapping object.
 * @param {Object} theme - The theme object.
 * @returns {Object} An object containing the CSS variables and theme mapping.
 */
const themeToCSSVariables = (theme, options = {}) => {
  const { variablePrefix = '', defaultThemeKey = '' } = options;
  const prefix = [variablePrefix].concat(`${defaultThemeKey}`);

  if (!theme) {
    return '';
  }

  const cssVariables = themeToCssVars(theme, prefix);
  const themeMapping = themeToCssVarsMapping(theme, prefix);

  return { cssVariables, themeMapping };
};

export default themeToCSSVariables;
