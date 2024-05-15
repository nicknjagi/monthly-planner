import DayList from "./DayList";
import Months from "./Months";
import Notes from "./Notes";
import { getCurrentWeekInMonth, getDaysInWeek, weeksInMonth } from "../utils";
import { useEffect, useState } from "react";
import { useAppSelector } from "../hooks";

const WeekView = () => {
  const {currentMonth} = useAppSelector(state => state.date)
  const [currentWeek, setCurrentWeek] = useState(() => {
    return getCurrentWeekInMonth(currentMonth);
  });
  const [days, setDays] = useState<Array<{ date: number; day: string }>>([]);
  // eslint-disable-next-line
  const [totalWeeks, setTotalWeeks] = useState(() => {
    return weeksInMonth(currentMonth);
  });

  useEffect(() => {
    setDays(getDaysInWeek(currentMonth, currentWeek));
  }, [currentWeek, currentMonth]);

  function handlePrev(){
    if(currentWeek !== 1){
      setCurrentWeek(currentWeek - 1)
    }
  }

  function handleNext(){
    if(currentWeek < totalWeeks){
      setCurrentWeek(currentWeek + 1)
    }
  }

  return (
    <section className="w-full px-4 md:px-8 py-20 bg-white">
      <div className="flex flex-col gap-8 max-w-[960px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div className="order-last md:order-first">
            <h3 className="text-4xl lg:text-6xl font-medium capitalize mb-2">Week {currentWeek}</h3>
            <div className="flex gap-2">
              <button onClick={handlePrev} className="btn">Previous</button>
              <button onClick={handleNext} className="btn">Next</button>
            </div>
          </div>
          <Months />
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3">
          {days
            .map((day: { date: number; day: string }, index: number) => {
              return <DayList day={day} key={index} currentWeek={currentWeek}/>;
            })}
        </div>
        <Notes currentWeek={currentWeek}/>
      </div>
    </section>
  );
};
export default WeekView;
