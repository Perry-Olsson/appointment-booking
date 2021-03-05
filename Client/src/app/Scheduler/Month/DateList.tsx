import { Date } from "./Date";

export const DateList: React.FC<DateListProps> = ({ days }) => {
  const fillGridOffset: React.ReactNode[] = [];
  for (let i = 0; i < days[0].getDay(); i++) {
    fillGridOffset.push(<Date key={i} day={null} />);
  }

  return (
    <>
      {fillGridOffset}
      {days.map(day => {
        return <Date key={day.valueOf()} day={day} />;
      })}
    </>
  );
};

interface DateListProps {
  days: Date[];
}
