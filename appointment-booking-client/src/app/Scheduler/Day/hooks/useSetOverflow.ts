import { useEffect } from "react";

export const useSetOverflow = () => {
  useEffect(() => {
    const body = document.getElementsByTagName("body")[0];

    body!.style.overflow = "hidden";
    return () => {
      body!.style.overflow = "auto";
    };
  });
};
