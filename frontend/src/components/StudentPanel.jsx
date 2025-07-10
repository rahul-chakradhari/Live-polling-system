import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "../socket";
import Pollresults from "./Pollresults";
import "./StudentPanel.css";

const StudentPanel = () => {
  const [poll, setPoll] = useState(null);
  const [students, setStudents] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [popupTab, setPopupTab] = useState("participants");
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const studentName = sessionStorage.getItem("studentName");
    if (studentName) {
      socket.emit("student_joined", studentName);
    }

    socket.on("new_poll", (pollData) => {
      setPoll(pollData);
    });

    socket.on("update_student_list", (data) => setStudents(data));
    socket.on("kicked", () => {
      sessionStorage.removeItem("studentName");
      navigate("/kicked");
    });

    socket.on("receive_message", (msg) => {
      setChatMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("new_poll");
      socket.off("update_student_list");
      socket.off("kicked");
      socket.off("receive_message");
    };
  }, [navigate]);

  const sendMessage = () => {
    if (!chatInput.trim()) return;
    const studentName = sessionStorage.getItem("studentName") || "Student";
    const message = { user: studentName, text: chatInput };
    socket.emit("send_message", message);
    setChatMessages((prev) => [...prev, message]);
    setChatInput("");
  };

  const renderPopup = () => (
    <div
      className="combined-popup"
      style={{
        position: "fixed",
        bottom: "120px",
        right: "40px",
        width: "360px",
        background: "#fff",
        borderRadius: "12px",
        boxShadow: "0 4px 32px rgba(0,0,0,0.15)",
        padding: "1rem",
        zIndex: 1001,
        display: "flex",
        flexDirection: "column",
        height: "420px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "1rem",
        }}
      >
        <div>
          <button
            onClick={() => setPopupTab("participants")}
            style={{
              fontWeight: popupTab === "participants" ? "bold" : "normal",
              border: "none",
              background: "transparent",
              marginRight: "1rem",
              cursor: "pointer",
            }}
          >
            Participants
          </button>
          <button
            onClick={() => setPopupTab("chat")}
            style={{
              fontWeight: popupTab === "chat" ? "bold" : "normal",
              border: "none",
              background: "transparent",
              cursor: "pointer",
            }}
          >
            Chat
          </button>
        </div>
        <button
          onClick={() => setShowPopup(false)}
          style={{
            background: "none",
            border: "none",
            fontSize: "1.5rem",
            cursor: "pointer",
          }}
        >
          ×
        </button>
      </div>

      {/* Participants */}
      {popupTab === "participants" && (
        <div style={{ overflowY: "auto", flexGrow: 1 }}>
          <table style={{ width: "100%" }}>
            <thead>
              <tr>
                <th style={{ textAlign: "left" }}>Name</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id}>
                  <td>{student.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Chat */}
      {popupTab === "chat" && (
        <div style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
          <div
            style={{
              flexGrow: 1,
              overflowY: "auto",
              paddingRight: "0.5rem",
              marginBottom: "0.5rem",
              maxHeight: "280px",
            }}
          >
            {chatMessages.map((msg, idx) => (
              <div key={idx} style={{ margin: "0.5rem 0" }}>
                <div
                  style={{
                    background: msg.user === "Teacher" ? "#222" : "#7765DA",
                    color: "#fff",
                    padding: "0.5rem 1rem",
                    borderRadius: "12px",
                    maxWidth: "80%",
                    wordBreak: "break-word",
                  }}
                >
                  <strong>{msg.user}: </strong>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex" }}>
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              style={{ flexGrow: 1, padding: "0.5rem" }}
              placeholder="Type a message..."
            />
            <button onClick={sendMessage} style={{ marginLeft: "0.5rem" }}>
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );

  const floatingButton = (
    <button
      onClick={() => setShowPopup(true)}
      style={{
        position: "fixed",
        bottom: "40px",
        right: "40px",
        borderRadius: "50%",
        width: "56px",
        height: "56px",
        background: "#6a4ec9",
        color: "#fff",
        fontSize: "2rem",
        border: "none",
        cursor: "pointer",
        zIndex: 1000,
      }}
      title="Chat / Participants"
    >
      💬
    </button>
  );

  if (!poll) {
    return (
      <div className="student-panel waiting">
        <div className="poll-tag"> Intervue Poll</div>
        <br />
        <div className="loader"></div>
        <h2 className="waiting-text">
          Wait for the teacher to ask questions...
        </h2>
        {floatingButton}
        {showPopup && renderPopup()}
      </div>
    );
  }

  return (
    <>
      <Pollresults poll={poll} />
      {floatingButton}
      {showPopup && renderPopup()}
    </>
  );
};

export default StudentPanel;
