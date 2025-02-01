import React from 'react';
import Sidebar from './Sidebar';
import Header from './DashboardComponents/Header';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { motion } from 'framer-motion';

export const queryClient = new QueryClient();

const Dashboard = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col">
        <div className="w-64 flex-none">
          <Sidebar />
        </div>
        <div className="flex-1 "> 
          <Header />
        </div>
      </div>
    </QueryClientProvider>
  );
};

export default Dashboard;
