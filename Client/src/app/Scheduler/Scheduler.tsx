import { NowProvider } from "../../context";
import { Month } from "./Month";

export const Scheduler: React.FC = () => {
  return (
    <NowProvider>
      <Month />
      <Month />
      <Month />
      <Month />
    </NowProvider>
  );
};
