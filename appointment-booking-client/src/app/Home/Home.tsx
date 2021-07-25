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
    <IntroSection>
      <ImageContainter></ImageContainter>
      <TextContainer>
        <Header>INNOVATIVE HEALTH AND BEAUTY SERVICES</Header>
        <StyledButton href="#" text="Get a Personal Consultation" />
      </TextContainer>
    </IntroSection>
  );
};

const IntroSection = styled.section`
  /* position: absolute;
  top: ${({ theme }) => theme.navBar.height};
  right: 0;
  bottom: 0;
  left: 0; */
  width: 100vw;
  height: calc(100vh - ${({ theme }) => theme.navBar.height});
  display: flex;
  justify-content: center;
`;

const ImageContainter = styled(Flex)`
  background-image: url("/home-page-bg.png");
  background-size: cover;
  position: absolute;
  top: ${({ theme }) => theme.navBar.height};
  right: 0;
  bottom: 0;
  left: 0;
  @media (max-width: ${device.desktop.pixels}) {
    bottom: 45%;
  }
`;

const TextContainer = styled(Flex)`
  position: absolute;
  right: 10%;
  top: 25%;
  width: 30rem;
  @media (max-width: ${device.desktop.pixels}) {
    position: absolute;
    right: initial;
    top: initial;
    bottom: 10%;
    width: 80%;
  }
  /* @media (max-width: ${device.tablet.pixels}) {
    margin-left: 0;
    margin-right: 0;
    width: 80%;
    position: absolute;
    bottom: 8vh;
  } */
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
  padding: 0.8rem !important;
  text-align: center;
`;
