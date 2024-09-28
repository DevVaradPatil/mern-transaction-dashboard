import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TransactionsTable = ({ month, search, page, setPage }) => {
  const [transactions, setTransactions] = useState([]);
  const [total, setTotal] = useState(0);
  const perPage = 5;

  useEffect(() => {
    const fetchTransactions = async () => {
      const { data } = await axios.get(
        `http://localhost:5000/api/transactions?search=${search}&month=${month}&page=${page}&perPage=${perPage}`
      );
      setTransactions(data.transactions);
      setTotal(data.total);
    };
    fetchTransactions();
  }, [month, search, page]);

  const totalPages = Math.ceil(total / perPage);

  return (
    <div>
      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead className="bg-blue-500 text-white">
          <tr>
            <th className="border p-3">ID</th>
            <th className="border p-3">Title</th>
            <th className="border p-3">Description</th>
            <th className="border p-3">Price</th>
            <th className="border p-3">Category</th>
            <th className="border p-3">Sold</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length > 0 ? (
            transactions.map((transaction) => (
              <tr key={transaction._id} className="hover:bg-blue-100 transition duration-200">
                <td className="border p-3">{transaction._id}</td>
                <td className="border p-3">{transaction.title}</td>
                <td className="border p-3">{transaction.description}</td>
                <td className="border p-3">${transaction.price}</td>
                <td className="border p-3">{transaction.category}</td>
                <td className="border p-3">{transaction.sold ? 'Yes' : 'No'}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="border p-3 text-center text-gray-500">No transactions found.</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="w-full flex mt-4 items-center justify-between">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="bg-blue-500 text-white px-4 py-2 mr-2 rounded-md disabled:opacity-70 disabled:bg-gray-400 transition duration-200 hover:bg-blue-600"
        >
          Previous
        </button>
        <p className="mx-2 text-gray-700">Page {page} of {totalPages}</p>
        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages} 
          className="bg-blue-500 text-white px-4 py-2 rounded-md disabled:opacity-70 disabled:bg-gray-400 transition duration-200 hover:bg-blue-600"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TransactionsTable;
