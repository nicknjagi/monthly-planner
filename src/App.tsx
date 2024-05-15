
import Achievements from "./components/achievements";
import Home from "./components/Home";
import InstallButton from "./components/InstallButton";
import WeekView from "./components/WeekView";

function App() {
  return (
    <main>
      <InstallButton />
      <Home />
      <WeekView />
      <Achievements />
    </main>
  );
}

export default App;
