import { useState, useEffect } from "react";
import { useTransactions } from "../../components/TransactionContext"; // Import the useTransactions hook

const Transactions = () => {
  const { latestTransactions, fetchTransactions } = useTransactions(); // Get latestTransactions from context
  const [filteredTransactions, setFilteredTransactions] = useState(latestTransactions);
  const [filters, setFilters] = useState({
    transactionType: "all",
    dateRange: "all",
    search: "",
  });

  // Handle filter changes
  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    filterTransactions(newFilters);
  };

  // Filter logic
  const filterTransactions = (filters) => {
    const { transactionType, dateRange, search } = filters;

    let result = [...latestTransactions]; // Use the full data for filtering

    // Filter by transaction type
    if (transactionType !== "all") {
      result = result.filter((tx) => tx.transaction_type === transactionType);
    }

    // Filter by search (sendTo or description)
    if (search) {
      result = result.filter((tx) =>
        tx.sendTo.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Filter by date range
    if (dateRange !== "all") {
      const now = new Date();
      result = result.filter((tx) => {
        const txDate = new Date(tx.created_at);
        if (dateRange === "last7days") {
          return now - txDate <= 7 * 24 * 60 * 60 * 1000;
        }
        if (dateRange === "last30days") {
          return now - txDate <= 30 * 24 * 60 * 60 * 1000;
        }
        return true;
      });
    }

    setFilteredTransactions(result);
  };

  useEffect(() => {
    setFilteredTransactions(latestTransactions);
  }, [latestTransactions]); // If latestTransactions changes in context, update filtered transactions

  return (
    <div id="transactions" className="p-6 bg-[#E5E7EB]">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Transactions</h1>
      </header>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-neutral-200/20 p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Transaction Type Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Transaction Type
            </label>
            <select
              value={filters.transactionType}
              onChange={(e) =>
                handleFilterChange("transactionType", e.target.value)
              }
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
              <option value="all">All</option>
              <option value="credit">Credit</option>
              <option value="debit">Debit</option>
            </select>
          </div>

          {/* Date Range Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date Range
            </label>
            <select
              value={filters.dateRange}
              onChange={(e) => handleFilterChange("dateRange", e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
              <option value="all">All</option>
              <option value="last7days">Last 7 Days</option>
              <option value="last30days">Last 30 Days</option>
            </select>
          </div>

          {/* Search Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search
            </label>
            <input
              type="text"
              value={filters.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="Search by recipient"
            />
          </div>
        </div>
      </div>

      {/* Transactions List */}
      <div className="bg-white rounded-lg border border-neutral-200/20">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neutral-200/20">
                <th className="text-left p-6 text-gray-600">Date</th>
                <th className="text-left p-6 text-gray-600">Recipient</th>
                <th className="text-left p-6 text-gray-600">Type</th>
                <th className="text-right p-6 text-gray-600">Amount</th>
                <th className="text-right p-6 text-gray-600">Balance</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((tx, index) => (
                  <tr
                    key={index}
                    className="border-b border-neutral-200/20 hover:bg-gray-50"
                  >
                    <td className="p-6 text-gray-800">
                      {new Date(tx.created_at).toLocaleString()}
                    </td>
                    <td className="p-6 text-gray-800">{tx.sendTo}</td>
                    <td
                      className={`p-6 text-gray-800 ${
                        tx.transaction_type === "credit"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {tx.transaction_type.charAt(0).toUpperCase() +
                        tx.transaction_type.slice(1)}
                    </td>
                    <td
                      className={`p-6 text-right ${
                        tx.transaction_type === "credit"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {tx.transaction_type === "credit" ? "+" : "-"}
                      ${tx.amount.toFixed(2)}
                    </td>
                    <td className="p-6 text-right text-gray-800">
                      ${tx.balance.toFixed(2)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="p-6 text-center text-gray-500 font-medium"
                  >
                    No transactions found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
