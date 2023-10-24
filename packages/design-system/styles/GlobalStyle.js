import { createGlobalStyle } from 'styled-components';
import themeToCSSVariables from './themeToCSSVariables';
import theme from './theme';

const { cssVariables } = themeToCSSVariables(theme);

const GlobalStyle = createGlobalStyle`
  :root {
    ${Object.entries(cssVariables)
      .map(([key, value]) => `${key}: ${value};`)
      .join('\n')}
  }
`;

export default GlobalStyle;
