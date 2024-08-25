import { useState } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import "./App.css";
import StarterForm from "./Components/StarterForm";
import Quiz from "./Components/Quiz";

function App() {
  const [subject, setSubject] = useState("");
  const [difficulty, setDifficulty] = useState("easy");
  const [number, setNumber] = useState(3);
  const navigate = useNavigate();

  function handleSubmit(subject, difficulty, number) {
    setSubject(subject);
    setDifficulty(difficulty);
    setNumber(number);
    navigate(`/quiz/${subject}`);
  }

  return (
    <>
      <h1>Test Your Knowledge</h1>

      <Routes>
        <Route path="/" element={<StarterForm handleSubmit={handleSubmit} />} />
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
        <Route
          path="/quiz/:subject"
          element={
            <Quiz subject={subject} difficulty={difficulty} number={number} />
          }
        />
      </Routes>
    </>
  );
}

export default App;
