import React from 'react';
import './Dashboard.css';
import { Header } from '../components/Header';



const Dashboard = () => {
  return (
    <>
    <Header/>
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="logo">💸 LoanPro</h2>
        <nav>
          <a href="#">🏠 Dashboard</a>
          <a href="/profile">👤 Profile</a>

          <details>
            <summary>📄 Applications</summary>
            <ul>
              <li><a href="#">New Application</a></li>
            </ul>
          </details>

          <details>
            <summary>💰Active Loans</summary>
            <ul>
               <li><a href="/personalloan">Personal Loan</a></li>
              <li><a href="#">Education Loan</a></li>
            </ul>
          </details>

          <details>
            <summary>🛠 Services</summary>
            <ul>
              <li><a href="#">EMI Schedule</a></li>
              {/* <li><a href="#">Business Loan</a></li> */}
            </ul>
          </details>

          <details>
            <summary>🚪 Logout</summary>
            <ul>
              <li><a href="#">Logout</a></li>
              <li><a href="#">Switch User</a></li>
            </ul>
          </details>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="topbar">
          <h1>Dashboard</h1>
          <div className="user-info">Welcome, John Doe</div>
        </header>

        <section className="summary-cards">
          <div className="card">
            <h3>Total Loans</h3>
            <p>₹1,25,000</p>
          </div>
          <div className="card">
            <h3>Approved</h3>
            <p>₹85,000</p>
          </div>
          <div className="card">
            <h3>Pending</h3>
            <p>₹40,000</p>
          </div>
        </section>

        <section className="recent-section">
          <h2>Recent Loan Applications</h2>
          <table>
            <thead>
              <tr>
                <th>Applicant</th>
                <th>Loan Type</th>
                <th>Status</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Amit Sharma</td>
                <td>Home Loan</td>
                <td className="status approved">Approved</td>
                <td>₹50,000</td>
              </tr>
              <tr>
                <td>Priya Verma</td>
                <td>Education Loan</td>
                <td className="status pending">Pending</td>
                <td>₹30,000</td>
              </tr>
              <tr>
                <td>Rahul Jain</td>
                <td>Business Loan</td>
                <td className="status rejected">Rejected</td>
                <td>₹45,000</td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>
    </div>
    </>
  );
};

export default Dashboard;


