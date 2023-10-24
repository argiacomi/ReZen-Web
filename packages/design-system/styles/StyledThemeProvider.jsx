import { ThemeProvider } from 'styled-components';
import GlobalStyle from './GlobalStyle';
import themeToCSSVariables from './themeToCSSVariables';
import theme from './theme';

const { themeMapping } = themeToCSSVariables(theme);

console.log(themeMapping);

const StyledThemeProvider = ({ children }) => {
  return (
    <ThemeProvider theme={themeMapping}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
};

export default StyledThemeProvider;
