import { useAtom } from "jotai";
import { FC } from "react";
import styled from "styled-components";
import { device, Flex, Flex2, LinkButton } from "../../../components";
import { dimensionsAtom } from "../../Scheduler/atoms";

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
  const [{ width }] = useAtom(dimensionsAtom);
  const isTabletOrSmaller = device.isTabletOrSmaller(width);
  return (
    <Section as="section">
      <Header>{header}</Header>
      <ContentContainer>
        {alignRight || isTabletOrSmaller ? <Img src={imgSrc} /> : null}
        <TextContainer alignRight={alignRight}>
          <p>{description}</p>
          <Button href={buttonHref} text="Learn More" />
        </TextContainer>
        {alignRight || isTabletOrSmaller ? null : <Img src={imgSrc} />}
      </ContentContainer>
    </Section>
  );
};

const Container = styled(Flex)`
  padding-top: 7rem;
  @media (max-width: ${device.tablet.pixels}) {
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
  @media (max-width: ${device.tablet.pixels}) {
    text-align: center;
  }
`;

const ContentContainer = styled(Flex)`
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  @media (max-width: ${device.tablet.pixels}) {
    flex-direction: column;
    align-items: center;
  }
`;

const Img = styled.img`
  width: 48%;
  @media (max-width: ${device.tablet.pixels}) {
    margin-top: 0.5rem;
    width: 100%;
  }
`;

const TextContainer = styled(Flex2)<{ alignRight?: boolean }>`
  width: 45%;
  align-items: ${({ alignRight }) => (alignRight ? "flex-end" : "flex-start")};
  text-align: ${({ alignRight }) => (alignRight ? "end" : "start")};
  @media (max-width: ${device.tablet.pixels}) {
    width: 80%;
    margin-top: 1.5rem;
    align-items: center;
    text-align: center;
  }
`;

const Button = styled(LinkButton)`
  padding: 0.7rem 5rem;
  margin-top: 1.5rem;
`;
