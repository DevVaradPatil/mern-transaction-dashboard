import React, { useState, useEffect } from "react";
import axios from "axios";
import TransactionsTable from "./components/TransactionsTable";
import Statistics from "./components/Statistics";
import BarChart from "./components/BarChart";
import MonthDropdown from "./components/MonthDropdown";

function App() {
  const [month, setMonth] = useState(0);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const data = await axios.get(`http://localhost:5000/api/seed`);
      setData(data);
    };
    fetchTransactions();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-blue-600 text-center mb-4">
        Transactions Dashboard
      </h1>

      <div className="w-full flex justify-between items-center">
        
      {/* Month Dropdown */}
      <MonthDropdown selectedMonth={month} setMonth={setMonth} />

      {/* Search Box */}
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search Transactions"
        className="border border-gray-300 p-2 mb-4 w-1/3 rounded-md"
      />
      </div>

      {data && (
        <div>
          {/* Transactions Table */}
          <TransactionsTable
            month={month}
            search={search}
            page={page}
            setPage={setPage}
          />

          {/* Statistics */}
          <Statistics month={month} />

          {/* Bar Chart */}
          <BarChart month={month} />
        </div>
      )}
    </div>
  );
}

export default App;
