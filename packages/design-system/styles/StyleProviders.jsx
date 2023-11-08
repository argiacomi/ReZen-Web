'use client';

import { StyleSheetManager } from 'styled-components';
import { ThemeProvider } from './styleEngine';
import { CssBaseline, GlobalStyle, themeToCSSVariables } from './styleLib';
import theme from './theme';

const { themeMapping } = themeToCSSVariables(theme);

const StyleProviders = ({ children }) => {
  return (
    <>
      <CssBaseline />
      <GlobalStyle />
      <ThemeProvider theme={themeMapping}>{children}</ThemeProvider>
    </>
  );
};

export default StyleProviders;
