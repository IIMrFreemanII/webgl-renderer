import { Nullable, RefModel } from "frontent/models";

export const handleSetRef = <T extends any>(ref: T | null, domRefModel: Nullable<RefModel<T>>) => {
  if (typeof domRefModel === "function") {
    domRefModel(ref);
  } else if (domRefModel) {
    domRefModel.current = ref;
  }
};
