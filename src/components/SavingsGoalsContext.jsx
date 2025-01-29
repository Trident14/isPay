import React, { createContext, useState, useEffect, useContext } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';

// Create Context
const SavingsGoalsContext = createContext();

// Provider component
export const SavingsGoalsProvider = ({ children }) => {
  const [savingsGoals, setSavingsGoals] = useState([]);
  const [totalSavings, setTotalSavings] = useState(0);
  const [activeGoals, setActiveGoals] = useState(0);
  const [monthlySavingsRate, setMonthlySavingsRate] = useState(0);
  const [loading, setLoading] = useState(true);
  const [cookies] = useCookies(['access_token']);
  const [fetchTrigger, setFetchTrigger] = useState(0); // Manual trigger

  // Fetch savings goals
  const fetchSavingsGoals = async () => {
    try {
      setLoading(true);
      const token = cookies.access_token;
      if (!token) return;

      const response = await axios.get("http://localhost:3080/api/dashboard/all-savings-goal", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const goals = response.data;
      let total = 0, active = 0, monthlyRate = 0;
      goals.forEach((goal) => {
        total += goal.Total_amount || 0;
        if (goal.Total_amount < goal.goal_amount) active++;
        monthlyRate += goal.monthly_contribution || 0;
      });

      setSavingsGoals(goals);
      setTotalSavings(total);
      setActiveGoals(active);
      setMonthlySavingsRate(monthlyRate);
    } catch (error) {
      console.error("Error fetching savings goals:", error);
    } finally {
      setLoading(false);
    }
  };

  // Run only on mount or when `fetchTrigger` changes
  useEffect(() => {
    fetchSavingsGoals();
  }, [fetchTrigger]);

  // Expose data and fetch function
  return (
    <SavingsGoalsContext.Provider
      value={{
        savingsGoals,
        totalSavings,
        activeGoals,
        monthlySavingsRate,
        loading,
        fetchSavingsGoals,  // Manual fetch function
        triggerFetch: () => setFetchTrigger((prev) => prev + 1), // Trigger fetch manually
      }}
    >
      {children}
    </SavingsGoalsContext.Provider>
  );
};

// Custom hook to use the savings goals context
export const useSavingsGoals = () => useContext(SavingsGoalsContext);
