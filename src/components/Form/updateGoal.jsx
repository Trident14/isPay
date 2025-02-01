import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const UpdateGoalForm = ({ current_goal_name, onClose }) => {
    const queryClient = useQueryClient();
  const currentGoal = current_goal_name;
  const [error, setError] = useState('');
  const [amount, setAmount] = useState(0);
  const [cookies] = useCookies(['access_token']);

  const refetchBalance = () => {
    queryClient.invalidateQueries(['balanceFetch']);
    queryClient.invalidateQueries(['transactions']);
    queryClient.invalidateQueries(['savingGoals']);
  };


  const handleChange = (e) => {
    setAmount(e.target.value);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = cookies['access_token'];
    if (token) {
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };
      const requestBody = {
        goal_name: currentGoal,
        amount_deposit: amount,
      };
      try {
        const response = await axios.patch(
          'http://localhost:3080/api/dashboard/update-money-saving-goal',
          requestBody,
          { headers: headers }
        );
        alert(response.data.message);
        refetchBalance();
        onClose(); // Close the modal after successful submission
      } catch (error) {
        alert(error.response.data.message);
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg max-w-sm w-full">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Add Money to {currentGoal}</h3>
        <form onSubmit={handleSubmit}>
          {error && <p className="text-red-600 mb-2">{error}</p>}
          <label className="block text-gray-600 mb-2">
            Amount:
            <input
              type="number"
              name="amount"
              value={amount}
              onChange={handleChange}
              className="mt-2 p-2 border border-gray-300 rounded w-full"
              placeholder="Enter amount"
            />
          </label>
          <button
            type="submit"
            className="mt-4 w-full py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            Submit
          </button>
        </form>
        <button
          onClick={onClose}
          className="mt-4 text-sm text-red-500 hover:text-red-700"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default UpdateGoalForm;
