import { createGlobalStyle } from '../styleEngine';
import theme from '../theme';
import themeToCSSVariables from './themeToCSSVariables';

const { cssVariables, themeMapping } = themeToCSSVariables(theme);

const BaseGlobalStyle = createGlobalStyle`
  :root {
    --shadow-color: ${themeMapping.boxShadow.color};
    --shadow-strength: ${themeMapping.boxShadow.strength};
    ${Object.entries(cssVariables.default)
      .map(([key, value]) => `${key}: ${value};`)
      .join('\n')}
  }

  [data-theme="dark"] {
      ${Object.entries(cssVariables.dark)
        .map(([key, value]) => `${key}: ${value};`)
        .join('\n')}
    }

  body {
    font-family: ${themeMapping.typography.fontFamily};
    background-color: ${themeMapping.colors.background};
    color: ${themeMapping.colors.text.primary};
  }

`;

const GlobalStyle = (props) => {
  return <BaseGlobalStyle {...props} />;
};

export default GlobalStyle;
