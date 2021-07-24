import { FC } from "react";
import styled from "styled-components";
import { Flex, LinkButton } from "../../components";

export const Home: FC = () => {
  return (
    <section>
      <Container>
        <TextContainer>
          <Header>INNOVATIVE HEALTH AND BEAUTY SERVICES</Header>
          <StyledButton href="#" text="Get a Personal Consultation" />
        </TextContainer>
      </Container>
    </section>
  );
};

const Container = styled(Flex)`
  background-image: url("/home-page-bg.png");
  background-size: cover;
  height: 600px;
`;

const TextContainer = styled(Flex)`
  width: 30rem;
  margin-left: 35rem;
`;

const Header = styled.h1`
  text-align: center;
  font-size: 3rem;
  color: ${({ theme }) => theme.colors.secondary};
  margin-bottom: 2rem;
`;

const StyledButton = styled(LinkButton)`
  padding: 0.8rem 2rem !important;
`;
