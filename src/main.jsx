import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import App from "./App.jsx";
import Show from "./Show.jsx";
import HabitList from "./HabitList.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <App /> */}
    {/* <Show /> */}
    <HabitList />
  </StrictMode>
);
