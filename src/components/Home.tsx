import Appointments from "./Appointments";
import CustomCalender from "./CustomCalender";
import Goals from "./Goals";
import Reminders from "./Reminders";
import TodoList from "./TodoList";
import { months } from "../utils";
import { useAppSelector } from "../hooks"; 

const Home = () => {
  const {currentMonth} = useAppSelector(state => state.date)
  return (
    <section className="px-4 md:px-8 max-w-5xl mx-auto">
      <h1 className="text-center"><span className="inline-block mt-6 mb-2 text-7xl font-lato capitalize">{months[currentMonth]}</span></h1>
      <h1 className="font-semibold tracking-widest text-center mb-8">MONTHLY PLANNER <span className="inline-block font-semibold ">{new Date().getFullYear()}</span></h1>

      <div className="grid h-fit md:grid md:grid-cols-2 gap-8">
        <CustomCalender />
        <Goals />
      </div>

      <section className="flex flex-col md:grid md:grid-cols-2 gap-8 my-10">
        <TodoList />
        <div className="flex flex-col gap-8 w-full">
          <Appointments />
          <Reminders />
        </div>
      </section>
    </section>
  )
}
export default Home