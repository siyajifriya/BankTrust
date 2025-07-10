
import loanImage from './../assets/loanImage.jpg';
import './Home.css';
import { Header } from '../components/Header';

const Home = () => {

  return (
    <>
      <Header />
      <div className="home-container">
        <div className="hero-section">
          <div className="hero-text">
            <h1>Where Money<br /><span>Meet Trust.</span></h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
            <div>
              <button className="hero-button">Know More</button>
            </div>
          </div>
          <div className="hero-image">
            <img src={loanImage} alt="Happy customers" />
          </div>
        </div>

        <div className="services-section">
          <div className="service-card">
            <div className="service-icon">🐷</div>
            <h3>Savings Account</h3>
            <p>Lorem ipsum dolor sit amet consectetur.</p>
          </div>
          <div className="service-card">
            <div className="service-icon">💼</div>
            <h3>Business Loans</h3>
            <p>Lorem ipsum dolor sit amet consectetur.</p>
          </div>
          <div className="service-card">
            <div className="service-icon">💳</div>
            <h3>Debit & Credit Card</h3>
            <p>Lorem ipsum dolor sit amet consectetur.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

