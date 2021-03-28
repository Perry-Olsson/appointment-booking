import { Date } from "./Date";

export const DateList: React.FC<DateListProps> = ({ days }) => {
  return (
    <>
      {days.map(day => {
        return <Date key={day.valueOf()} day={day} />;
      })}
    </>
  );
};

interface DateListProps {
  days: Date[];
}


