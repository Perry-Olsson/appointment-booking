export const Arrow: React.FC<ArrowProps> = ({
  display = true,
  onClick,
  ...restProps
}) => {
  return (
    <img
      src="/arrow.png"
      onClick={display ? onClick : undefined}
      width="50px"
      {...restProps}
      style={{ opacity: display ? 1 : 0 }}
    />
  );
};

interface ArrowProps {
  onClick: () => void;
  restProps?: React.HTMLAttributes<any>;
  display?: boolean;
}
