/**
 * Converts a nested theme object to a flat CSS variables object.
 * @param {Object} obj - The theme object.
 * @param {string} prefix - The prefix for CSS variable names.
 * @returns {Object} The CSS variables object.
 */
const themeToCssVars = (obj, prefix = '') => {
  const cssVars = {};
  for (const key in obj) {
    const newPrefix = prefix ? `${prefix}-${key}` : key;
    const cssVarKey = `--${newPrefix}`;
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      Object.assign(cssVars, themeToCssVars(obj[key], newPrefix));
    } else {
      cssVars[cssVarKey] = obj[key];
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
const themeToCssVarsMapping = (obj, prefix = '') => {
  const themeMapping = Array.isArray(obj) ? [] : {};
  for (const key in obj) {
    const cssVarKey = `${prefix}-${key}`.replace(/^-/, '');
    themeMapping[key] =
      obj[key] && typeof obj[key] === 'object'
        ? themeToCssVarsMapping(obj[key], cssVarKey)
        : `var(--${cssVarKey})`;
  }
  return themeMapping;
};

/**
 * Converts a theme object to a CSS variables object and a theme mapping object.
 * @param {Object} theme - The theme object.
 * @returns {Object} An object containing the CSS variables and theme mapping.
 */
const themeToCSSVariables = (theme, prefix = '') => {
  const cssVariables = themeToCssVars(theme, prefix);
  const themeMapping = themeToCssVarsMapping(theme, prefix);
  console.log(cssVariables);
  console.log(themeMapping);
  return { cssVariables, themeMapping };
};

export default themeToCSSVariables;
