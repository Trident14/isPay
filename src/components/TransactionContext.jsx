import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';

const TransactionContext = createContext();

export const useTransactions = () => {
  return useContext(TransactionContext); // Custom hook to access context values
};

export const TransactionProvider = ({ children }) => {
    
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cookies] = useCookies(['access_token']);
  

  // Fetch transactions function
  const fetchTransactions = useCallback(async () => {
    setLoading(true);
    try {
      const token = cookies.access_token;

      // Fetch transactions (not balance)
      const response = await axios.get('http://localhost:3080/api/dashboard/all-transaction', {
        headers: { Authorization: `Bearer ${token}` },  // Correct Bearer token syntax
      });

      // Sort transactions by `created_at` in descending order (latest first)
      const sortedTransactions = response.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

      // Set sorted transactions data
      setTransactions(sortedTransactions);
      setLoading(false);
    } catch (err) {
      setError("Error fetching transactions");
      setLoading(false);
    }
  }, [cookies.access_token]);

  // Automatically fetch transactions on component mount
  useEffect(() => {
    fetchTransactions(); // Trigger the fetch on mount
  }, [fetchTransactions]); // Dependency on fetchTransactions to avoid infinite loops

  // Derive latest 3 transactions
  const latestTransactions = transactions.slice(0, 3);

  // Expose state and functions in the context
  const value = {
    transactions,
    setTransactions,
    loading,
    error,
    fetchTransactions, // Exposing fetchTransactions to be called manually
    latestTransactions, // Latest 3 transactions
  };

  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  );
};
