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
      <h2 className="font-black text-2xl m-3 mb-10 text-center">
        Results {score + "/" + questions.length}
      </h2>
      {questions.map((question, index) => (
        <div key={index} className="my-5">
          <h3 className="text-lg italic">{question.question}</h3>
          <p>
            Your answer:{" "}
            <span
              className={
                userAnswers[index] === question.answer
                  ? "bg-malachite-300 px-2 py-1"
                  : "bg-mexican-red-300 px-2 py-1"
              }
            >
              {userAnswers[index]}
            </span>
          </p>
          <p>Correct answer: {question.answer}</p>
        </div>
      ))}
      <button
        onClick={() => navigate(`/`)}
        className="border-2 border-electric-violet-700 bg-electric-violet-700 text-white font-semibold rounded-md p-2 px-4 my-10 cursor-pointer w-full"
      >
        Play Again
      </button>
    </div>
  );
};

export default Results;
