import styled from "styled-components";
import { Flex } from "../../../../../components";

export const TimeSlot: React.FC<TimeSlotProps> = ({ timeSlot }) => {
  return <Container>{timeSlot.toLocaleTimeString()}</Container>;
};

const Container = styled(Flex)`
  border-top: solid 1px;
  width: 100%;
`;

interface TimeSlotProps {
  timeSlot: Date;
}
