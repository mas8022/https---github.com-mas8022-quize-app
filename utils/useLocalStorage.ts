import { useEffect, useState } from "react";

const useLocalStorage = (key: string, initialValue: string) => {
  const [state, setState] = useState<any>(null);
  const [isPending, setIsPending] = useState<Boolean>(true);

  const handleSetState = (value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
    setState(value);
  };

  useEffect(() => {
    const storedValue = localStorage.getItem(key);
    let value;

    try {
      value = storedValue ? JSON.parse(storedValue) : null;
    } catch (e) {
      value = null;
    }

    if (value === null || value === undefined) {
      localStorage.setItem(key, JSON.stringify(initialValue));
      value = initialValue;
    }

    setState(value);
    setIsPending(false);
  }, [key, initialValue]);

  return [state, handleSetState, isPending];
};

export { useLocalStorage };
