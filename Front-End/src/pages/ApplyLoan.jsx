import React, { useState } from 'react';
import './ApplyLoan.css';
import { Header } from '../components/Header';




function ApplyLoan() {
  const [formData, setFormData] = useState({
    type: '',
    amount: '',
    tenure: '',
    purpose: '',
    document: null
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
    <Header/>
    <div className="apply-loan-container">
      <h2>Apply for a Loan</h2>

      {!submitted ? (
        <form className="loan-form" onSubmit={handleSubmit}>
          <label>
            Loan Type:
            <select name="type" value={formData.type} onChange={handleChange} required>
              <option value="">-- Select Loan Type --</option>
              <option value="Personal Loan">Personal Loan</option>
              <option value="Home Loan">Home Loan</option>
              <option value="Car Loan">Car Loan</option>
              <option value="Education Loan">Education Loan</option>
            </select>
          </label>

          <label>
            Amount:
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Tenure (in months):
            <input
              type="number"
              name="tenure"
              value={formData.tenure}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Purpose:
            <textarea
              name="purpose"
              value={formData.purpose}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Upload Document:
            <input
              type="file"
              name="document"
              onChange={handleChange}
              accept=".pdf,.jpg,.png"
            />
          </label>

          <button type="submit">Submit Application</button>
        </form>
       
      ) : (
        <div className="summary">
          <h3>Application Summary</h3>
          <ul>
            <li><strong>Loan Type:</strong> {formData.type}</li>
            <li><strong>Amount:</strong> ${formData.amount}</li>
            <li><strong>Tenure:</strong> {formData.tenure} months</li>
            <li><strong>Purpose:</strong> {formData.purpose}</li>
            <li>
              <strong>Document:</strong> {formData.document ? formData.document.name : 'Not uploaded'}
            </li>
          </ul>
          <p style={{ marginTop: '20px', color: 'green' }}>
            ✅ Your loan application has been submitted successfully.
          </p>
        </div>
       
      )}
    </div>
      </>
  );
}

export default ApplyLoan;
