import React, { memo, useState, useEffect, useCallback } from "react";

import { World, WorldsManager } from "engine";
import { Grid } from "frontent/components";
import { Hierarchy, Inspector } from "frontent/pages";
import { Canvas } from "./components/canvas";

export const useWorlds = () => {
  const [worlds, setWorlds] = useState<World[]>([WorldsManager.defaultWorld]);

  const handleWorldUpdate = useCallback((worlds: World[]) => {
    setWorlds([...worlds]);
  }, []);

  useEffect(() => {
    WorldsManager.addListener("onWorldsUpdate", handleWorldUpdate);
    return () => WorldsManager.removeListener("onWorldsUpdate", handleWorldUpdate);
  }, []);

  return worlds;
};

export interface EditorProps {}

export const Editor: React.FC<EditorProps> = memo(() => {
  const worlds = useWorlds();

  // TODO: this is hardcoded positioning, add ability to drag'n'drop grid items
  const [gridData, _setGridData] = useState([
    { x: 0, y: 0, w: 12, h: 0.5 }, // header

    { x: 0, y: 0.5, w: 3, h: 8.5 }, // hierarchy
    { x: 3, y: 0.5, w: 6, h: 8.5 }, // canvas
    { x: 9, y: 0.5, w: 3, h: 8.5 }, // inspector

    { x: 0, y: 9, w: 12, h: 3 }, // footer
  ]);

  const gridContentMap = [
    <div>header</div>,

    <Hierarchy worlds={worlds} />,
    <Canvas />,
    <Inspector />,

    <div>footer</div>,
  ];

  const handleRenderItem = useCallback(
    (index: number) => {
      return gridContentMap[index];
    },
    [gridContentMap],
  );

  return <Grid data={gridData} onItemRender={handleRenderItem} />;
});

export default Editor;
