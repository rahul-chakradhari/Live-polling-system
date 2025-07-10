import React, { useEffect, useState } from "react";
import { socket } from "../socket";
import "./Pollresults.css";

const Pollresults = ({ poll }) => {
  const [selected, setSelected] = useState(null);
  const [timer, setTimer] = useState(poll?.timer || 60);
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState(null);

  // Reset everything when a new poll is received
  useEffect(() => {
    setSelected(null);
    setTimer(poll?.timer || 60);
    setSubmitted(false);
    setResults(null);
  }, [poll]);

  // Countdown timer
  useEffect(() => {
    if (timer <= 0 || submitted) return;
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer, submitted]);

  // Listen for updated results
  useEffect(() => {
    const handleResults = (resultData) => {
      setResults(resultData);
    };
    socket.on("update_results", handleResults);
    return () => {
      socket.off("update_results", handleResults);
    };
  }, []);

  // Auto-submit when timer reaches 0
  useEffect(() => {
    if (timer === 0 && !submitted) {
      setSubmitted(true);
      socket.emit("submit_answer", {
        pollId: poll._id,
        answer: selected,
      });
    }
  }, [timer, submitted, selected, poll._id]);

  // Submit button handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (submitted) return;
    setSubmitted(true);
    socket.emit("submit_answer", {
      pollId: poll._id,
      answer: selected,
    });
  };

  //  Answer UI (Before submission)
  if (!submitted) {
    return (
      <div className="pollresults">
        <div className="poll-header">
          <span className="question-no">Question</span>
          <span className="timer">
            ⏱️{" "}
            <span style={{ color: "#d32f2f", fontWeight: 600 }}>
              {String(timer).padStart(2, "0")}
            </span>
          </span>
        </div>
        <div className="poll-question">{poll.question}</div>
        <form onSubmit={handleSubmit}>
          <div className="poll-options">
            {poll.options.map((opt, idx) => (
              <label
                key={idx}
                className={`poll-option ${selected === idx ? "selected" : ""}`}
              >
                <input
                  type="radio"
                  name="option"
                  value={idx}
                  checked={selected === idx}
                  onChange={() => setSelected(idx)}
                  disabled={submitted}
                  style={{ display: "none" }}
                />
                <span className="option-index">{idx + 1}</span>
                <span className="option-text">{opt.text}</span>
              </label>
            ))}
          </div>
          <button className="submit-btn" type="submit" disabled={submitted}>
            {submitted ? "Submitted" : "Submit"}
          </button>
        </form>
      </div>
    );
  }

  //  Poll Results UI (After submission)
  return (
    <div className="pollresults">
      <div className="poll-header">
        <span className="question-no">Question</span>
      </div>
      <div className="poll-question">{poll.question}</div>

      {results ? (
        <div className="results-box">
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
                      transition: "width 0.4s",
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
      ) : (
        <div
          className="wait-message"
          style={{
            marginTop: "2rem",
            fontWeight: 600,
            fontSize: "1.1rem",
            textAlign: "center",
          }}
        >
          Waiting for poll results...
        </div>
      )}

      <div
        className="wait-message"
        style={{
          marginTop: "2rem",
          fontWeight: 600,
          fontSize: "1.1rem",
          textAlign: "center",
        }}
      >
        Wait for the teacher to ask a new question.
      </div>
    </div>
  );
};

export default Pollresults;
