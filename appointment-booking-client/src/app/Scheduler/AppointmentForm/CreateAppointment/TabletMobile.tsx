import { Flex } from "../../../../components";
import { CreateAppointment } from "./CreateAppointment";

export const TabletMobileCreateAppointment: React.FC = () => {
  return (
    <Flex>
      <CreateAppointment
        handleClick={() => console.log("tablet mobile create appointment")}
      />
    </Flex>
  );
};
