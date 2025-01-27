import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';

const TransferForm = ({ onClose }) => {
  const [error, setError] = useState('');
  const [transferData, setTransferData] = useState({
    username: '',
    amount: '',
  });

  const [cookies] = useCookies(['access_token']);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTransferData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const token = cookies['access_token'];

    if (!transferData.username || !transferData.amount) {
      setError('Please fill in all fields.');
      return;
    }

    if (token) {
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

        alert(response.data.message);
        setTransferData({ username: '', amount: '' });
        onClose(); // Close modal on success
      } catch (error) {
        setError(error.response?.data?.message || 'Transfer failed');
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Send Money</h2>

        {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}

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
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Send Money
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransferForm;
