import styled from "styled-components";

export const Flex: React.FC<FlexProps> = ({ children, ...restProps }) => {
  return <Container {...restProps}>{children}</Container>;
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

interface FlexProps {
  children: React.ReactNode;
  restProps?: React.HTMLAttributes<any>;
}
