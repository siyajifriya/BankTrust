import React from 'react';
import './Services.css'; // Optional CSS file if you're using external styling

const services = [
  {
    icon: '💰',
    title: 'Personal Loans',
    description: 'Instant personal loans with flexible repayment options.'
  },
  {
    icon: '🏦',
    title: 'Savings Account',
    description: 'Zero-balance accounts with high-interest rates.'
  },
  {
    icon: '💳',
    title: 'Credit Cards',
    description: 'Smart credit cards with great cashback and rewards.'
  },
  {
    icon: '📈',
    title: 'Investments',
    description: 'Invest in mutual funds, stocks, and more securely.'
  },
  {
    icon: '🏠',
    title: 'Home Loans',
    description: 'Get affordable home loans with easy EMIs.'
  },
  {
    icon: '📊',
    title: 'Financial Planning',
    description: 'Personalized financial advice from experts.'
  }
];

const Services = () => {
  return (
    <section className="services-section">
      <h2 className="section-title">Our Services</h2>
      <div className="services-grid">
        {services.map((service, index) => (
          <div className="service-card" key={index}>
            <div className="service-icon">{service.icon}</div>
            <h3 className="service-title">{service.title}</h3>
            <p className="service-description">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
