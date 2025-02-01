import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const TransferForm = ({ onClose, fetchTransactions }) => {
  const [loading, setLoading] = useState(false); 
  const queryClient = useQueryClient();
  const [transferData, setTransferData] = useState({
    username: '',
    amount: '',
  });

  const [cookies] = useCookies(['access_token']);
  const refetchBalance = () => {
    queryClient.invalidateQueries(['balanceFetch']);
    queryClient.invalidateQueries(['transactions']);
    queryClient.invalidateQueries(['savingGoals']); 
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTransferData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = cookies['access_token'];
  
    if (!transferData.username || !transferData.amount) {
      alert('Please fill in all fields.');
      return;
    }
  
    if (token) {
      setLoading(true);
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };
  
      try {
        const response = await axios.patch(
          `http://localhost:3080/api/dashboard/transfer`,
          {
            username: transferData.username,
            amount: Number(transferData.amount),
          },
          { headers: headers }
        );
  
        // ✅ If the request is successful, show success message
        if (response.status === 200) {
          alert(response.data.message);
          onClose();
          refetchBalance();
        }
      } catch (error) {
        console.error(error);
        // ✅ Show failure message only if an error occurs
        alert(error.response?.data?.message || 'Transfer failed');
        refetchBalance();
      } finally {
        setLoading(false);
      }
    }
  };
  

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Send Money</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Username</label>
            <input
              type="text"
              name="username"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-black"
              placeholder="Enter recipient's username"
              value={transferData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Amount</label>
            <input
              type="number"
              name="amount"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-black"
              placeholder="Enter amount"
              value={transferData.amount}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-4 py-2 ${loading ? 'bg-gray-400' : 'bg-blue-600'} text-white rounded-lg hover:${loading ? '' : 'bg-blue-700'} transition`}
              disabled={loading} // Disable the button while loading
            >
              {loading ? 'Processing...' : 'Send Money'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransferForm;
