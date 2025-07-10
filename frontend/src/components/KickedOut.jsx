import "./KickedOut.css";

const KickedOut = () => {
  return (
    <div
      className="kicked-out-container"
      style={{
        textAlign: "center",
        padding: "5rem 1rem",
        fontFamily: "sans-serif",
      }}
    >
      <div
        className="poll-tag"
        style={{
          background: "#7765DA",
          color: "#fff",
          padding: "0.5rem 1rem",
          borderRadius: "20px",
          display: "inline-block",
          marginBottom: "2rem",
          fontWeight: "bold",
        }}
      >
        Intervue Poll
      </div>
      <h1 style={{ fontSize: "2.5rem", color: "#333" }}>
        You've been Kicked out!
      </h1>
      <p style={{ color: "#777", fontSize: "1.2rem", marginTop: "1rem" }}>
        Looks like the teacher has removed you from the poll system.
        <br />
        Please try again sometime.
      </p>
    </div>
  );
};

export default KickedOut;
