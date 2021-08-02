import { Appointment, ServiceDay } from "../../../../../../types";
import { useWatchProvider } from "../../../../hooks";
import { ProviderUnavailable } from "./ProviderUnavailable";
import { ShowAvailableTimes } from "./ShowAvailableTimes";
import { ShowServiceHours } from "./ShowServiceHours";

export const AvailableTimes: React.FC<AvailableTimesProps> = ({
  timeSlots,
  serviceHours,
  appointments,
}) => {
  const selectedProvider = useWatchProvider();

  if (!selectedProvider)
    return (
      <ShowServiceHours timeSlots={timeSlots} serviceHours={serviceHours} />
    );

  const schedule = selectedProvider.schedule[timeSlots[0].getDayString()];

  if (!schedule.length)
    return <ProviderUnavailable selectedProvider={selectedProvider} />;

  return (
    <ShowAvailableTimes
      appointments={appointments}
      timeSlots={timeSlots}
      schedule={schedule}
    />
  );
};

interface AvailableTimesProps {
  timeSlots: Date[];
  serviceHours: ServiceDay;
  appointments: Appointment[];
}
