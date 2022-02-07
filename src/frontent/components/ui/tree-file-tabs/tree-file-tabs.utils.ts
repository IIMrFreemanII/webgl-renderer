import { isEqual, isFiniteZeroPositive } from "frontent/utils";
import { CHAIN_CODE_NAME } from "./tree-file-tabs.constants";
import { TreeItemType } from "./tree-file-tabs.types";

export const createIdChain = (index: number, name: string) => index + CHAIN_CODE_NAME + name;

export const calcIsNestSelected = (names: string[], withNames: string[]): boolean =>
  isEqual(names.slice(0, withNames.length), withNames);

export const calcSelectedItem = (names: string[], items: TreeItemType[]): TreeItemType | null => {
  if (!names.length || !items.length) return null;

  let itemToCheck: TreeItemType | null = null;

  for (const [index, chainName] of names.entries()) {
    const [chainIndex, name] = chainName.split(CHAIN_CODE_NAME);
    const numChainIndex = Math.floor(Number(chainIndex));

    if (!isFiniteZeroPositive(numChainIndex) || !name) return null;

    const item: TreeItemType | null = !index
      ? items[numChainIndex]
      : (itemToCheck as any)?.content[numChainIndex];

    if (!item || item.name !== name) return null;

    itemToCheck = item;
  }

  return itemToCheck;
};

export const calcInitiallySelectedItem = (indexes: number[], items: TreeItemType[]): string[] => {
  if (!indexes.length || !items.length) return [];

  const chainedNames: string[] = [];
  let itemToCheck: TreeItemType | null = null;

  for (const [index, itemIndex] of indexes.entries()) {
    const numChainIndex = Math.floor(itemIndex);

    if (!isFiniteZeroPositive(numChainIndex)) return [];

    const item: TreeItemType | null = !index
      ? items[numChainIndex]
      : (itemToCheck as any)?.content[numChainIndex];

    if (!item) return [];

    chainedNames.push(createIdChain(itemIndex, item.name));
    itemToCheck = item;
  }

  if (!itemToCheck?.onClick) return [];

  return chainedNames;
};
