import "./App.css";
import Navbar from "./components/Navbar";
import Welcome from "./components/Welcome";
import Dashboard from "./components/Dashboard";

function   App() {
  return (
    <div>
      <Navbar />  
      <Welcome />
      <Dashboard />
    </div>
  );
}

export default App;