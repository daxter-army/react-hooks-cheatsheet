// do some action when you scroll down and hit to the top again.

import { useEffect, useState } from "react";

const useTopIndicator = () => {
  const [isTop, setIsTop] = useState(true);

  const scrollHandler = () => {
    if (window.scrollY <= 0) {
      setIsTop(true);
    } else {
      setIsTop(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollHandler);

    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  return isTop;
};

export default useTopIndicator;
