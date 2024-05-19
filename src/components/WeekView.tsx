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
    <section className="w-full px-4 md:px-8 pt-8 bg-white">
      {/* <div className="max-w-[960px] mx-auto">
        <img
          className="w-28 md:w-40 h-fit aspect-[3/2] -translate-x-2 md:-translate-x-6 mb-8"
          src="./assets/images/logo.png"
          alt="logo"
        />
      </div> */}
      <div className="flex flex-col gap-6 max-w-[960px] mx-auto">
        <div className="flex flex-col justify-between mb-4">
          <div className="flex justify-between md:items-center mb-4">
            <img
              className="w-28 md:w-40 h-fit aspect-[3/2] -translate-x-2 md:-translate-x-6"
              src="./assets/images/logo.png"
              alt="logo"
            />
            <div>
              <h3 className="text-3xl md:text-5xl text-right capitalize mb-2">Week {currentWeek}</h3>
              <div className="flex gap-2">
                <button onClick={handlePrev} className="btn">Previous</button>
                <button onClick={handleNext} className="btn">Next</button>
              </div>
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
