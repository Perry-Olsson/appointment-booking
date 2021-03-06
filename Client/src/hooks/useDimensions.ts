import { useEffect, useState } from "react";

export const useDimensions = (): WindowDimensions => {
  const [dimensions, setDimensions] = useState<WindowDimensions>(
    getDimensions()
  );

  useEffect(() => {
    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
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
