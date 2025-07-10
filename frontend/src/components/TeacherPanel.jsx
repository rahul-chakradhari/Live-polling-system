import { useEffect, useState } from "react";
import { socket } from "../socket";
import "./TeacherPanel.css";

const defaultOption = () => ({ text: "", isCorrect: false });

const TeacherPanel = () => {
  const [students, setStudents] = useState([]);
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([
    defaultOption(),
    defaultOption(),
    defaultOption(),
    defaultOption(),
  ]);
  const [timer, setTimer] = useState(60);
  const [results, setResults] = useState(null);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [answersCount, setAnswersCount] = useState(0);

  // Popup state
  const [showPopup, setShowPopup] = useState(false);
  const [popupTab, setPopupTab] = useState("participants");

  // Chat state (starts fresh on every session/page load)
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");

  useEffect(() => {
    socket.on("update_student_list", (data) => setStudents(data));
    socket.on("update_results", (resultData) => {
      setResults(resultData);
      setAnswersCount(resultData.total || 0);
      setHistory((prev) => [...prev, resultData]);
    });
    socket.on("update_answers_count", (count) => setAnswersCount(count));
    socket.on("receive_message", (msg) => {
      setChatMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("update_student_list");
      socket.off("update_results");
      socket.off("update_answers_count");
      socket.off("receive_message");
    };
  }, []);

  const handleOptionChange = (idx, value) => {
    setOptions((opts) =>
      opts.map((opt, i) => (i === idx ? { ...opt, text: value } : opt))
    );
  };

  const handleCorrectChange = (idx, value) => {
    setOptions((opts) =>
      opts.map((opt, i) => (i === idx ? { ...opt, isCorrect: value } : opt))
    );
  };

  const handleAskQuestion = () => {
    if (!question.trim() || options.some((o) => !o.text.trim())) {
      alert("Please fill question and all 4 options.");
      return;
    }

    socket.emit("create_poll", { question, options, timer });

    // Reset fields, but NOT chat
    setQuestion("");
    setOptions([
      defaultOption(),
      defaultOption(),
      defaultOption(),
      defaultOption(),
    ]);
    setTimer(60);
    setResults(null);
    setAnswersCount(0);
  };

  const sendMessage = () => {
    if (!chatInput.trim()) return;
    const message = { user: "Teacher", text: chatInput };
    socket.emit("send_message", message);
    setChatMessages((prev) => [...prev, message]);
    setChatInput("");
  };

  const allSubmitted =
    results &&
    students.length > 0 &&
    results.total &&
    results.total === students.length;

  return (
    <div className="teacher-panel">
      <h2>Teacher Panel</h2>

      <button
        className="poll-history-fab"
        onClick={() => setShowHistory(true)}
        title="View Poll History"
      >
        👁️ View poll results
      </button>

      <button
        className="participants-popup-btn"
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

      {showHistory && (
        <div className="poll-history-modal">
          <div className="poll-history-content">
            <button
              className="close-history"
              onClick={() => setShowHistory(false)}
            >
              Cancel ×
            </button>
            <h3>Poll History</h3>
            {history.length === 0 && <p>No polls yet.</p>}
            {history.map((res, idx) => (
              <div className="poll-results" key={idx}>
                <div className="results-question">{res.question}</div>
                {res.options.map((opt, i) => {
                  const percent = res.total
                    ? Math.round((opt.count / res.total) * 100)
                    : 0;
                  return (
                    <div className="results-option" key={i}>
                      <span className="option-index">{i + 1}</span>
                      <div className="option-bar-bg">
                        <div
                          className="option-bar"
                          style={{
                            width: `${percent}%`,
                            background: "#7765DA",
                            borderRadius: "8px",
                            height: "32px",
                            display: "flex",
                            alignItems: "center",
                            color: "#fff",
                            fontWeight: 600,
                            paddingLeft: "12px",
                          }}
                        >
                          {opt.text}
                        </div>
                      </div>
                      <span className="option-percent">{percent}%</span>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      )}

      {showPopup && (
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

          {popupTab === "participants" && (
            <div style={{ overflowY: "auto", flexGrow: 1 }}>
              <table style={{ width: "100%" }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: "left" }}>Name</th>
                    <th style={{ textAlign: "center" }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student.id}>
                      <td>{student.name}</td>
                      <td style={{ textAlign: "center" }}>
                        <button
                          onClick={() =>
                            socket.emit("kick_student", student.id)
                          }
                          style={{
                            background: "none",
                            color: "#6a4ec9",
                            border: "none",
                            cursor: "pointer",
                            textDecoration: "underline",
                          }}
                        >
                          Kick
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {popupTab === "chat" && (
            <div
              style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}
            >
              <div
                style={{
                  flexGrow: 1,
                  overflowY: "auto",
                  paddingRight: "0.5rem",
                  marginBottom: "0.5rem",
                  maxHeight: "300px",
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
                        alignSelf:
                          msg.user === "Teacher" ? "flex-end" : "flex-start",
                        maxWidth: "80%",
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
      )}

      <div className="question-section">
        <h3>Let's Get Started</h3>
        <label>
          Enter your question
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            maxLength={100}
            placeholder="Type your question here"
          />
        </label>
        <label>
          Timer:
          <select
            value={timer}
            onChange={(e) => setTimer(Number(e.target.value))}
          >
            <option value={30}>30 seconds</option>
            <option value={60}>60 seconds</option>
          </select>
        </label>

        <div>
          <h4>Edit Options</h4>
          {options.map((opt, idx) => (
            <div className="option-row" key={idx}>
              <input
                type="text"
                value={opt.text}
                onChange={(e) => handleOptionChange(idx, e.target.value)}
                placeholder={`Option ${idx + 1}`}
              />
              <div className="correct-toggle">
                <label>
                  <input
                    type="radio"
                    checked={opt.isCorrect}
                    onChange={() => handleCorrectChange(idx, true)}
                  />
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    checked={!opt.isCorrect}
                    onChange={() => handleCorrectChange(idx, false)}
                  />
                  No
                </label>
              </div>
            </div>
          ))}
        </div>
        <button
          className="submit-btn"
          onClick={handleAskQuestion}
          disabled={results && !allSubmitted}
          title={
            results && !allSubmitted
              ? "You can’t ask a new question until all students have answered."
              : "Ask the current question"
          }
          style={{
            backgroundColor: results && !allSubmitted ? "#ccc" : "#6a4ec9",
            cursor: results && !allSubmitted ? "not-allowed" : "pointer",
          }}
        >
          Ask Question
        </button>
      </div>

      {allSubmitted && results && (
        <div className="poll-results">
          <h3>Question</h3>
          <div className="results-box">
            <div className="results-question">{results.question}</div>
            {results.options.map((opt, idx) => {
              const percent = results.total
                ? Math.round((opt.count / results.total) * 100)
                : 0;
              return (
                <div className="results-option" key={idx}>
                  <span className="option-index">{idx + 1}</span>
                  <div className="option-bar-bg">
                    <div
                      className="option-bar"
                      style={{
                        width: `${percent}%`,
                        background: "#7765DA",
                        borderRadius: "8px",
                        height: "32px",
                        display: "flex",
                        alignItems: "center",
                        color: "#fff",
                        fontWeight: 600,
                        paddingLeft: "12px",
                      }}
                    >
                      {opt.text}
                    </div>
                  </div>
                  <span className="option-percent">{percent}%</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {results && !allSubmitted && (
        <div
          style={{
            margin: "2rem auto",
            textAlign: "center",
            color: "#7765DA",
            fontWeight: 600,
          }}
        >
          Waiting for all participants to submit... ({answersCount}/
          {students.length})
        </div>
      )}
    </div>
  );
};

export default TeacherPanel;
