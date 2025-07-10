import React, { useState } from 'react';
import './personalLoan.css';
import personalLoan from './../assets/personalLoan.jpg';
import { Header } from '../components/Header';


function PersonalLoan() {
  const [amount, setAmount] = useState(8400);
  const [term, setTerm] = useState(2); // years
  const [rate, setRate] = useState(3.84); // APR

  const calculateEMI = () => {
    const principal = amount;
    const monthlyRate = rate / 12 / 100;
    const numberOfMonths = term * 12;

    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfMonths)) /
      (Math.pow(1 + monthlyRate, numberOfMonths) - 1);

    return emi ? emi.toFixed(2) : '0.00';
  };

  return (
    <>
    <Header/>
    <div className="pl-container">
      {/* Top Banner */}
      <div className="pl-banner">
        <div className="pl-image">
          <img src={personalLoan} alt="Smiling Woman" />
        </div>
        <div className="pl-info">
          <h1>Personal Loans</h1>
          <p>Shop and compare the best rates</p>
          <button className="pl-btn">Apply Now</button>
        </div>
      </div>

      {/* Features */}
      <div className="pl-features">
        <div className="pl-feature-box">💳<p>Personal Loans</p></div>
        <div className="pl-feature-box">💳<p>Credit Card</p></div>
        <div className="pl-feature-box">📊<p>Debt Consolidation</p></div>
        <div className="pl-feature-box">🐷<p>Savings Account</p></div>
      </div>

      {/* Benefits */}
      <div className="pl-benefits">
        <div><h3>Loans up to $100k</h3><p>as soon as next day</p></div>
        <div><h3>Get Personal Loan Offers</h3><p>No impact to credit score</p></div>
        <div><h3>Low rates starting</h3><p>at 3.84% APR</p></div>
      </div>

      {/* Loan Calculator */}
      <div className="pl-calculator">
        <h2>How much would you like to borrow?</h2>

        <div className="pl-calc-form">
          <label>
            Loan Amount ($)
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              min="1000"
              max="100000" />
          </label>
          <label>
            Loan Term (Years)
            <input
              type="number"
              value={term}
              onChange={(e) => setTerm(Number(e.target.value))}
              min="1"
              max="10" />
          </label>
          <label>
            Interest Rate (% APR)
            <input
              type="number"
              step="0.01"
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              min="1"
              max="30" />
          </label>
        </div>

        <div className="pl-calc-grid">
          <div>
            <p className="pl-label">Loan Amount</p>
            <h3>${amount}</h3>
          </div>
          <div>
            <p className="pl-label">Loan Term</p>
            <h3>{term} Years</h3>
          </div>
          <div>
            <p className="pl-label">Interest Rate</p>
            <h3>{rate}%</h3>
          </div>
          <div>
            <p className="pl-label">Estimated EMI</p>
            <h3>${calculateEMI()}/mo</h3>
          </div>
        </div>
        <button className="pl-btn apply-btn">Apply Now</button>
      </div>
    </div>
    </>
  );
}

export default PersonalLoan;
