import styled from "styled-components";

export const TimeSlot: React.FC<TimeSlotProps> = ({ timeSlot }) => {
  const isOnHour = timeSlot.getMinutes() === 0;
  return (
    <Container isOnHour={isOnHour}>
      {isOnHour ? getTimeString(timeSlot) : null}
    </Container>
  );
};

const getTimeString = (timeSlot: Date) => {
  const localeTimestring = timeSlot.toLocaleTimeString();
  const hours = timeSlot.getHours();
  return `${
    hours === 0 ? 12 : hours > 12 ? hours - 12 : hours
  } ${localeTimestring.slice(localeTimestring.length - 3)}`;
};

const Container = styled.div<{ isOnHour: boolean }>`
  border-top: solid 1px;
  border-color: ${({ isOnHour }) => (isOnHour ? "#454545" : "#45454555")};
  width: 100%;
  height: 1.7rem;
`;

interface TimeSlotProps {
  timeSlot: Date;
}
