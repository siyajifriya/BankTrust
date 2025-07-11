import React from 'react';
import './MyLoans.css';
import { Header } from '../components/Header';




function MyLoans() {
  
  const loans = [
    {
      id: 1,
      type: "Personal Loan",
      amount: "$5,000",
      status: "Approved",
      interestRate: "10%",
      tenure: "24 months",
      emi: "$235",
      nextDue: "August 15, 2025"
    },
    {
      id: 2,
      type: "Car Loan",
      amount: "$10,000",
      status: "Closed",
      interestRate: "8.5%",
      tenure: "36 months",
      emi: "$315",
      nextDue: "N/A"
    }
  ];

  return (

    <div className="loans-page">
      <Header/>
      <h2>My Loans</h2>
      <table className="loan-table">
        <thead>
          <tr>
            <th>Type</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Interest Rate</th>
            <th>Tenure</th>
            <th>EMI</th>
            <th>Next Due</th>
          </tr>
        </thead>
        <tbody>
          {loans.map((loan) => (
            <tr key={loan.id}>
              <td>{loan.type}</td>
              <td>{loan.amount}</td>
              <td>{loan.status}</td>
              <td>{loan.interestRate}</td>
              <td>{loan.tenure}</td>
              <td>{loan.emi}</td>
              <td>{loan.nextDue}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  );
}

export default MyLoans;
