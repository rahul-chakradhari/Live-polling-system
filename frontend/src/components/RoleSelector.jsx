// src/components/RoleSelector.jsx
import { useState } from "react";
import "./RoleSelector.css";
import { useNavigate } from "react-router-dom";

const RoleSelector = ({ setRole }) => {
  const [selectedRole, setSelectedRole] = useState(null);
  const navigate = useNavigate();

  const handleSelect = (role) => {
    setSelectedRole(role);
  };

  const handleContinue = () => {
    if (selectedRole) {
      setRole(selectedRole);
      if (selectedRole === "student") {
        navigate("/student-name");
      } else {
        navigate("/teacher");
      }
    }
  };

  return (
    <div className="role-selector-container">
      <h3 className="tagline"> Intervue Poll</h3>
      <h1>
        Welcome to the <strong>Live Polling System</strong>
      </h1>
      <p>
        Please select the role that best describes you to begin using the system
      </p>

      <div className="role-buttons">
        <button
          className={`role-btn ${selectedRole === "student" ? "selected" : ""}`}
          onClick={() => handleSelect("student")}
        >
          I'm a Student
        </button>
        <button
          className={`role-btn ${selectedRole === "teacher" ? "selected" : ""}`}
          onClick={() => handleSelect("teacher")}
        >
          I'm a Teacher
        </button>
      </div>

      <button
        className="continue-btn"
        onClick={handleContinue}
        disabled={!selectedRole}
      >
        Continue
      </button>
    </div>
  );
};

export default RoleSelector;
