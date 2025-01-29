import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar'; // Import Sidebar component
import Header from './DashboardComponents/Header';
import Transactions from './DashboardComponents/Transactions';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { TransactionProvider } from './TransactionContext';
import Savings from './DashboardComponents/SavingsGoal';
import { SavingsGoalsProvider } from './SavingsGoalsContext';

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]); // To store all transactions
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [cookies] = useCookies(['access_token']);

  return (
   
    <div className="flex">
      {/* Sidebar Component */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 min-h-screen overflow-y-auto bg-[#E5E7EB] lg:ml-64">
      <TransactionProvider>
      <SavingsGoalsProvider>

        {/* Pass latestTransactions to Header */}
        <Header  />

        {/* Pass filteredTransactions to Transactions */}
        <Transactions />
        <Savings />
        </SavingsGoalsProvider>

        </TransactionProvider>
      </main>
    </div>
  );
};

export default Dashboard;
