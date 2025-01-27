import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';

const GoalForm = () => {
  const [cookies] = useCookies(['access_token']);
  const [goalData, setGoalData] = useState({
    goal_name: '',
    goal_amount: 0,
    amount_deposit: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGoalData((prevData) => ({
      ...prevData,
      [name]: name === 'goal_amount' || name === 'amount_deposit' ? parseInt(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = cookies['access_token'];
    if (token) {
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };
      axios
        .post(
          'https://ispay.onrender.com/api/dashboard/new-saving-goal',
          { ...goalData },
          { headers: headers },
        )
        .then((response) => {
          alert(response.data.message);
        })
        .catch((error) => {
          alert(error.response?.data?.message || 'Error creating goal');
        });
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Create Saving Goal</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
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

        <div>
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

        <div>
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
    </div>
  );
};

export default GoalForm;
