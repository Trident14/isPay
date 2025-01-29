import { useState } from 'react';

const TransactionPage = ({ transaction_Data }) => {
  // State for filters, pagination, and search
  const [dateRange, setDateRange] = useState('Last 7 days');
  const [transactionType, setTransactionType] = useState('All Transactions');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 10;

  // Function to get the start date based on the selected range
  const getDateRangeStart = (range) => {
    const today = new Date();
    switch (range) {
      case 'Last 7 days':
        return new Date(today.setDate(today.getDate() - 7));
      case 'Last 30 days':
        return new Date(today.setDate(today.getDate() - 30));
      case 'Last 3 months':
        return new Date(today.setMonth(today.getMonth() - 3));
      case 'Custom range':
        return new Date('2023-01-01'); // Replace with a custom range if needed
      default:
        return new Date(0); // Return the beginning of time if no range is selected
    }
  };

  // Filtered transaction data based on filters and search
  const filteredTransactions = transaction_Data?.filter((transaction) => {
    const isInDateRange = new Date(transaction.created_at) >= getDateRangeStart(dateRange);
    const isOfType = transactionType === 'All Transactions' || transaction.transaction_type.toLowerCase() === transactionType.toLowerCase();
    const matchesSearchQuery = searchQuery === '' || transaction.sendTo.toLowerCase().includes(searchQuery.toLowerCase()) || transaction.description?.toLowerCase().includes(searchQuery.toLowerCase());

    return isInDateRange && isOfType && matchesSearchQuery;
  });

  // Get current transactions based on pagination
  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = filteredTransactions.slice(indexOfFirstTransaction, indexOfLastTransaction);

  // Pagination logic
  const totalPages = Math.ceil(filteredTransactions.length / transactionsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Function to download the statement as CSV
  const downloadStatement = () => {
    const csvContent = [
      ['Date', 'Description', 'Amount'],
      ...filteredTransactions.map(transaction => [
        new Date(transaction.created_at).toLocaleString(),
        transaction.sendTo,
        transaction.transaction_type === 'credit' ? `+$${transaction.amount.toFixed(2)}` : `-$${transaction.amount.toFixed(2)}`
      ])
    ]
      .map(row => row.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'transactions_statement.csv';
    link.click();
  };

  return (
    <div id="transactions" className="p-6 bg-[#E5E7EB]">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Transactions</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center" onClick={downloadStatement}>
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
          </svg>
          Download Statement
        </button>
      </header>

      {/* Filters */}
      <div id="all-transactions" className="bg-white rounded-lg border border-neutral-200/20 p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
            <select
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
            >
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 3 months</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
            <select
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              value={transactionType}
              onChange={(e) => setTransactionType(e.target.value)}
            >
              <option>All Transactions</option>
              <option>Debit</option>
              <option>Credit</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="Search transactions"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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
                <th className="text-left p-6 text-gray-600">Description</th>
                <th className="text-right p-6 text-gray-600">Amount</th>
              </tr>
            </thead>
            <tbody>
              {currentTransactions.length === 0 ? (
                <tr>
                  <td colSpan="3" className="p-6 text-center text-gray-600">No transactions found</td>
                </tr>
              ) : (
                currentTransactions.map((transaction, index) => (
                  <tr key={index} className="border-b border-neutral-200/20 hover:bg-gray-50">
                    <td className="p-6 text-gray-800">{new Date(transaction.created_at).toLocaleString()}</td>
                    <td className="p-6">
                      <div className="flex items-center">
                        <div className={`w-8 h-8 ${transaction.transaction_type === 'credit' ? 'bg-green-100' : 'bg-blue-100'} rounded-full flex items-center justify-center mr-3`}>
                          <svg className={`w-4 h-4 ${transaction.transaction_type === 'credit' ? 'text-green-600' : 'text-blue-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={transaction.transaction_type === 'credit' ? "M12 4v16m8-8H4" : "M5 13l4 4L19 7"}></path>
                          </svg>
                        </div>
                        <span className="text-gray-800">{transaction.sendTo}</span>
                      </div>
                    </td>
                    <td className={`p-6 text-right ${transaction.transaction_type === 'credit' ? 'text-green-600' : 'text-red-600'}`}>
                      {transaction.transaction_type === 'credit' ? `+$${transaction.amount.toFixed(2)}` : `-$${transaction.amount.toFixed(2)}`}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-6 flex justify-between items-center">
          <button
            className="text-gray-600 hover:text-blue-600"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="text-gray-600">Page {currentPage} of {totalPages}</span>
          <button
            className="text-gray-600 hover:text-blue-600"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionPage;
