import { Date } from "./Date";

export const DateList: React.FC<DateListProps> = ({ days, small }) => {
  return (
    <>
      {days.map(day => {
        return <Date key={day.valueOf()} day={day} small={small} />;
      })}
    </>
  );
};

interface DateListProps {
  days: Date[];
  small: boolean | undefined;
}
