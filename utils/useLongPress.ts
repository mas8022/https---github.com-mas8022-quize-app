import { useState, useEffect, useCallback } from "react";

function useLongPress(
  callback: (id: string) => void,
  id: string,
  ms: number = 300
) {
  const [isPressing, setIsPressing] = useState(false);
  const [startLongPress, setStartLongPress] = useState(false);

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
        callback(id);
      }, ms);
    }

    return () => {
      if (timerId) clearTimeout(timerId);
    };
  }, [startLongPress, ms, callback, id]);

  return {
    onMouseDown: start,
    onTouchStart: start,
    onMouseUp: stop,
    onMouseLeave: stop,
    onTouchEnd: stop,
  };
}

export { useLongPress };
