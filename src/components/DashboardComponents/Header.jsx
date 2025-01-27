import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import TransferForm from '../Form/TransferForm';
import GoalForm from '../Form/GoalForm';

const Header = () => {
  const [balance, setBalance] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [savingGoals, setSavingGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isTransferOpen, setIsTransferOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isSavingGoalActive, setIsSavingGoalActive] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isGoalFormOpen, setIsGoalFormOpen] = useState(false);

  const [cookies] = useCookies(['access_token']);
  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const fetchData = async () => {
    try {
      const token = cookies.access_token;

      const balanceResponse = await axios.get('http://localhost:3080/api/dashboard/balance', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBalance(balanceResponse.data.balance);

      const transactionsResponse = await axios.get('http://localhost:3080/api/dashboard/all-transaction', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTransactions(Array.isArray(transactionsResponse.data) ? transactionsResponse.data : []);

      const savingsResponse = await axios.get('http://localhost:3080/dashboard/all-savings-goal', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSavingGoals(Array.isArray(savingsResponse.data) ? savingsResponse.data : []);
      setIsSavingGoalActive(savingsResponse.data.length > 0);
      
      setLoading(false);
    } catch (err) {
      setError('Error fetching data');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [cookies.access_token]);

  const handleReloadBalance = () => {
    setLoading(true);
    fetchData();
  };

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
          setIsSavingGoalActive(true);
        })
        .catch((error) => {
          alert(error.response?.data?.message || "Error enabling saving goal.");
        });
    }
  };

  if (loading) return <div>Loading...</div>;

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
      {isTransferOpen && <TransferForm onClose={() => setIsTransferOpen(false)} />}
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

        <div className="bg-white p-6 rounded-lg border border-neutral-200/20">
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-600">Savings Goals</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            {isSavingGoalActive ? `${savingGoals.length} Active Goals` : 'No Active Goals'}
          </h2>
          {/* Show New Goal button if there are active goals, else show Activate Saving Goal button */}
          {isSavingGoalActive ? (
            <button
            onClick={() => setIsGoalFormOpen(true)}  // You can redirect to goal creation page or handle logic for creating new goal
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              New Goal
            </button>
          ) : (
            <button
              onClick={() => setIsTermsOpen(true)}  // Open terms and conditions modal
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
          {transactions.length > 0 ? (
            <div className="space-y-4">
              {transactions.map((transaction, index) => (
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
      </div>

      {/* Terms and Conditions Modal */}
      {isTermsOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg max-w-sm w-full">
            <h2 className="text-xl font-bold mb-4">Activate Saving Goal</h2>
            <p className="text-gray-600 mb-4">Please read and accept the terms and conditions to activate saving goals.</p>

            {/* Terms and Conditions */}
            <div className="mb-4 max-h-48 overflow-auto border-b border-gray-300 pb-4">
              <h3 className="font-semibold text-lg mb-2">Terms and Conditions</h3>
              <p className="text-sm text-gray-700">
                These Terms and Conditions ("Terms") govern your use of the Savings Goal feature provided by isPay. By creating and using a Savings Goal, you acknowledge that you have read, understood, and agree to be bound by these Terms.
              </p>
              <ul className="list-decimal list-inside mt-2 text-sm text-gray-700">
                <li><strong>Purpose of the Savings Goal:</strong> The Savings Goal feature is designed to help you set aside money for specific financial goals.</li>
                <li><strong>Bank's Right to Use Funds:</strong> In the event of insufficient funds, the Bank may access your Savings Goal funds.</li>
                <li><strong>Deletion of Savings Goals:</strong> You may delete your Savings Goal at any time, and any remaining funds will be returned to your primary balance.</li>
                <li><strong>No Separate Account:</strong> The Savings Goal is a virtual sub-feature of your primary account.</li>
                <li><strong>Liability:</strong> The Bank is not liable for any loss caused by accessing the Savings Goal funds or deletion of a goal.</li>
              </ul>
            </div>

            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="terms"
                className="mr-2"
                required
                checked={isChecked}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="terms" className="text-gray-600">I agree to the terms and conditions.</label>
            </div>

            {/* Message prompting user to check the box */}
            {!isChecked && (
              <p className="text-red-600 text-sm mb-4">
                Please check the box to accept the terms and conditions.
              </p>
            )}

            <div className="flex justify-between">
              <button
                onClick={() => setIsTermsOpen(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleEnableSavingGoal}
                disabled={!isChecked}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300"
              >
                Activate Saving Goal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
