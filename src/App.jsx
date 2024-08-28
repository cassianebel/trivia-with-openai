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
    navigate(`/trivia-with-openai/quiz/${subject}`);
  }

  return (
    <div className="max-w-lg">
      <Routes>
        <Route
          path="/trivia-with-openai"
          element={<StarterForm handleSubmit={handleSubmit} />}
        />
        <Route
          path="/trivia-with-openai/quiz"
          element={
            subject ? (
              <Navigate to={`/trivia-with-openai/quiz/${subject}`} replace />
            ) : (
              <Navigate to="/trivia-with-openai/" replace />
            )
          }
        />
        <Route
          path="/trivia-with-openai/quiz/:subject"
          element={
            <Quiz subject={subject} difficulty={difficulty} number={number} />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
