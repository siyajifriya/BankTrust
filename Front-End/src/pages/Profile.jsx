import React, { useState } from 'react';
import './Profile.css';
import { Header } from '../components/Header';


const Profile = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <div className="profile-tab">
            <h2>Profile Settings</h2>
            <div className="avatar-block">
              <img src="https://i.pravatar.cc/100?img=32" alt="avatar" className="avatar-img" />
              <div className="avatar-details">
                <p><strong>Your Avatar</strong><br /><small>Recommended size: 400x400px</small></p>
                <a href="#">Import from Gravatar</a>
              </div>
            </div>

            <div className="linked-account-section">
              <h3>Link Accounts with Another Member</h3>
              <p>Your account is linked with <strong>David Smith</strong></p>
              <a href="#">Unlink Account</a>
            </div>

            <div className="social-connect-section">
              <h3>Account Details</h3>
              <button className="connect-google">Connect with Google</button>
              <button className="connect-facebook">Connected as Anne Smith (Disconnect)</button>
            </div>
          </div>
          
        );
      case "password":
        return <div className="password-tab"><h2>Change Password</h2><p>Coming soon...</p></div>;
      case "notifications":
        return <div className="notifications-tab"><h2>Email Notifications</h2><p>Coming soon...</p></div>;
      case "link":
        return <div className="link-tab"><h2>Link Accounts</h2><p>Coming soon...</p></div>;
      default:
        return null;
    }
  };

  return (
    <>
    <Header/>
    <div className="loan-profile-wrapper">
      <aside className="loan-profile-sidebar">
        <h3>Account Settings</h3>
        <ul className="tab-list">
          <li onClick={() => setActiveTab("profile")} className={activeTab === "profile" ? "active" : ""}>Profile</li>
          <li onClick={() => setActiveTab("password")} className={activeTab === "password" ? "active" : ""}>Password</li>
          <li onClick={() => setActiveTab("notifications")} className={activeTab === "notifications" ? "active" : ""}>Email Notifications</li>
          <li onClick={() => setActiveTab("link")} className={activeTab === "link" ? "active" : ""}>Link Accounts</li>
        </ul>
      </aside>

      <main className="loan-profile-content">
        {renderTabContent()}
      </main>
    </div>
    </>
  );
};

export default Profile;
