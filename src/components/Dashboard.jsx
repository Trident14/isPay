import React from 'react';
import { Route, Routes } from 'react-router-dom'; // For routing
import Sidebar from './Sidebar'; // Import Sidebar component

// Different pages or sections of your Dashboard
// import DashboardHome from './DashboardHome';
// import Transactions from './Transactions';
// import Savings from './Savings';
import Header from './DashboardComponents/Header';

const Dashboard = () => {
  return (
    <div className="flex">
      {/* Sidebar Component */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 ml-0 lg:ml-64 min-h-screen overflow-y-auto bg-[#E5E7EB]">

        <Header />
      </main>
    </div>
  );
};

export default Dashboard;
