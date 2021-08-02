import { useEffect } from "react";

export const useSetOverflow = () => {
  useEffect(() => {
    const html = document.getElementsByTagName("html")[0];

    html!.style.overflow = "hidden";
    return () => {
      html!.style.overflow = "auto";
    };
  });
};
