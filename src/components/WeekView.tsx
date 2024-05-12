import DayList from "./DayList";
import Months from "./Months";
import Notes from "./Notes";
import { getCurrentWeekNumber, getDaysInWeek, weeksInMonth } from "../utils";
import { useEffect, useState } from "react";

const WeekView = () => {
  const [currentWeek, setCurrentWeek] = useState(() => {
    return getCurrentWeekNumber();
  });
  const [days, setDays] = useState<Array<{ date: number; day: string }>>([]);
  const [totalWeeks, setTotalWeeks] = useState(() => {
    return weeksInMonth(new Date().getMonth());
  });

  useEffect(() => {
    setDays(getDaysInWeek(currentWeek));
  }, [currentWeek]);

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
      <div className="flex flex-col gap-8 max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div className="order-last md:order-first">
            <h3 className="text-4xl lg:text-6xl font-medium capitalize mb-2">Week {currentWeek}</h3>
            <div className="flex gap-2">
              <button onClick={handlePrev} className="border border-forrest-green px-4 py-1 rounded hover:text-white hover:bg-forrest-green transition">Previous</button>
              <button onClick={handleNext} className="border border-forrest-green px-4 py-1 rounded hover:text-white hover:bg-forrest-green transition">Next</button>
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
