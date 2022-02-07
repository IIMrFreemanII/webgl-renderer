import React, { memo, useMemo, useRef, useState, useCallback, DependencyList } from "react";
import cn from "classnames";

import { TreeItemType } from "./tree-file-tabs.types";
import {
  createIdChain,
  calcIsNestSelected,
  calcSelectedItem,
  calcInitiallySelectedItem,
} from "./tree-file-tabs.utils";
import { TreeItem } from "./tree-item/tree-item";

import globalStyles from "frontent/assets/styles/global.module.css";
import styles from "./tree-file-tabs.module.css";

export type TreeTabsType = TreeItemType[];

export interface TreeFileTabsProps {
  treeTabs: TreeTabsType;
  className?: string;
  initiallyOpenedItem?: number[];
  disableUnselectComponent?: boolean;
  triggerInitialReCalc?: DependencyList;
  onUncheckItem?: VoidFunction;
}

export const TreeFileTabs: React.FC<TreeFileTabsProps> = memo(
  ({
    treeTabs,
    className = "",
    initiallyOpenedItem = [],
    disableUnselectComponent = false,
    triggerInitialReCalc = [],
    onUncheckItem,
  }: TreeFileTabsProps) => {
    // REF TO NOT RERENDER COMPONENT WITH SAME DATA. IT'S PASSED TO NEXT NESTED TreeItem(-s)
    const upperLevelItemsNestNames = useRef<string[]>([]);
    const treeTabsRef = useRef(treeTabs);
    treeTabsRef.current = treeTabs;

    const [selectedNestName, setSelectedNestName] = useState<string[]>([]);

    const initialNames = useMemo(
      () => calcInitiallySelectedItem(initiallyOpenedItem, treeTabsRef.current),
      triggerInitialReCalc,
    );

    const handleSelectItem = useCallback((nestedName: string[]) => {
      setSelectedNestName(nestedName);

      const selectedTreeItem = calcSelectedItem(nestedName, treeTabsRef.current);

      if (selectedTreeItem?.onClick) {
        selectedTreeItem?.onClick();
      } else {
        onUncheckItem?.();
      }
    }, []);

    const nestedNameToUse = selectedNestName.length
      ? selectedNestName
      : !!initiallyOpenedItem?.length && initialNames.length
      ? initialNames
      : [];

    return (
      <div className={cn(styles.container, className)}>
        <div className={cn(styles.treeWrapper, globalStyles.addScrollStyles)}>
          {treeTabsRef.current.map((item, i) => {
            const isNestSelected = calcIsNestSelected(nestedNameToUse, [
              createIdChain(i, item.name),
            ]);

            const selectedNames = isNestSelected ? nestedNameToUse : null;

            return (
              <TreeItem
                key={item.name + i}
                nestedNames={upperLevelItemsNestNames.current}
                level={0}
                index={i}
                selectedNames={selectedNames}
                isNestSelected={isNestSelected}
                disableUnselectComponent={disableUnselectComponent}
                item={item}
                onItemClick={handleSelectItem}
              />
            );
          })}
        </div>
      </div>
    );
  },
);

export default TreeFileTabs;
