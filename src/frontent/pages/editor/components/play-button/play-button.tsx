import { useCallback, useMemo, useState } from "react";

import { GameState, GameStateManager, GameLoop } from "engine";
import { useDidMount } from "frontent/hooks";
import { Button } from "frontent/components/ui/button/button";

import styles from "./play-button.module.css";

export const useGameState = () => {
  const [state, setState] = useState<GameState>("stop");
  const oppositeState = state === "play" ? "stop" : "play";

  useDidMount(() => {
    GameStateManager.addListener("stateChange", handleStateChange);
    return () => GameStateManager.removeListener("stateChange", handleStateChange);
  });

  const handleStateChange = useCallback((state: GameState) => {
    state === "play" ? GameLoop.start() : GameLoop.stop();

    setState(state);
  }, []);

  const toggleState = useCallback(() => {
    GameStateManager.setState(oppositeState);
    setState(oppositeState);
  }, [oppositeState]);

  return useMemo(
    () => ({ toggleState, state, oppositeState }),
    [toggleState, state, oppositeState],
  );
};

export const PlayButton = () => {
  const { toggleState, oppositeState } = useGameState();

  return (
    <Button className={styles.button} onClick={toggleState}>
      {oppositeState}
    </Button>
  );
};
