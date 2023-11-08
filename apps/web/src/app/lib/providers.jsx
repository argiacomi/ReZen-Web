'use client';

import { StyledProviders } from 'design-system';
import { ThemeProvider } from 'next-themes';
import StyledComponentsRegistry from './registry';

export default function Providers({ children }) {
  return (
    <html>
      <body>
        <StyledComponentsRegistry>
          <ThemeProvider>
            <StyledProviders>{children}</StyledProviders>
          </ThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
