import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Results = ({ userAnswers, questions }) => {
  const [score, setScore] = useState(0);
  const navigate = useNavigate();

  const calculateScore = () => {
    let score = 0;
    questions.forEach((question, index) => {
      if (question.answer === userAnswers[index]) {
        score++;
      }
    });
    setScore(score);
  };

  useEffect(() => {
    calculateScore();
  }, []);

  return (
    <div>
      <h2>Results {score + "/" + questions.length}</h2>
      {questions.map((question, index) => (
        <div key={index}>
          <h3>{question.question}</h3>
          <p>Your answer: {userAnswers[index]}</p>
          <p>Correct answer: {question.answer}</p>
        </div>
      ))}
      <button onClick={() => navigate(`/`)}>Play Again</button>
    </div>
  );
};

export default Results;
