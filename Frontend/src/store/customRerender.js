import { useState, useCallback } from "react";

// Custom hook to force a re-render
const useForceUpdate = () => {
  const [, setTick] = useState(0);

  const update = useCallback(() => {
    setTick((tick) => tick + 1); // Increment the state to trigger re-render
  }, []);

  return update;
};

export default useForceUpdate;
