import React from "react";
import "../css/Profile.css";
import { FaUserCircle } from "react-icons/fa";

const Profile: React.FC = () => {
  return (
    <div className="profile-container">
      <FaUserCircle className="profile-icon" />
      <div className="profile-text">
        <h2>About Me</h2>
        <p>Hello! I'm a passionate developer skilled in React and TypeScript.</p>
      </div>
    </div>
  );
};

export default Profile;
