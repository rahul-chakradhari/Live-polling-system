import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import RoleSelector from "./components/RoleSelector";
import StudentNameInput from "./components/StudentNameInput";
import TeacherPanel from "./components/TeacherPanel";
import StudentPanel from "./components/StudentPanel";
import KickedOut from "./components/KickedOut";

function App() {
  const [, setRole] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<RoleSelector setRole={setRole} />} />
        <Route path="/student-name" element={<StudentNameInput />} />
        <Route path="/teacher" element={<TeacherPanel />} />
        <Route path="/student/dashboard" element={<StudentPanel />} />
        <Route path="/kicked" element={<KickedOut />} />
        <Route
          path="/student/"
          element={<Navigate to="/student/dashboard" replace />}
        />
      </Routes>
    </Router>
  );
}

export default App;
