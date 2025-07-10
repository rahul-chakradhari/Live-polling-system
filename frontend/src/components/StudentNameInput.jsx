// src/components/StudentNameInput.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "../socket";
import "./StudentNameInput.css";

const StudentNameInput = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const existingName = sessionStorage.getItem("studentName");
    if (existingName) {
      socket.emit("student_joined", existingName); //  send to backend
      navigate("/student/dashboard");
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() === "") return alert("Name cannot be empty");

    sessionStorage.setItem("studentName", name.trim());
    socket.emit("student_joined", name.trim()); // Send student name to server
    navigate("/student/dashboard");
  };

  return (
    <div className="student-name-container">
      <h4 className="poll-label"> Intervue Poll</h4>
      <h2>
        Let’s <strong>Get Started</strong>
      </h2>
      <p>
        If you’re a student, you’ll be able to{" "}
        <strong>submit your answers</strong>, participate in live polls, and see
        how your responses compare with classmates.
      </p>

      <form onSubmit={handleSubmit}>
        <label>Enter your Name</label>
        <input
          type="text"
          placeholder="Rahul Bajaj"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Continue</button>
      </form>
    </div>
  );
};

export default StudentNameInput;
