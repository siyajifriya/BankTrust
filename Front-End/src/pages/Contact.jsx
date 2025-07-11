import React from "react";
import "./contact.css";
import { Header } from "../components/Header";


const Contact = () => {
  return (
    <>
    <Header />
    <div className="contact-wrapper">
      <div className="contact-container">
        <div className="contact-left">
          <div className="contact-overlay">
            <div className="contact-info">
              <h3>Address</h3>
              <p>Media Center 8th floor, 379 Hudson St, <br /> New York, NY 10018 US</p>

              <h3>Let's Talk</h3>
              <p className="highlight">+1 800 123 6879</p>

              <h3>General Support</h3>
              <p className="highlight">contact@example.com</p>
            </div>
          </div>
        </div>

        <div className="contact-right">
          <h2>Send Us A Message</h2>
          <form className="contact-form">
            <div className="form-row">
              <input type="text" placeholder="First name" required />
              <input type="text" placeholder="Last name" required />
            </div>
            <input type="email" placeholder="Eg. example@mail.com" required />
            <input type="tel" placeholder="Eg. +1 800 000000" required />
            <textarea placeholder="Write us a message" required />
            <button type="submit">Send Message</button>
          </form>
        </div>
      </div>
    </div>
    </>
  );
};

export default Contact;
