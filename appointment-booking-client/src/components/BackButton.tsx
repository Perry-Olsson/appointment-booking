import { useAtom } from "jotai";
import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";
import styled from "styled-components";
import { dimensionsAtom } from "../app/Scheduler/atoms";
import { device } from "./device";

export const BackButton: React.FC<BackButtonProps> = ({
  href,
  size = "sm",
  ...restProps
}) => {
  const [{ width }] = useAtom(dimensionsAtom);
  return (
    <Link href={href}>
      <Container {...restProps}>
        <IoIosArrowBack size={getWidth(size)} />
        {device.isLapTopOrBigger(width) ? "back" : null}
      </Container>
    </Link>
  );
};

const getWidth = (size: string): string => {
  let width: string;
  switch (size) {
    case "sm":
      width = "35px";
      break;
    case "md":
      width = "50px";
      break;
    case "lg":
      width = "65px";
      break;
    default:
      width = size;
      break;
  }
  return width;
};

interface BackButtonProps {
  href: string;
  restProps?: React.HTMLAttributes<any>;
  size?: string;
}

const Container = styled.a`
  width: fit-content;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-weight: bold;
  font-size: ${({ theme }) => theme.font.med};
  &:hover {
    color: gray;
  }
  @media (min-width: ${device.tablet.pixels}) {
    padding-right: 0.6em;
  }
`;
