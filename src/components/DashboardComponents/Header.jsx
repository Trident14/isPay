import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useTransactions } from '../../components/TransactionContext';
import { useSavingsGoals } from '../../components/SavingsGoalsContext';
import axios from 'axios';
import TransferForm from '../Form/TransferForm';
import GoalForm from '../Form/GoalForm';

const Header = () => {
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isTransferOpen, setIsTransferOpen] = useState(false);
  const [isGoalFormOpen, setIsGoalFormOpen] = useState(false);
  const [isSavingGoalActive, setIsSavingGoalActive] = useState(false);
  const [cookies] = useCookies(['access_token']);
  const { latestTransactions, fetchTransactions } = useTransactions(); // Use fetchTransactions from context
  const { savingsGoals, totalSavings, activeGoals, monthlySavingsRate, loading: savingsLoading } = useSavingsGoals();

  // Fetch user balance
  const fetchBalance = async () => {
    try {
      const token = cookies.access_token;
      const balanceResponse = await axios.get('http://localhost:3080/api/dashboard/balance', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBalance(balanceResponse.data.balance);
      setLoading(false);
    } catch (err) {
      setError('Error fetching balance');
      setLoading(false);
    }
  };

  // Fetch transactions
  useEffect(() => {
    fetchBalance();
    fetchTransactions(); // Fetch transactions when the component mounts
  }, []);

  // Check if saving goal is enabled
  useEffect(() => {
    const checkSavingGoalStatus = async () => {
      try {
        const token = cookies.access_token;
        const response = await axios.get('http://localhost:3080/api/dashboard/check-saving-goals-enable', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setIsSavingGoalActive(response.data);
      } catch (err) {
        console.error('Error checking saving goal status:', err);
      }
    };
    checkSavingGoalStatus();
  }, []);

  // Handle reload balance
  const handleReloadBalance = () => {
    setLoading(true);
    fetchBalance();
    fetchTransactions();
  };

  // Handle transfer submission
  const handleTransferSuccess = () => {
    // After a successful transfer, re-fetch the balance and transactions
    fetchBalance();
    fetchTransactions();
    setIsTransferOpen(false); // Close the transfer modal
  };

  // Enable saving goal
  const handleEnableSavingGoal = async () => {
    const token = cookies["access_token"];
    if (token) {
      const user = localStorage.getItem("username");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
      axios
        .post(
          `http://localhost:3080/api/dashboard/enable-saving-goals`,
          { username: user },
          { headers: headers },
        )
        .then((response) => {
          alert("Saving Feature Active");
          setIsSavingGoalActive(true); // Enable saving goal after activation
        })
        .catch((error) => {
          alert(error.response?.data?.message || "Error enabling saving goal.");
        });
    }
  };

  if (loading || savingsLoading) return <div>Loading...</div>;

  return (
    <div id="dashboard" className="p-6 bg-[#E5E7EB]">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsTransferOpen(true)}  // Open transfer form modal
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Send Money
          </button>
          <button
            onClick={handleReloadBalance}  // Reload balance data
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Reload Balance
          </button>
        </div>
      </header>

      {/* Transfer Form Modal */}
      {isTransferOpen && <TransferForm onClose={() => setIsTransferOpen(false)} onSuccess={handleTransferSuccess} />}
      {isGoalFormOpen && <GoalForm onClose={() => setIsGoalFormOpen(false)} />}

      {/* Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg border border-neutral-200/20">
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-600">Total Balance</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">${balance}</h2>
          <p className="text-green-600 text-sm">+2.3% from last month</p>
        </div>

        {/* Savings Goals Card */}
        <div className="bg-white p-6 rounded-lg border border-neutral-200/20">
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-600">Savings Goals</span>
            {isSavingGoalActive && (
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
              </svg>
            )}
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">${totalSavings}</h2>
          {isSavingGoalActive ? (
            <>
              <p className="text-blue-600 text-sm">{activeGoals} active goals</p>
              <p className="text-sm text-gray-600">Monthly Contribution: ${monthlySavingsRate}</p>
            </>
          ) : (
            <button
              onClick={handleEnableSavingGoal}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Activate Saving Goal
            </button>
          )}
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-lg border border-neutral-200/20 mb-8">
        <div className="p-6 border-b border-neutral-200/20">
          <h3 className="text-lg font-semibold text-gray-800">Recent Transactions</h3>
        </div>
        <div className="p-6">
          {latestTransactions.length > 0 ? (
            <div className="space-y-4">
              {latestTransactions.map((transaction, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{transaction.transaction_type}</p>
                      <p className="text-sm text-gray-600">{transaction.sendTo}</p>
                    </div>
                  </div>
                  <span className={`font-medium ${transaction.transaction_type === 'credit' ? 'text-green-600' : 'text-red-600'}`}>
                    {transaction.transaction_type === 'credit' ? '+' : '-'}${transaction.amount}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p>No transactions available</p>
          )}
        </div>
        <a href='#transctions'><button >View all transactions</button></a>
      </div>

    </div>
  );
};

export default Header;
