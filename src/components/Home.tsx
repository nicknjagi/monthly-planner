import Appointments from "./Appointments";
import CustomCalendar from "./CustomCalendar";
import Goals from "./Goals";
import Reminders from "./Reminders";
import TodoList from "./TodoList";
import { months } from "../utils";
import { useAppSelector } from "../hooks"; 

const Home = () => {
  const {currentMonth} = useAppSelector(state => state.date)
  return (
    <section className="px-4 pt-8 pb-6 md:px-8 max-w-5xl mx-auto">
      <div className="flex justify-between">
        <img
          className="w-28 md:w-40 h-fit aspect-[3/2] -translate-x-2 md:-translate-x-6"
          src="./assets/images/logo.png"
          alt="logo"
        />
        <div className="flex flex-col justify-end">
          <h1 className="text-right">
            <span className="inline-block mb-2 text-3xl md:text-5xl font-lato capitalize">
              {months[currentMonth]}
            </span>
          </h1>
          <h1 className="font-semibold tracking-widest text-right mb-8">
            <span className="inline-block font-semibold ">
              {new Date().getFullYear()}
            </span>{" "}
            <span className="block">DIGITAL PLANNER</span>{" "}
          </h1>
        </div>
      </div>

      <div className="grid h-fit md:grid md:grid-cols-2 gap-8">
        <CustomCalendar />
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
  );
}
export default Home