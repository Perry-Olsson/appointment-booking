import React from "react";
import styled from "styled-components";
import { Appointment, Procedure, Provider } from "../../../../../../types";
import { GrayedOut } from "./GrayedOut";
import { SelectedAppointment } from "./SelectedAppointment";
import { getSelectedAppointment } from "./utils";

export const ColorInSlot: React.FC<ColorInSlotProps> = ({
  timeSlot,
  provider,
  procedure,
  appointment,
  time,
}) => {
  const isOnHour = timeSlot.getMinutes() === 0;

  return (
    <Margin>
      <SelectedAppointment
        timeSlot={timeSlot}
        selectedAppointment={getSelectedAppointment(time, procedure)}
        provider={provider}
        procedure={procedure}
      >
        <GrayedOut
          timeSlotValue={timeSlot.valueOf()}
          timestampValue={appointment ? appointment.timestamp.valueOf() : 0}
          endValue={appointment ? appointment.end.valueOf() : 0}
        >
          {isOnHour ? (
            <TimeString>{timeSlot.getTimeSlotString()}</TimeString>
          ) : null}
        </GrayedOut>
      </SelectedAppointment>
    </Margin>
  );
};

const TimeString = styled.div`
  margin-left: 5px;
`;

const Margin = styled.div`
  height: 100%;
  margin: 0 2px;
`;

interface ColorInSlotProps {
  timeSlot: Date;
  provider: Provider | undefined;
  procedure: Procedure | undefined;
  appointment: Appointment | undefined;
  time: Date | undefined;
}
