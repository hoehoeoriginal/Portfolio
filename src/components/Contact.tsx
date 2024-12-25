import React from "react";
import "../css/Contact.css";
import { FaTwitter, FaLinkedin, FaEnvelope } from "react-icons/fa";

const Contact: React.FC = () => {
  return (
    <div className="contact-container">
      <form className="contact-form">
        <label>Email:</label>
        <input type="email" placeholder="Enter your email" />
        <textarea placeholder="Enter your message"></textarea>
        <button type="submit">Send</button>
      </form>
      <div className="social-icons">
        <FaTwitter />
        <FaLinkedin />
        <FaEnvelope />
      </div>
    </div>
  );
};

export default Contact;
