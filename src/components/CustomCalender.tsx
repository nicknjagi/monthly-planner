import { useState } from 'react';
import Calendar from 'react-calendar';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function CustomCalender() {
  const [value, onChange] = useState<Value>(new Date());

  return (
    <div className="md:order-1">
      <h2 className="text-center font-semibold tracking-[3px]">calender</h2>
      <Calendar onChange={onChange} value={value} />
    </div>
  );
}