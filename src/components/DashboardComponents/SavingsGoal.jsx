import { useState, useEffect } from "react";
import { useSavingsGoals } from "../../components/SavingsGoalsContext"; // Import custom hook

const Savings = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [goalName, setGoalName] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [targetDate, setTargetDate] = useState("");
  const [monthlyContribution, setMonthlyContribution] = useState("");
  
  const { savingsGoals, totalSavings, activeGoals, monthlySavingsRate, loading, fetchSavingsGoals } = useSavingsGoals();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setGoalName("");
    setTargetAmount("");
    setTargetDate("");
    setMonthlyContribution("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newGoal = {
      goal_name: goalName,
      goal_amount: targetAmount,
      target_date: targetDate,
      monthly_contribution: monthlyContribution,
    };

    // Send request to add new goal
    try {
      await axios.post("http://localhost:3080/api/dashboard/add-goal", newGoal, {
        headers: { Authorization: `Bearer ${cookies.access_token}` },
      });
      
      fetchSavingsGoals(); // Refresh goals
      closeModal();
    } catch (error) {
      console.error("Error adding goal:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div id="savings" className="p-6 bg-[#E5E7EB]">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Savings Goals</h1>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
          onClick={openModal}
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
          </svg>
          New Goal
        </button>
      </header>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg border border-neutral-200/20">
          <h3 className="text-gray-600 mb-2">Total Savings</h3>
          <p className="text-3xl font-bold text-gray-800">${totalSavings.toFixed(2)}</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-neutral-200/20">
          <h3 className="text-gray-600 mb-2">Active Goals</h3>
          <p className="text-3xl font-bold text-gray-800">{activeGoals}</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-neutral-200/20">
          <h3 className="text-gray-600 mb-2">Monthly Savings Rate</h3>
          <p className="text-3xl font-bold text-gray-800">${monthlySavingsRate.toFixed(2)}</p>
        </div>
      </div>

      {/* Check if there are savings goals */}
      {savingsGoals.length === 0 ? (
        <div className="text-center py-6 bg-white rounded-lg border border-neutral-200/20">
          <h3 className="text-xl font-semibold text-gray-800">Create your first savings goal to get started!</h3>
          <button
            className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            onClick={openModal}
          >
            Create Goal
          </button>
        </div>
      ) : (
        // Savings Goals Grid
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {savingsGoals.map((goal, index) => (
            <div key={index} className="bg-white rounded-lg border border-neutral-200/20 p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">{goal.goal_name}</h3>
                  <p className="text-gray-600">Target: {goal.target_date}</p>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path>
                  </svg>
                </button>
              </div>
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Progress</span>
                  <span className="font-medium text-gray-800">${goal.Total_amount} / ${goal.goal_amount}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${(goal.Total_amount / goal.goal_amount) * 100}%` }}></div>
                </div>
              </div>
              <div className="flex justify-between items-center text-sm mb-4">
                <span className="text-gray-600">Monthly contribution</span>
                <span className="font-medium text-gray-800">${goal.monthly_contribution}</span>
              </div>
              <button className="w-full py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
                Add Money
              </button>
            </div>
          ))}
        </div>
      )}

      {/* New Goal Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">Create New Savings Goal</h2>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Goal Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter goal name"
                  value={goalName}
                  onChange={(e) => setGoalName(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Target Amount</label>
                <input
                  type="number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter amount"
                  value={targetAmount}
                  onChange={(e) => setTargetAmount(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Target Date</label>
                <input
                  type="date"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  value={targetDate}
                  onChange={(e) => setTargetDate(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Contribution</label>
                <input
                  type="number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter monthly amount"
                  value={monthlyContribution}
                  onChange={(e) => setMonthlyContribution(e.target.value)}
                />
              </div>
              <div className="flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Create Goal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Savings;
