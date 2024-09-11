import './App.css'
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Leftside from "./components/Leftside.jsx";
import Rightside from "./components/Rightside.jsx";

function App() {
  
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default App
