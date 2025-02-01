import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import TransactionPage from './TransactionPage';
import SavingsGoals from '../DashboardComponents/SavingsGoals';
import TransferForm from '../Form/TransferForm';
import FAQ from '../Faq';
import Support from '../Support';

const Header = () => {
  const queryClient = useQueryClient();
  const [username, setUsername] = useState(null);
  const [cookies] = useCookies(['access_token']);
  const [showTransferForm, setTransferForm] = useState(false);
  const [popupStates, setPopupStates] = useState({
    createGoal: false,
    viewAllGoals: false,
    transaction: false,
    transfer: false,
    updateGoal: false,
  });
  const [isactivateSavings, setActiveSaving] = useState(false);

  const closePopups = () => {
    setPopupStates({
      createGoal: false,
      viewAllGoals: false,
      transaction: false,
      transfer: false,
      updateGoal: false,
    });
  };

  const checkSavingsActive = () => {
    const token = cookies["access_token"];
    if (token) {
      const headers = { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };
      axios
        .get("http://localhost:3080/api/dashboard/check-saving-goals-enable", { headers })
        .then((response) => setActiveSaving(response.data))
        .catch((error) => alert(error.data));
    }
  };

  const activateSavings = () => {
    const token = cookies["access_token"];
    if (token) {
      const user = localStorage.getItem("username");
      const headers = { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };
      axios
        .post("http://localhost:3080/api/dashboard/enable-saving-goals", { username: user }, { headers })
        .then(() => {
          alert("Saving Feature Active");
          setActiveSaving(true);
        })
        .catch((error) => alert(error.data.message));
    }
  };

  const fetchData = async (url, token) => {
    if (!token) throw new Error('Access token not found.');
    const headers = { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };
    const response = await axios.get(url, { headers });
    return response.data;
  };

  const { data: balance_response, error: balance_error, isLoading: balance_IsLoading } = useQuery({
    queryKey: ['balanceFetch'],
    queryFn: () => fetchData('http://localhost:3080/api/dashboard/balance', cookies['access_token']),
    staleTime: 30000,
    cacheTime: 60000,
    enabled: true,
  });

  const { data: goal_Data, error: goal_Error, isLoading: goal_IsLoading } = useQuery({
    queryKey: ['savingGoals'],
    queryFn: () => fetchData('http://localhost:3080/api/dashboard/all-savings-goal', cookies['access_token']),
    staleTime: 30000,
    cacheTime: 60000,
    enabled: true,
  });

  const { data: transaction_Data, error: transaction_Error, isLoading: transaction_IsLoading } = useQuery({
    queryKey: ['transactions'],
    queryFn: () => fetchData('http://localhost:3080/api/dashboard/all-transaction', cookies['access_token']),
    staleTime: 30000,
    cacheTime: 60000,
    enabled: true,
  });

  const withdrawalGoal = async (goalname) => {
    const token = cookies["access_token"];
    if (token) {
      const headers = { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };
      try {
        const response = await axios.patch(
          "http://localhost:3080/api/dashboard/withdrwal-money-sg",
          { goal_name: goalname },
          { headers }
        );
        alert(response.data.message);
      } catch (error) {
        alert(error);
      }
    }
  };

  const warningFunc = (goalname) => {
    const shouldProceed = window.confirm(`Are you sure you want to withdraw? This will delete the goal ${goalname}.`);
    if (shouldProceed) withdrawalGoal(goalname);
  };

  useEffect(() => {
    setUsername(localStorage.getItem('username'));
    checkSavingsActive();
  }, []);

  if (goal_IsLoading || transaction_IsLoading || balance_IsLoading) {
    return (
      <div className="loader">
        <div className="loader__text">Loading...</div>
        <div className="loader__spinner"></div>
      </div>
    );
  }

  if (goal_Error || transaction_Error || balance_error) {
    return <div>Error: {goal_Error?.message || transaction_Error?.data?.message || balance_error?.message}</div>;
  }

  return (
    
    <div id="dashboard" className="container mx-auto px-4 p-4 sm:p-6 bg-[#E5E7EB] mt-16 lg:mt-0 overflow-x-auto">
      {/* Header */}
      {showTransferForm && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <TransferForm onClose={() => setTransferForm(false)} />
        </div>
      )}
      <header className="flex flex-col sm:flex-row justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Dashboard</h1>
        <div className="flex items-center space-x-4">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            onClick={() => setTransferForm(!showTransferForm)}
          >
            Send Money
          </button>
        </div>
      </header>

      {/* Dashboard main content */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-lg transition-all duration-300">
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-600">Total Balance</span>
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">${balance_response?.balance}</h2>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg transition-all duration-300">
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-600">Savings Goals</span>
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">${goal_Data?.reduce((acc, goal) => acc + goal.goal_amount, 0)}</h2>
          <p className="text-blue-600 text-sm"> {goal_Data.length} active goals</p>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-lg shadow-lg transition-all duration-300 mb-8">
        <div className="p-6 border-b border-neutral-200/20">
          <h3 className="text-lg font-semibold text-gray-800">Recent Transactions</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {Array.isArray(transaction_Data?.transactions) && transaction_Data.transactions.length > 0 ? (
              transaction_Data.transactions.slice(0, 4).map((transaction, index) => (
                <div className="flex items-center justify-between" key={index}>
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-10 h-10 ${
                        transaction.transaction_type === 'credit' ? 'bg-green-100' : 'bg-blue-100'
                      } rounded-full flex items-center justify-center`}
                    >
                      <svg
                        className={`w-5 h-5 ${
                          transaction.transaction_type === 'credit' ? 'text-green-600' : 'text-blue-600'
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d={
                            transaction.transaction_type === 'credit'
                              ? 'M12 4v16m8-8H4'
                              : 'M5 13l4 4L19 7'
                          }
                        ></path>
                      </svg>
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-semibold text-gray-800">{transaction.sendTo}</h4>
                      <p className="text-sm text-gray-600">{transaction.transaction_type === 'credit' ? 'Received' : 'Sent'}</p>
                    </div>
                  </div>
                  <span className={`font-medium ${transaction.transaction_type === 'credit' ? 'text-green-600' : 'text-red-600'}`}>
                    {transaction.transaction_type === 'credit' ? `+${transaction.amount}` : `-${transaction.amount}`}
                  </span>
                </div>
              ))
            ) : (
              <p>No transactions available</p>
            )}
          </div>
          <a href="#transactions-section">
            <button className="mt-6 w-full py-3 text-blue-600 font-medium hover:text-blue-700 transition-colors">
              View All Transactions
            </button>
          </a>
        </div>
      </div>

      {/* Render Other Sections */}
      <div id='transactions-section'><TransactionPage transaction_Data={transaction_Data || { transactions: [] }} /></div>
<div><SavingsGoals goals={goal_Data} warningFunc={warningFunc} /></div>
<div className="mb-6"><FAQ /></div>  {/* Add bottom margin to FAQ */}
<div><Support /></div>

    </div>
  );
};

export default Header;
