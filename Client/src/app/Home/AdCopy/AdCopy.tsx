import { useAtom } from "jotai";
import { FC, useEffect, useRef } from "react";
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
  imgSrc: "/home-page-natural-beauty.webp",
  description:
    "Whether you want to improve your skin texture or reduce the appearance of facial lines and wrinkles, you will get professional medical care at our fine clinic.",
  buttonHref: "#",
  imgAlt: "Middle aged women looking over her shoulder and smiling",
};

const sectionTwoProps: SectionProps = {
  header: "Individualized Skin Care and More",
  imgSrc: "/home-page-skin-care.webp",
  description:
    "Relax in our friendly and caring facility as you receive customized treatments for everything from acne to weight loss. Our team has over 40 years of combined experience.",
  buttonHref: "#",
  alignRight: true,
  scrollOffset: 400,
  imgAlt: "Young woman looking down and smiling",
};

interface SectionProps {
  header: string;
  imgSrc: string;
  description: string;
  buttonHref: string;
  alignRight?: boolean;
  scrollOffset?: number;
  imgAlt: string;
}

const SectionLayout: FC<SectionProps> = ({
  header,
  imgSrc,
  description,
  buttonHref,
  alignRight,
  imgAlt,
  scrollOffset = 0,
}) => {
  const headerRef = useRef<HTMLHeadingElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const textContentRef = useRef<HTMLDivElement>(null);
  const [{ width }] = useAtom(dimensionsAtom);
  const isTabletOrSmaller = device.isTabletOrSmaller(width);

  function scrollHandler() {
    if (window.scrollY > scrollOffset + 200) {
      headerRef.current!.style.transform = "translate(0, 0)";
    }
    if (window.scrollY > scrollOffset + 300) {
      imgRef.current!.style.transform = "translate(0, 0)";
      textContentRef.current!.style.transform = "translate(0, 0)";
      window.removeEventListener("scroll", scrollHandler);
    }
  }
  useEffect(() => {
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, []);

  return (
    <Section as="section">
      <Header ref={headerRef}>{header}</Header>
      <ContentContainer>
        {alignRight || isTabletOrSmaller ? (
          <Img
            ref={imgRef}
            translateValue={`${isTabletOrSmaller ? "100vw" : "-100vw"}`}
            src={imgSrc}
            alt={imgAlt}
          />
        ) : null}
        <TextContainer ref={textContentRef} alignRight={alignRight}>
          <p>{description}</p>
          <Button href={buttonHref} text="Learn More" />
        </TextContainer>
        {alignRight || isTabletOrSmaller ? null : (
          <Img ref={imgRef} translateValue="100vw" src={imgSrc} alt={imgAlt} />
        )}
      </ContentContainer>
    </Section>
  );
};

const Container = styled(Flex)`
  overflow-x: hidden;
`;

const Section = styled(Flex2)`
  width: 90%;
  margin-bottom: 5rem;
  @media (min-width: ${device.desktop.pixels}) {
    width: 60rem;
  }
`;

const Header = styled.h2`
  color: ${({ theme }) => theme.colors.secondary};
  font-weight: normal;
  margin-bottom: 2rem;
  @media (max-width: ${device.tablet.pixels}) {
    text-align: center;
  }
  transition: all 0.7s;
  transform: translate(-100vw, -50px);
`;

const ContentContainer = styled(Flex2)`
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  @media (max-width: ${device.tablet.pixels}) {
    flex-direction: column;
    align-items: center;
  }
`;

const Img = styled.img<{ translateValue: string }>`
  width: 100%;
  transition: transform 0.8s;
  transform: ${({ translateValue }) => `translate(${translateValue}, 0)`};
  @media (min-width: ${device.desktop.pixels}) {
    width: 50%;
  }
`;

const TextContainer = styled(Flex2)<{ alignRight?: boolean }>`
  width: 45%;
  align-items: ${({ alignRight }) => (alignRight ? "flex-end" : "flex-start")};
  text-align: ${({ alignRight }) => (alignRight ? "end" : "start")};
  transition: transform 0.8s ease-in-out;
  transform: ${({ alignRight }) =>
    alignRight ? "translate(100vw, 0)" : "translate(-100vw, 0)"};
  @media (max-width: ${device.tablet.pixels}) {
    width: 90%;
    margin-top: 1.5rem;
    align-items: center;
    text-align: center;
  }
`;

const Button = styled(LinkButton)`
  padding: 0.7rem 5rem;
  margin-top: 1.5rem;
`;
