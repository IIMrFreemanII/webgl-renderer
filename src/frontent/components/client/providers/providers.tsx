import React, { memo } from "react";

import { ThemeProvider } from "frontent/components";
import { lightTheme, darkTheme } from "frontent/constants/themes.constants";

export interface ProvidersProps {
  children: React.ReactNode;
}

const themes = [lightTheme, darkTheme];

export const Providers: React.FC<ProvidersProps> = memo(({ children }: ProvidersProps) => (
  <React.StrictMode>
    <ThemeProvider themes={themes} initialTheme={themes[0]}>
      {children}
    </ThemeProvider>
  </React.StrictMode>
));

export default Providers;
