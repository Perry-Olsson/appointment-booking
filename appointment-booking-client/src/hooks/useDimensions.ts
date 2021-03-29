import { useAtom } from "jotai";
import { useEffect } from "react";
import { dimensionsAtom } from "../app/Scheduler/atoms";

export const useDimensions = (): void => {
  const [, setDimensions] = useAtom(dimensionsAtom);

  useEffect(() => {
    setDimensions(getDimensions());

    let timeoutId: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setDimensions(getDimensions());
      }, 100);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
};

const getDimensions = () => ({
  width: window.innerWidth,
  height: window.innerHeight,
});
