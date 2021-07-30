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
      <ImageContainter>
        <span
          className="background-image"
          role="img"
          aria-label="Health and beauty background image"
        ></span>
      </ImageContainter>
      <TextContainer>
        <Header>INNOVATIVE HEALTH AND BEAUTY SERVICES</Header>
        <StyledButton href="#" text="Get a Personal Consultation" />
      </TextContainer>
    </IntroSection>
  );
};

const IntroSection = styled.section`
  width: 100%;
  height: calc(100vh - ${({ theme }) => theme.navBar.height});
  display: flex;
  justify-content: center;
  @media (min-width: ${device.desktop.pixels}) {
    margin-bottom: 4rem;
  }
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
  top: 60%;
  width: 80%;
  @media (min-width: ${device.desktop.pixels}) {
    right: 5%;
    top: 25%;
    width: 20rem;
  }
  @media (min-width: ${device.desktop.largePixels}) {
    width: 30rem;
  }
`;

const Header = styled.h1`
  text-align: center;
  font-size: 3rem;
  color: ${({ theme }) => theme.colors.secondary};
  margin-bottom: 2rem;
  @media (max-width: ${device.desktop.largePixels}) {
    font-size: 2rem;
  }

  @media (max-width: ${device.tablet.pixels}) {
    font-size: 1.65rem;
  }
`;

const StyledButton = styled(LinkButton)`
  width: fit-content;
  padding: 0.8rem 2.5rem;
  text-align: center;
`;
