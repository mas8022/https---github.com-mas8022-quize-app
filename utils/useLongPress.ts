import { useState, useEffect, useCallback } from "react";

type UseLongPressReturn = {
  onMouseDown: () => void;
  onTouchStart: () => void;
  onMouseUp: () => void;
  onMouseLeave: () => void;
  onTouchEnd: () => void;
};

function useLongPress(callback: () => void = () => {}, ms: number = 300): UseLongPressReturn {
  const [isPressing, setIsPressing] = useState<boolean>(false);
  const [startLongPress, setStartLongPress] = useState<boolean>(false);

  const start = useCallback(() => {
    setStartLongPress(true);
  }, []);

  const stop = useCallback(() => {
    setStartLongPress(false);
    setIsPressing(false);
  }, []);

  useEffect(() => {
    let timerId: NodeJS.Timeout | undefined;

    if (startLongPress) {
      timerId = setTimeout(() => {
        setIsPressing(true);
        callback();
      }, ms);
    } else {
      if (timerId) clearTimeout(timerId);
    }

    return () => {
      if (timerId) clearTimeout(timerId);
    };
  }, [startLongPress, ms, callback]);

  return {
    onMouseDown: start,
    onTouchStart: start,
    onMouseUp: stop,
    onMouseLeave: stop,
    onTouchEnd: stop,
  };
}

export { useLongPress };
