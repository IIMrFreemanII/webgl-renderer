import { useWindowEvent } from "frontent/hooks";
import { isWithinRect } from "frontent/utils";
import { Nullable } from "frontent/models";

type TargetElement = Nullable<HTMLElement>;

export enum CheckOption {
  contains = "contains",
  rect = "rect",
}

export type CheckOptionKeys = keyof typeof CheckOption;

type OutsideClickType = (
  refs: TargetElement | TargetElement[],
  onOutsideClick: VoidFunction,
  disable?: boolean,
  checkOption?: CheckOptionKeys,
  rectMouseOption?: "client" | "page",
) => void;

export const useOutsideClick: OutsideClickType = (
  refs,
  onOutsideClick,
  disable,
  checkOption = "contains",
  rectMouseOption = "page",
) => {
  useWindowEvent("click", (e) => {
    if (!refs || disable) return;

    const target = e.target as Node;

    if (Array.isArray(refs)) {
      const hasClickedOutsideAll = refs.every((el) => {
        if (checkOption === "rect") {
          return !isWithinRect(el, e as any, rectMouseOption);
        }

        return el && !el.contains(target);
      });

      return hasClickedOutsideAll && onOutsideClick();
    }

    if (checkOption === "rect") {
      return !isWithinRect(refs, e as any, rectMouseOption) && onOutsideClick();
    }

    !refs.contains(target) && onOutsideClick();
  });
};

export default useOutsideClick;
