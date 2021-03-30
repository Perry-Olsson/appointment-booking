import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";
import styled from "styled-components";

export const BackButton: React.FC<BackButtonProps> = ({
  href,
  size = "sm",
  ...restProps
}) => {
  return (
    <Link href={href}>
      <Container {...restProps}>
        <IoIosArrowBack size={getWidth(size)} />
        back
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
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: ${({ theme }) => theme.font.med};
  &:hover {
    color: gray;
  }
`;
