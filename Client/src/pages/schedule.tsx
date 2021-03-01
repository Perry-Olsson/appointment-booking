import ReactModal from "react-modal";
import { DynamicScheduler } from "../app/Scheduler";

export default function schedule() {
  ReactModal.setAppElement("#__next");
  return <DynamicScheduler />;
}
