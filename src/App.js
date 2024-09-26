import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import TaskBoard from "./components/Task/TaskBoard";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Navbar from "./components/Layout/Navbar";
import { getToken } from "./utils/auth";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const App = () => {
  const isAuthenticated = !!getToken();

  return (
    <DndProvider backend={HTML5Backend}>
      <Router>
         <Navbar/>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/tasks"
            element={ <TaskBoard />}
          />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </DndProvider>
  );
};

export default App;
