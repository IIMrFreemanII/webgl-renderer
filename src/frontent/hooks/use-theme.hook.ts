import { useCallback, useContext } from "react";

import { SupportedThemes } from "frontent/constants/themes.constants";
import { ThemeContext, ThemeProviderStateType } from "frontent/components";
import { getRandomNumber } from "frontent/utils";

export type UseThemeReturnType = ThemeProviderStateType<SupportedThemes["name"]> & {
  setRandomTheme: VoidFunction;
};

export const useTheme = (): UseThemeReturnType => {
  const themeContext = useContext(ThemeContext);
  if (!themeContext) throw new Error("useTheme must be used within a ThemeProvider");

  const { theme, themes, setTheme } = themeContext;

  const setRandomTheme = useCallback(() => {
    const filteredThemes = themes.filter(({ name }) => name !== theme.name);

    const randomTheme = filteredThemes[getRandomNumber(0, filteredThemes.length - 1)];
    if (!randomTheme) return;

    setTheme(randomTheme.name);
  }, [theme, themes]);

  return {
    ...themeContext,
    setRandomTheme,
  } as any;
};

export default useTheme;
