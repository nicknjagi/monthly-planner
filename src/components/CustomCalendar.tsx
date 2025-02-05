import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { next, prev } from '../dates/dateSlice';
import { useAppDispatch, useAppSelector } from '../hooks';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function CustomCalendar() {
  const {currentMonth} = useAppSelector(state => state.date)
  const [value, setValue] = useState<Value>(new Date(2024, currentMonth , new Date().getDate()));
  const dispatch = useAppDispatch()

  useEffect(()=>{
    const year = new Date().getFullYear()
    setValue(new Date(year, currentMonth, 1))
  },[currentMonth])

  return (
    <div className="md:order-1 ">
      <h2 className="text-center font-semibold tracking-[3px]">calendar</h2>
      <div className="flex items-center gap-2 w-fit mx-auto">
        <button onClick={() => dispatch(prev())} className="">
          <ChevronLeft />
        </button>
        <Calendar value={value} />
        <button onClick={() => dispatch(next())} className="">
          <ChevronRight />
        </button>
      </div>
    </div>
  );
}