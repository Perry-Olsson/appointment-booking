import { useAtom } from "jotai";
import { FC } from "react";
import { device } from "../../../components";
import { dimensionsAtom } from "../../Scheduler/atoms";
import { MobileTabletNav } from "./MobileTabletNav";

export const Navigation: FC = () => {
  const [dimensions] = useAtom(dimensionsAtom);

  if (device.isTabletOrSmaller(dimensions.width)) return <MobileTabletNav />;
  return null;
};
