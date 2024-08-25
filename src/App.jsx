import { useState } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import "./App.css";
import SubjectSelector from "./Components/SubjectSelector";
import Quiz from "./Components/Quiz";

function App() {
  const [subject, setSubject] = useState("");
  const navigate = useNavigate();

  function handleSubjectChange(subject) {
    setSubject(subject);
    navigate(`/quiz/${subject}`);
  }

  return (
    <>
      <h1>Test Your Knowledge</h1>

      <Routes>
        <Route
          path="/"
          element={
            <SubjectSelector handleSubjectChange={handleSubjectChange} />
          }
        />
        <Route
          path="/quiz"
          element={
            subject ? (
              <Navigate to={`/quiz/${subject}`} replace />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route path="/quiz/:subject" element={<Quiz subject={subject} />} />
      </Routes>
    </>
  );
}

export default App;
