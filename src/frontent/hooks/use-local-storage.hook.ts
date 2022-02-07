import { useState } from "react";

import { useWindowEvent } from "frontent/hooks";
import { isEqual } from "frontent/utils";

type UseLocalStorageReturnType<T> = {
  value: T | null;
  setValue: (value: T) => void;
};

const appDateName = "application_data";

export const useLocalStorage = <T = any>(
  entityName: string,
  initialValue?: T,
): UseLocalStorageReturnType<T> => {
  const readLocalStorage = (key: string): T | null => {
    const item = localStorage.getItem(appDateName);
    if (!item) return null;
    const parsed = JSON.parse(item);
    return key === "*" ? parsed : parsed[key];
  };

  const saveToLocalStorage = (value: T) => {
    if (!entityName) return;

    try {
      const savedData = readLocalStorage("*");
      const dataToSet = { ...savedData, [entityName]: value };

      localStorage.setItem(appDateName, JSON.stringify(dataToSet));
      window.dispatchEvent(new Event("local-storage"));
    } catch (e) {}
  };

  const [storeValue, setStoreValue] = useState<T | null>(() => {
    if (!entityName) return null;

    try {
      const storedValue = readLocalStorage(entityName);
      if (!storedValue && initialValue) {
        saveToLocalStorage(initialValue);
        return initialValue;
      }

      return storedValue;
    } catch (e) {
      return null;
    }
  });

  const handleStorageChange = (isExternalChange = false) => {
    if (!entityName) return;

    try {
      const storageValue = readLocalStorage(entityName);

      if (!isExternalChange) return setStoreValue(storageValue);

      if (!storageValue && initialValue) {
        return saveToLocalStorage(storeValue as T);
      }

      if (storeValue && storageValue && !isEqual(storageValue, storeValue)) {
        return saveToLocalStorage(storeValue as T);
      }
    } catch (e) {}
  };

  useWindowEvent("storage", (e) => {
    if (e.storageArea === localStorage && e.key === appDateName) {
      handleStorageChange(true);
    }
  });

  useWindowEvent("local-storage" as keyof WindowEventMap, () => handleStorageChange());

  const setToStore = (value: T) => {
    saveToLocalStorage(value);
    setStoreValue(value);
  };

  return {
    value: storeValue,
    setValue: setToStore,
  };
};

export default useLocalStorage;
