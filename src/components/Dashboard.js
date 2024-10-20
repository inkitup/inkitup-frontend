import React from 'react';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Dashboard</h2>
        <p>Welcome, {user?.name}!</p>
        <button onClick={logout} className="submit-btn">Logout</button>
      </div>
    </div>
  );
};

export default Dashboard;