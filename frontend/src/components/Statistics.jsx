import React, { useState, useEffect } from 'react';
import axios from 'axios';

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const Statistics = ({ month }) => {
  const [stats, setStats] = useState({ totalSaleAmount: 0, soldItems: 0, notSoldItems: 0 });

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/stats?month=${month}`);
        setStats(data);
      } catch (error) {
        console.error('Error fetching statistics:', error);
      }
    };
    fetchStatistics();
  }, [month]);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md my-10">
      <h2 className="text-3xl font-bold text-center text-blue-600 mb-4">Statistics - {monthNames[month]}</h2>
      <div className="grid grid-cols-3 gap-8">
        <div className="bg-blue-100 p-4 text-center rounded-lg shadow">
          <h3 className="text-xl font-semibold">Total Sales</h3>
          <p className="text-2xl font-bold">${stats.totalSaleAmount.toFixed(2)}</p>
        </div>
        <div className="bg-blue-100 p-4 text-center rounded-lg shadow">
          <h3 className="text-xl font-semibold">Sold Items</h3>
          <p className="text-2xl font-bold">{stats.soldItems}</p>
        </div>
        <div className="bg-blue-100 p-4 text-center rounded-lg shadow">
          <h3 className="text-xl font-semibold">Not Sold Items</h3>
          <p className="text-2xl font-bold">{stats.notSoldItems}</p>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
