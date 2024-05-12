import Appointments from "./Appointments";
import CustomCalender from "./CustomCalender";
import Goals from "./Goals";
import Reminders from "./Reminders";
import TodoList from "./TodoList";
import { months } from "../utils";

const Home = () => {
  return (
    <section className="px-4 md:px-8 max-w-5xl mx-auto">
      <h1 className="text-center"><span className="inline-block mt-6 text-7xl font-lato capitalize translate-x-6 translate-y-2">{months[new Date().getMonth()]}</span></h1>
      <h1 className="font-semibold tracking-widest text-center mb-8">MONTHLY PLANNER <span className="inline-block -translate-y-2 font-medium ml-5">{new Date().getFullYear()}</span></h1>

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