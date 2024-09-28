import React from 'react';

const MonthDropdown = ({ selectedMonth, setMonth }) => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <select
      value={selectedMonth}
      onChange={(e) => setMonth(e.target.value)}
      className="border border-gray-300 p-2 mb-4 rounded-md"
    >
      {months.map((month, index) => (
        <option key={month} value={index}>
          {month}
        </option>
      ))}
    </select>
  );
};

export default MonthDropdown;
