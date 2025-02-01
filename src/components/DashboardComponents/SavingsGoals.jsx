import { useState } from 'react';
import UpdateGoalForm from "../Form/updateGoal";
import GoalForm from "../Form/GoalForm";
import { useQueryClient } from '@tanstack/react-query';

const SavingsGoals = ({ goals = [], warningFunc}) => {
  const [openForm, setOpenForm] = useState(null); // Handles both goal form and update form visibility
  const [showGoalForm, setShowGoalForm] = useState(false); // Track if GoalForm is open
  const queryClient = useQueryClient();
  const closeForm = () => setOpenForm(null);

  const refetchBalance = () => {
    queryClient.invalidateQueries(['balanceFetch']);
    queryClient.invalidateQueries(['transactions']);
    queryClient.invalidateQueries(['savingGoals']);  // Invalidating savingGoals after withdrawal
  };

  // Calculations for summary cards
  const totalSavings = goals.reduce((acc, goal) => acc + goal.Total_amount, 0);
  const activeGoals = goals.length;
  const nearCompletion = goals.filter(goal => (goal.Total_amount / goal.goal_amount) >= 0.8).length;

  return (
    <div id="savings" className="p-6 bg-gray-200 bg-white rounded-lg border border-neutral-200/20 mb-8">
      <header className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Savings Goals</h1>
        <div className='flex gap-2'>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            onClick={() => setShowGoalForm(!showGoalForm)} // Toggle GoalForm visibility
          >
            New Goal
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            onClick={() => refetchBalance()} // Toggle GoalForm visibility
          >
            Refresh
          </button>
        </div>
      </header>

      {/* Conditionally Render GoalForm */}
      {showGoalForm && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <GoalForm onClose={() => setShowGoalForm(false)} />
        </div>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg border">
          <h3 className="text-gray-600 mb-2">Total Savings</h3>
          <p className="text-3xl font-bold text-gray-800">${totalSavings.toFixed(2)}</p>
        </div>
        <div className="bg-white p-6 rounded-lg border">
          <h3 className="text-gray-600 mb-2">Active Goals</h3>
          <p className="text-3xl font-bold text-gray-800">{activeGoals}</p>
          <p className="text-blue-600 text-sm mt-2">{nearCompletion} Goals</p>
        </div>
      </div>

      {/* Savings Goals Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {goals.map((goal, index) => (
          <div key={index} className="bg-white rounded-lg border p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-800">{goal.goal_name}</h3>
                <p className="text-gray-600">Target: {goal.goal_target_date}</p>
              </div>
            </div>
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Progress</span>
                <span className="font-medium text-gray-800">${goal.Total_amount} / ${goal.goal_amount}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${(goal.Total_amount / goal.goal_amount) * 100}%` }}
                ></div>
              </div>
            </div>
            <div className="flex justify-between items-center text-sm mb-4">
              <span className="text-gray-600">Monthly Contribution</span>
              <span className="font-medium text-gray-800">${goal.monthly_contribution}</span>
            </div>
            <div className="flex justify-between">
              <button
                className="px-4 py-2 bg-green-500 text-white rounded-lg"
                onClick={() => setOpenForm(openForm === goal.goal_name ? null : goal.goal_name)}
              >
                Add Money
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-lg"
                onClick={() => {
                  warningFunc(goal.goal_name);      
                }}
              >
                Withdraw
              </button>
            </div>
            {openForm === goal.goal_name && (
              <div className="mt-4 p-4 bg-gray-100 rounded">
                <UpdateGoalForm current_goal_name={goal.goal_name} onClose={closeForm}  />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavingsGoals;
