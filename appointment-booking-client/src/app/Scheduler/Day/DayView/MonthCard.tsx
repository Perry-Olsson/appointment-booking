import styled from "styled-components";
import { device } from "../../../../components/device";
import { monthsAtom, nowAtom } from "../../atoms";
import { CalenderGrid } from "../../components";
import { DaysOfTheWeek } from "../../components/DaysOfTheWeek";
import { useAtom } from "jotai";

export const MonthCard: React.FC = () => {
  const [{ today }] = useAtom(nowAtom);
  const [months] = useAtom(monthsAtom);

  return (
    <Container>
      <Header>
        <DaysOfTheWeek />
      </Header>
    </Container>
  );
};

const Container = styled.div`
  border: solid;
  padding: 1rem 0;
  @media (max-width: ${device.desktop.pixels}) {
    display: none;
  }
`;

const Header = styled(CalenderGrid)``;
