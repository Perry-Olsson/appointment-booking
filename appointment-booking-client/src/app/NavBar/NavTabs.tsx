import { useAtom } from "jotai";
import { FC } from "react";
import { device } from "../../components";
import { dimensionsAtom } from "../Scheduler/atoms";
import { TabList } from "./TabList";
import { Burger } from "./Burger";

export const NavTabs: FC = () => {
  const [{ width }] = useAtom(dimensionsAtom);

  return <>{width > device.tablet.width ? <TabList /> : <Burger />}</>;
};
