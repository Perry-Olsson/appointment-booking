import { useEffect, useState } from "react";

export const useDimensions = (): WindowDimensions => {
  const [dimensions, setDimensions] = useState<WindowDimensions>(
    getDimensions()
  );

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }, 100);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return dimensions;
};

const getDimensions = () => {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
};

interface WindowDimensions {
  width: number;
  height: number;
}
