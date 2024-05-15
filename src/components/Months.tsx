import { months } from "../utils"    
import { useAppDispatch, useAppSelector } from "../hooks"     
import { setCurrentMonth } from "../dates/dateSlice"

const Months = () => {
  const {currentMonth} = useAppSelector(state => state.date)
  const dispatch = useAppDispatch()

  return (
    <div className="grid grid-cols-6 border border-black w-full max-w-2xl">
      {months.map((month, index) => {
        return <button key={index} onClick={() => dispatch(setCurrentMonth(index))} className={`grid place-content-center border border-black py-1 text-[12px] tracking-widest ${currentMonth === index ? 'bg-[#B4B0A5]' : ''}`}>{month.slice(0, 3)}</button>
      })}
    </div>
  )
}
export default Months