import { useState, useEffect, useCallback } from "react";

function useLongPress(callback = () => {}, ms = 300) {
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
    let timerId: NodeJS.Timeout | null = null;

    if (startLongPress) {
      timerId = setTimeout(() => {
        setIsPressing(true);
        callback();
      }, ms);
    } else if (timerId) {
      clearTimeout(timerId);
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
