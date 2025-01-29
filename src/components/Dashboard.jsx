import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar'; // Import Sidebar component
import Header from './DashboardComponents/Header';
import { useCookies } from 'react-cookie';

import { QueryClient, QueryClientProvider,useQueries } from '@tanstack/react-query';
export const queryClient = new QueryClient();

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]); // To store all transactions
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [cookies] = useCookies(['access_token']);

  return (
   
    <div className="flex">
      <QueryClientProvider client={queryClient}>
        {/* Sidebar Component */}
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 min-h-screen overflow-y-auto bg-[#E5E7EB] lg:ml-64">
       
          {/* Pass latestTransactions to Header */}
          <Header  />


        </main>
      </QueryClientProvider>
    </div>
  );
};

export default Dashboard;
