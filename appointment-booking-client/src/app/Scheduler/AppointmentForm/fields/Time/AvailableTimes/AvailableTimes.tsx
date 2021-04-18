import { useAtom } from "jotai";
import { Appointment, ServiceDay } from "../../../../../../types";
import { providerAtom } from "../../../../atoms";
import { ProviderUnavailable } from "./ProviderUnavailable";
import { ShowAvailableTimes } from "./ShowAvailableTimes";
import { ShowServiceHours } from "./ShowServiceHours";

export const AvailableTimes: React.FC<AvailableTimesProps> = ({
  timeSlots,
  serviceHours,
  appointments,
}) => {
  const [selectedProvider] = useAtom(providerAtom);

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
