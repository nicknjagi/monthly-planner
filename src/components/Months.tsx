import { months } from "../utils"    
import { useAppSelector } from "../hooks"     

const Months = () => {
  const {currentMonth} = useAppSelector(state => state.date)
  return (
    <div className="grid grid-cols-6 border border-black w-full max-w-2xl">
      {months.map((month, index) => {
        return <span key={index} className={`grid place-content-center border border-black py-1 text-[12px] tracking-widest ${currentMonth === index ? 'bg-[#B4B0A5]' : ''}`}>{month.slice(0, 3)}</span>
      })}
    </div>
  )
}
export default Months