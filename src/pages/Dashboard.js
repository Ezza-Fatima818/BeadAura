import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Palette from "../components/Palette";
import Canvas from "./Canvas";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="app-container">
      {/* You must import these or define them */}
      {/* <Palette />
      <Canvas /> */}
      
      <h1>Welcome Dashboard</h1>
      {user && <p>Hello, {user.name}</p>}
      <Palette />
      <Canvas />
    </div>
  );
};

export default Dashboard;