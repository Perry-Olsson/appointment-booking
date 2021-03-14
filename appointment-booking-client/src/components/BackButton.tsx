export const BackButton: React.FC<BackButtonProps> = ({
  size = "sm",
  ...restProps
}) => {
  return (
    <div onClick={goBack} {...restProps}>
      <img src="/back.png" width={getWidth(size)} />
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
      width = "25px";
      break;
    case "md":
      width = "50px";
      break;
    case "lg":
      width = "75px";
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
