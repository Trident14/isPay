import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { useQueryClient } from '@tanstack/react-query';

const GoalForm = ({ onClose }) => {
  const queryClient = useQueryClient();
  
  const [cookies] = useCookies(['access_token']);
  const [goalData, setGoalData] = useState({
    goal_name: '',
    goal_amount: 0,
    amount_deposit: 0,
  });
  const refetchBalance = () => {
    queryClient.invalidateQueries(['balanceFetch']);
    queryClient.invalidateQueries(['transactions']);
    queryClient.invalidateQueries(['savingGoals']);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGoalData((prevData) => ({
      ...prevData,
      [name]: name === 'goal_amount' || name === 'amount_deposit' ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = cookies['access_token'];
    if (token) {
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };
      try {
        const response = await axios.post(
          'https://ispay-server.onrender.com/api/dashboard/new-saving-goal',
          { ...goalData },
          { headers: headers },
        );
        alert(response.data.message);
        refetchBalance();
        onClose(); // Close the modal after successful submission
      } catch (error) {
        alert(error.response?.data?.message || 'Error creating goal');
      }
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg max-w-sm w-full">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Create Saving Goal</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="goal_name" className="block text-sm font-medium text-gray-600">
              Goal Name:
            </label>
            <input
              type="text"
              id="goal_name"
              name="goal_name"
              value={goalData.goal_name}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="goal_amount" className="block text-sm font-medium text-gray-600">
              Goal Amount ($):
            </label>
            <input
              type="number"
              id="goal_amount"
              name="goal_amount"
              value={goalData.goal_amount}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="amount_deposit" className="block text-sm font-medium text-gray-600">
              Amount Deposit ($):
            </label>
            <input
              type="number"
              id="amount_deposit"
              name="amount_deposit"
              value={goalData.amount_deposit}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Submit
            </button>
          </div>
        </form>

        <button
          onClick={onClose}
          className="mt-4 text-sm text-red-500 hover:text-red-700 w-full text-center"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default GoalForm;
