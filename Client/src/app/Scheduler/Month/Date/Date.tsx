import React, { useState } from "react";
import styled from "styled-components";

import { Flex, theme } from "../../../../components";
import { device } from "../../../../components/device";
import { Modal } from "../../Day";
import { TodayMarker } from "./Marker";
import { ModalToggler } from "./ModalToggler";

export const Date: React.FC<DayProps> = ({ day, ...restProps }) => {
  if (day === null) return <GridCell {...restProps}>{null}</GridCell>;
  const [renderModal, setRenderModal] = useState(false);
  const [displayModal, setDisplayModal] = useState(false);

  const openModal = () => {
    setRenderModal(true);
    setDisplayModal(true);
  };
  const closeModal = () => {
    setDisplayModal(false);
    setTimeout(() => {
      setRenderModal(false);
    }, theme.modal.transitionTime);
  };

  return (
    <GridCell {...restProps}>
      <TodayMarker day={day} />
      <ModalToggler day={day} openModal={openModal} />
      {renderModal ? (
        <Modal day={day} displayModal={displayModal} closeModal={closeModal} />
      ) : null}
    </GridCell>
  );
};

interface DayProps {
  day: Date | null;
  restProps?: React.HTMLAttributes<any>[];
}

const GridCell = styled(Flex)`
  @media (min-width: ${device.tablet.pixels}) {
    justify-content: flex-start;
    align-items: flex-start;
    border-bottom: 1px solid;
    border-right: 1px solid;
    border-color: ${({ theme }) => theme.grid.borderColor};
  }
  height: ${({ theme }) => theme.grid.cellWidth};
  max-height: ${({ theme }) => theme.grid.cellMaxWidth};
`;
