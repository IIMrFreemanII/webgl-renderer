import React from "react";

import { ThemeProviderReactContext } from "./theme-provider.types";

export const themeLocalStorageKey = "theme";

// null to have thrown error in case developer forgot to wrap application with provider
export const ThemeContext: ThemeProviderReactContext = React.createContext(null as any);
