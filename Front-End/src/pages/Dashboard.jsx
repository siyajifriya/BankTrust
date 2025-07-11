// import React from 'react';
// import './Dashboard.css';
// import { Header } from '../components/Header';



// const Dashboard = () => {
//   return (
//     <>
//     <Header/>
//     <div className="dashboard-container">
//       {/* Sidebar */}
//       <aside className="sidebar">
//         <h2 className="logo">💸 LoanPro</h2>
//         <nav>
//           <a href="#">🏠 Dashboard</a>
//           <a href="/profile">👤 Profile</a>

//           <details>
//             <summary>📄 Applications</summary>
//             <ul>
//               <li><a href="#">New Application</a></li>
//             </ul>
//           </details>

//           <details>
//             <summary>💰Active Loans</summary>
//             <ul>
//                <li><a href="/personalloan">Personal Loan</a></li>
//               <li><a href="#">Education Loan</a></li>
//             </ul>
//           </details>

//           <details>
//             <summary>🛠 Services</summary>
//             <ul>
//               <li><a href="#">EMI Schedule</a></li>
//               {/* <li><a href="#">Business Loan</a></li> */}
//             </ul>
//           </details>

//           <details>
//             <summary>🚪 Logout</summary>
//             <ul>
//               <li><a href="#">Logout</a></li>
//               <li><a href="#">Switch User</a></li>
//             </ul>
//           </details>
//         </nav>
//       </aside>

//       {/* Main Content */}
//       <main className="main-content">
//         <header className="topbar">
//           <h1>Dashboard</h1>
//           <div className="user-info">Welcome, John Doe</div>
//         </header>

//         <section className="summary-cards">
//           <div className="card">
//             <h3>Total Loans</h3>
//             <p>₹1,25,000</p>
//           </div>
//           <div className="card">
//             <h3>Approved</h3>
//             <p>₹85,000</p>
//           </div>
//           <div className="card">
//             <h3>Pending</h3>
//             <p>₹40,000</p>
//           </div>
//         </section>

//         <section className="recent-section">
//           <h2>Recent Loan Applications</h2>
//           <table>
//             <thead>
//               <tr>
//                 <th>Applicant</th>
//                 <th>Loan Type</th>
//                 <th>Status</th>
//                 <th>Amount</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr>
//                 <td>Amit Sharma</td>
//                 <td>Home Loan</td>
//                 <td className="status approved">Approved</td>
//                 <td>₹50,000</td>
//               </tr>
//               <tr>
//                 <td>Priya Verma</td>
//                 <td>Education Loan</td>
//                 <td className="status pending">Pending</td>
//                 <td>₹30,000</td>
//               </tr>
//               <tr>
//                 <td>Rahul Jain</td>
//                 <td>Business Loan</td>
//                 <td className="status rejected">Rejected</td>
//                 <td>₹45,000</td>
//               </tr>
//             </tbody>
//           </table>
//         </section>
//       </main>
//     </div>
//     </>
//   );
// };

// export default Dashboard;



import React from 'react';
import './Dashboard.css';
import { Header } from '../components/Header';


function Dashboard() {
  const user = {
    name: "liya",
    email: "liya@gmail.com",
    phone: "+91 7024764598",
    appliedLoan: {
      type: "Personal Loan",
      amount: "$5,000",
      status: "Approved"
    },
    account: {
      number: "1234 5678 9012",
      ifsc: "BANK0001234",
      bank: "LoanBank Ltd.",
      type: "Savings"
    },
    summary: [
      { title: "Active Loans", value: 2 },
      { title: "Outstanding Balance", value: "$12,500" },
      { title: "Next EMI", value: "August 15, 2025" }
    ],
    recent: [
      "Paid $500 on July 5, 2025",
      "Applied for loan on June 30, 2025"
    ]
  };

  return (
    <>
    <Header/>
    <div className="dashboard-wrapper">
      <aside className="sidebar">
        <h2>LoanPortal</h2>
        <ul>
          <li><a href="">Dashboard</a></li>
          <li><a href="/my-loans">My Loans</a></li>
          <li><a href="/apply-loan">Apply for Loan</a></li>
          <li><a href="/emischedule">EMI Schedule</a></li>
          <li><a href="/logout">Logout</a></li>
        </ul>
      </aside>

      <div className="main">
        <header className="main-header">
          <span>Welcome, {user.name}</span>
        </header>

        {/* Profile Section */}
        <section className="profile-section">
          <h2>Profile Details</h2>
          <ul>
            <li><strong>Name:</strong> {user.name}</li>
            <li><strong>Email:</strong> {user.email}</li>
            <li><strong>Phone:</strong> {user.phone}</li>
            <li><strong>Loan Type:</strong> {user.appliedLoan.type}</li>
            <li><strong>Loan Amount:</strong> {user.appliedLoan.amount}</li>
            <li><strong>Loan Status:</strong> {user.appliedLoan.status}</li>
          </ul>

          <h2 style={{ marginTop: '30px' }}>Account Details</h2>
          <ul>
            <li><strong>Account Number:</strong> {user.account.number}</li>
            <li><strong>IFSC Code:</strong> {user.account.ifsc}</li>
            <li><strong>Bank:</strong> {user.account.bank}</li>
            <li><strong>Account Type:</strong> {user.account.type}</li>
          </ul>
        </section>

        {/* Summary Cards */}
        <section className="summary-section">
          {user.summary.map((item, i) => (
            <div className="summary-card" key={i}>
              <h3>{item.title}</h3>
              <p>{item.value}</p>
            </div>
          ))}
        </section>

        {/* Recent Activity */}
        <section className="activity-section">
          <h2>Recent Activity</h2>
          <ul>
            {user.recent.map((act, i) => (
              <li key={i}>{act}</li>
            ))}
          </ul>
        </section>
      </div>
    </div>
    </>
  );
}

export default Dashboard;
