import { useTheme } from './styleEngine';
import { cssProperties } from './styleLib';

//--- Styling Extraction Helper Functions ---//
function checkOverlap(arr1, arr2) {
  return arr1.some((item) => arr2.includes(item));
}

function isObject(value) {
  return typeof value === 'object' && value !== null;
}

function widthTransform(value, theme) {
  if (typeof value === 'string') {
    return value.search('rem') ? value : theme.pxToRem(value);
  } else if (typeof value === 'number') {
    return theme.spacing(value / 8);
  } else {
    return value;
  }
}

function sizeTransform(value) {
  if (typeof value === 'number') {
    return value <= 1 && value !== 0 ? `${value * 100}%` : value;
  } else if (typeof value === 'string') {
    return value;
  }
}

function getCustomSpacing(key, style, theme) {
  let updatedStyleObject = {};

  cssProperties.customSpacing[key].forEach((cssProperty) => {
    updatedStyleObject[cssProperty] = typeof style === 'string' ? style : theme.spacing(style);
  });

  return updatedStyleObject;
}

function getBorderStyle(value, theme) {
  if (typeof value === 'number') {
    return `${value}px solid currentColor`;
  }

  if (typeof value === 'string') {
    const parts = value.split(' ');

    switch (parts.length) {
      case 1:
        return `${parts[0]} solid currentColor`;
      case 2:
        return `${parts[0]} ${parts[1]} currentColor`;
      case 3:
        return `${parts[0]} ${parts[1]} ${theme.colors.alpha.getColorFromPath(theme, parts[2]) || parts[2]}`;
      default:
        return value;
    }
  }

  return value;
}

//--- Styling Extractor Utility ---//
export const extractStyling = (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const theme = useTheme();
  let sxStyles = {};
  let cssStyles = {};
  const other = {};

  for (const [key, value] of Object.entries(props)) {
    switch (true) {
      case key === 'sx':
        let newValue = value;
        if (typeof value === 'function') {
          newValue = value({ theme });
        }
        sxStyles = extractStyling(newValue);
        cssStyles = { ...sxStyles.cssStyles, ...cssStyles };
        break;
      case isObject(value) && checkOverlap(Object.keys(value), theme.breakpoints.keys):
        // eslint-disable-next-line no-case-declarations
        let breakpointObj = value;
        for (let breakpointKey in breakpointObj) {
          if (!cssStyles[`${theme.breakpoints.up(breakpointKey)}`]) {
            cssStyles[`${theme.breakpoints.up(breakpointKey)}`] = {};
          }
          cssStyles[`${theme.breakpoints.up(breakpointKey)}`][key] = breakpointObj[breakpointKey];
        }
        break;
      case key === 'fontSize':
        cssStyles[key] = theme.typography.size[value] || value;
        break;
      case key === 'fontWeight':
        cssStyles[key] = theme.typography.weight[value] || value;
        break;
      case cssProperties.color.includes(key):
        cssStyles[key] = theme.colors.alpha.getColorFromPath(theme, value) || value;
        break;
      case cssProperties.border.includes(key):
        cssStyles[key] = getBorderStyle(value, theme);
        break;
      case cssProperties.borderRadius.includes(key):
        cssStyles[key] = theme.rounded[value] || value;
        break;
      case cssProperties.sizing.includes(key):
        cssStyles[key] = sizeTransform(value);
        break;
      case cssProperties.spacing.includes(key):
        cssStyles[key] = typeof value === 'string' ? value : theme.spacing(value);
        break;
      case Object.keys(cssProperties.customColor).includes(key):
        cssStyles[cssProperties.customColor[key]] = theme.colors.alpha.getColorFromPath(theme, value) || value;
        break;
      case Object.keys(cssProperties.customSpacing).includes(key):
        cssStyles = { ...cssStyles, ...getCustomSpacing(key, value, theme) };
        break;
      case cssProperties.special.some((char) => key.includes(char)):
        if (typeof value === 'object') {
          sxStyles = extractStyling(value);
          cssStyles[key] = sxStyles.cssStyles;
          break;
        } else if (['string', 'number', 'boolean'].includes(typeof obj)) {
          cssStyles[key] = value;
          break;
        }
        break;
      case cssProperties.other.includes(key):
        cssStyles[key] = value;
        break;
      default:
        other[key] = value;
    }
  }

  return { cssStyles, other };
};
