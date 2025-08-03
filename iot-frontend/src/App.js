import React, { Suspense, lazy } from "react";
import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import ThemeToggle from "./components/ThemeToggle";
import { PrivateRoute } from "./components/PrivateRoute";
import { ThemeContext } from "./context/ThemeContext";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));

function App() {
  const { theme } = useContext(ThemeContext);
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: theme === "dark" ? "#121212" : "#ffffff",
        color: theme === "dark" ? "#f0f0f0" : "#000000",
        transition: "all 0.3s ease",
      }}
    >
      <ThemeToggle />
      <Suspense fallback={<div className="p-4">Loading...</div>}>
        <Routes>
          <Route path="/" element={<Register/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
