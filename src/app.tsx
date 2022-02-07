import React, { memo } from "react";

import { GameLoop } from "./engine";
import { Editor } from "./frontent/pages";
import { useDidMount } from "./frontent/hooks";

import styles from "frontent/assets/styles/app.module.css";
import wait from "fork-ts-checker-webpack-plugin/lib/utils/async/wait";

export const App = memo(() => {
  // useDidMount(async () => {
  //   await wait(0);
  //
  //   GameLoop.init();
  //   GameLoop.start();
  // });

  return (
    <div className={styles.app}>
      <Editor />
    </div>
  );
});
