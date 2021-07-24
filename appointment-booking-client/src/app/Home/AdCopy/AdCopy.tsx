import { FC } from "react";
import styled from "styled-components";
import { device, Flex, Flex2, LinkButton } from "../../../components";

export const AdCopy: FC = () => {
  return (
    <Container>
      <SectionLayout {...sectionOneProps} />
      <SectionLayout {...sectionTwoProps} />
    </Container>
  );
};

const sectionOneProps: SectionProps = {
  header: "The Renewal Center Enhances Your Natural Beauty",
  imgSrc: "/home-page-natural-beauty.jpeg",
  description:
    "Whether you want to improve your skin texture or reduce the appearance of facial lines and wrinkles, you will get professional medical care at our fine clinic.",
  buttonHref: "#",
};

const sectionTwoProps: SectionProps = {
  header: "Individualized Skin Care and More",
  imgSrc: "/home-page-skin-care.jpeg",
  description:
    "Relax in our friendly and caring facility as you receive customized treatments for everything from acne to weight loss. Our team has over 40 years of combined experience.",
  buttonHref: "#",
  alignRight: true,
};

interface SectionProps {
  header: string;
  imgSrc: string;
  description: string;
  buttonHref: string;
  alignRight?: boolean;
}

const SectionLayout: FC<SectionProps> = ({
  header,
  imgSrc,
  description,
  buttonHref,
  alignRight,
}) => {
  return (
    <Section as="section">
      <Header>{header}</Header>
      <ContentContainer>
        {alignRight ? <Img src={imgSrc} /> : null}
        <Flex>
          <TextContainer alignRight={alignRight}>
            <p>{description}</p>
            <Button href={buttonHref} text="Learn More" />
          </TextContainer>
        </Flex>
        {alignRight ? null : <Img src={imgSrc} />}
      </ContentContainer>
    </Section>
  );
};

const Container = styled(Flex)`
  padding-top: 7rem;
  @media (max-width: ${device.tablet.pixels}) {
    position: relative;
    top: 30vh;
  }
`;

const Section = styled(Flex2)`
  margin-bottom: 5rem;
  width: 60rem;
  @media (max-width: ${device.desktop.pixels}) {
    width: 90%;
  }
`;

const Header = styled.h2`
  color: ${({ theme }) => theme.colors.secondary};
  font-weight: normal;
  margin: 2rem;
`;

const ContentContainer = styled(Flex)`
  flex-direction: row;
  align-items: flex-start;
`;

const Img = styled.img`
  width: 48%;
`;

const TextContainer = styled(Flex2)<{ alignRight?: boolean }>`
  width: 85%;
  align-items: ${({ alignRight }) => (alignRight ? "flex-end" : "flex-start")};
  text-align: ${({ alignRight }) => (alignRight ? "end" : "start")};
`;

const Button = styled(LinkButton)`
  padding: 0.7rem 5rem;
  margin-top: 1.5rem;
`;
