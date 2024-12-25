import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { User, LogOut } from "lucide-react";
import Navbar from "./Navbar";
const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div>
      <Navbar />
      <div className="auth-container pt-16">
        <div className="auth-box">
          <h2 className="text-2xl font-bold mb-4">Dashboard.</h2>
          <p className="mb-4">Welcome, {user?.name}!</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
