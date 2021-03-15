import { IoIosArrowBack } from "react-icons/io";
import styled from "styled-components";

export const BackButton: React.FC<BackButtonProps> = ({
  size = "sm",
  ...restProps
}) => {
  return (
    <div onClick={goBack} {...restProps}>
      <StyledBackIcon size={getWidth(size)} />
    </div>
  );
};

const goBack = () => {
  window.history.back();
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
  restProps?: React.HTMLAttributes<any>;
  size?: string;
}

const StyledBackIcon = styled(IoIosArrowBack)`
  &:hover {
    color: gray;
  }
`;
