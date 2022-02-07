import React, { memo, useState, useCallback } from "react";
import cn from "classnames";

import { Entity } from "engine/ecs/entity";
import { EntitySelection } from "engine/entity-selection";
import { useDidMount } from "frontent/hooks";
import { InspectorComponent } from "./components/inspector-component";

import globalStyles from "frontent/assets/styles/global.module.css";
import styles from "./inspector.module.css";

export interface InspectorProps {
  className?: string;
}

export const Inspector: React.FC<InspectorProps> = memo(({ className = "" }: InspectorProps) => {
  const [inspectedEntity, setInspectedEntity] = useState<Entity | null>(null);

  const handleSelect = useCallback((entity: Entity | null) => {
    entity?.addObserveComponents();
    setInspectedEntity((prev) => {
      prev?.removeObserveComponents();
      return entity;
    });
  }, []);

  useDidMount(() => {
    EntitySelection.addListener("select", handleSelect);
    return () => EntitySelection.removeListener("select", handleSelect);
  });

  return (
    <div className={cn(styles.container, className)}>
      <div className={styles.header}>Inspector</div>
      {inspectedEntity && (
        <div className={cn(styles.contentWrapper, globalStyles.addScrollStyles)}>
          <div>Entity {inspectedEntity.id}</div>
          {inspectedEntity.components.map((component, i) => (
            <InspectorComponent key={i} component={component as any} />
          ))}
        </div>
      )}
    </div>
  );
});

export default Inspector;
