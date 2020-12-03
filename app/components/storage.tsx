import { Dispatch, SetStateAction, useState } from 'react';
import Store from 'electron-store';

const store = new Store();

export default function useStorage<T>(
  key: string,
  initialValue: T
): [T, Dispatch<SetStateAction<T>>, () => void] {
  const [item, setValue] = useState(() => {
    const value = store.get(key) || initialValue;
    store.set(key, value as T);
    return value;
  });

  const setItem = (action: SetStateAction<T>): void => {
    if (action instanceof Function) {
      return setValue((prevState: T) => {
        const value = action(prevState);
        store.set(key, value);
        return value;
      });
    }
    setValue(action);
    return store.set(key, action);
  };

  const clear = () => {
    store.delete(key);
  };

  return [item as T, setItem, clear];
}
