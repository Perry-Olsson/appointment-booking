import { FC } from "react";
import styled from "styled-components";
import { device, Flex, LinkButton } from "../../components";
import { AdCopy } from "./AdCopy";

export const Home: FC = () => {
  return (
    <>
      <Intro />
      <AdCopy />
    </>
  );
};

const Intro: FC = () => {
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
  height: 75vh;
  @media (max-width: ${device.desktop.pixels}) {
    height: 40vh;
    align-items: flex-end;
  }
  @media (max-width: ${device.tablet.pixels}) {
    height: 40vh;
    align-items: center;
  }
`;

const TextContainer = styled(Flex)`
  width: 30rem;
  margin-left: 32rem;
  @media (max-width: ${device.desktop.pixels}) {
    width: 20rem;
    margin-left: 0;
    margin-right: 2rem;
  }
  @media (max-width: ${device.tablet.pixels}) {
    margin-left: 0;
    margin-right: 0;
    width: 80%;
    position: absolute;
    bottom: 8vh;
  }
  @media (max-height: 550px) {
    bottom: 1vh;
  }
`;

const Header = styled.h1`
  text-align: center;
  font-size: 3rem;
  color: ${({ theme }) => theme.colors.secondary};
  margin-bottom: 2rem;
  @media (max-width: ${device.desktop.pixels}) {
    font-size: 2rem;
  }
  @media (max-width: ${device.tablet.pixels}) {
    font-size: 1.65rem;
  }
`;

const StyledButton = styled(LinkButton)`
  width: fit-content;
  padding: 0.8rem 1rem !important;
  text-align: center;
`;
