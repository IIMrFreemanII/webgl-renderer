import React, { memo, useRef } from "react";
import cn from "classnames";

import { CollapseSelfControlled } from "frontent/components/index";
import { Nullable } from "frontent/models";
import { isEqual } from "frontent/utils";
import { TreeItemType, TreeFolderItemContentType } from "../tree-file-tabs.types";
import { calcIsNestSelected, createIdChain } from "../tree-file-tabs.utils";

import styles from "./tree-item.module.css";

export interface TreeItemProps {
  nestedNames: string[];
  index: number;
  level: number;
  selectedNames?: Nullable<string[]>;
  isNestSelected?: boolean;
  disableUnselectComponent?: boolean;
  item: TreeItemType;
  onItemClick: (nestedName: string[]) => void;
}

export const TreeItem: React.FC<TreeItemProps> = memo(
  ({
    nestedNames,
    index,
    level,
    selectedNames,
    isNestSelected,
    disableUnselectComponent = false,
    item,
    onItemClick,
  }: TreeItemProps) => {
    const { name, description, onClick } = item;

    const nestedName = !nestedNames.length
      ? [createIdChain(index, name)]
      : nestedNames.concat(createIdChain(index, name));

    // REF TO NOT RERENDER COMPONENT WITH SAME DATA. IT'S PASSED TO NEXT NESTED TreeItem(-s)
    const nestedNameRef = useRef<string[]>(nestedName);

    if (!name) return null;

    const content: TreeFolderItemContentType = (item as any).content || [];

    const hasValidClick = !!onClick;
    const isExpandable = !!content.length;
    const isSelected = isEqual(selectedNames, nestedName);

    const handleItemClick = () => {
      if (!hasValidClick || (disableUnselectComponent && isSelected)) return;
      onItemClick(isSelected ? [] : nestedName);
    };

    const itemStyles = cn(styles.treeItem, { [styles.nested]: level > 0 }, `nest-level-${level}`);

    const itemNameStyles = cn(styles.treeItemName, {
      [styles.clickable]:
        (hasValidClick || isExpandable) && !(disableUnselectComponent && isSelected),
      [styles.selected]: isSelected,
      [styles.nestSelected]: isNestSelected,
    });

    return (
      <div className={itemStyles}>
        <CollapseSelfControlled
          triggerClassName={styles.treeItemNameWrapper}
          contentClassName={styles.treeItemContent}
          triggerElement={
            <span className={itemNameStyles} onClick={handleItemClick}>
              {name}
              &nbsp;
              {description && <span>{description}</span>}
            </span>
          }
          openDuration={150}
          hideDuration={150}
          initiallyOpened={isNestSelected}
          removeCollapseByCondition={!isExpandable}
          removeFromDOMOnClosed
        >
          {content.map((contentItem, i) => {
            const isNestSelectedToSet =
              !!selectedNames &&
              calcIsNestSelected(
                selectedNames,
                nestedName.concat(createIdChain(i, contentItem.name)),
              );

            const selectedNamesToSet = selectedNames && isNestSelectedToSet ? selectedNames : null;

            return (
              <TreeItem
                key={contentItem.name + i}
                nestedNames={nestedNameRef.current}
                level={level + 1}
                index={i}
                selectedNames={selectedNamesToSet}
                isNestSelected={isNestSelectedToSet}
                disableUnselectComponent={disableUnselectComponent}
                item={contentItem}
                onItemClick={onItemClick}
              />
            );
          })}
        </CollapseSelfControlled>
      </div>
    );
  },
);

export default TreeItem;
