import { useState, useEffect, useCallback } from "react";

const useBreakpoint = (breakpoint) => {
  const [currScrWidth, setCurrScrWidth] = useState(window.innerWidth);

  const dimsUpdater = useCallback(() => {
    setCurrScrWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", dimsUpdater);
    return () => {
      window.removeEventListener("resize", dimsUpdater);
    };
  }, [dimsUpdater]);

  return [breakpoint, currScrWidth];
};

export default useBreakpoint;


// CALL IN THE PARENT COMPONENT
// const [breakpoint, currWidth] = useBreakpoint(768);
