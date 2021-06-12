import { FC } from "react";
import styled from "styled-components";

export const AppointmentInfoItem: FC<{
  title: string;
  className?: string;
  comments?: boolean;
}> = ({ title, children, comments, className }) => {
  return (
    <Container className={className}>
      <h3 style={{ marginBottom: "5px" }}>
        <b>{title}</b>
      </h3>
      {comments ? (
        <StyledInfoItem>{children}</StyledInfoItem>
      ) : (
        <div>{children}</div>
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 75%;
  margin: 10px;
`;

const StyledInfoItem = styled.div`
  border: solid 1px #cccccc;
  border-radius: 4px;
  padding: 8px;
  max-height: 100px;
  overflow-x: hidden;
  overflow-y: scroll;
`;
