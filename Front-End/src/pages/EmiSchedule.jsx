import React from 'react';
import './EmiSchedule.css';

function EmiSchedule() {
  const emiData = [
    {
      id: 1,
      loanType: 'Personal Loan',
      dueDate: 'August 15, 2025',
      amount: '$250',
      status: 'Pending'
    },
    {
      id: 2,
      loanType: 'Car Loan',
      dueDate: 'August 20, 2025',
      amount: '$310',
      status: 'Pending'
    },
    {
      id: 3,
      loanType: 'Personal Loan',
      dueDate: 'July 15, 2025',
      amount: '$250',
      status: 'Paid'
    },
    {
      id: 4,
      loanType: 'Car Loan',
      dueDate: 'July 20, 2025',
      amount: '$310',
      status: 'Paid'
    }
  ];

  return (
    <div className="emi-container">
      <h2>EMI Schedule</h2>
      <table className="emi-table">
        <thead>
          <tr>
            <th>Loan Type</th>
            <th>Due Date</th>
            <th>EMI Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {emiData.map((emi) => (
            <tr key={emi.id}>
              <td>{emi.loanType}</td>
              <td>{emi.dueDate}</td>
              <td>{emi.amount}</td>
              <td className={emi.status.toLowerCase()}>{emi.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmiSchedule;
