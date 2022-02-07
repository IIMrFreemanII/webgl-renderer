import React from "react";

export type ThemeProviderStateType<T extends string = string> = {
  theme: ThemeType;
  themes: ThemeType[];
  setTheme: React.Dispatch<React.SetStateAction<T>>;
};

export type ThemeType<T extends string = string> = {
  name: T;
  importCallback: () => Promise<string>;
  className: string;
};

export type ThemeProviderContext = ThemeProviderStateType;

export type ThemeProviderReactContext = React.Context<ThemeProviderContext>;
