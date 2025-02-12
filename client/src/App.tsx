import "./App.css";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div>
      {/* Ici on pourra mettre le header, la navigation, etc. */}
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
