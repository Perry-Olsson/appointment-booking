import { Date } from "./Date";

export const DateList: React.FC<DateListProps> = ({ days }) => {
  return (
    <>
      <GridOffset days={days} />
      {days.map(day => {
        return <Date key={day.valueOf()} day={day} />;
      })}
    </>
  );
};

interface DateListProps {
  days: Date[];
}

const GridOffset: React.FC<DateListProps> = ({ days }) => {
  const nullDates: React.ReactNode[] = [];
  for (let i = 0; i < days[0].getDay(); i++) {
    nullDates.push(<Date key={i} day={null} />);
  }
  return <>{nullDates}</>;
};
