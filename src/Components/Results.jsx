import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  BsFillHandThumbsUpFill,
  BsFillHandThumbsDownFill,
} from "react-icons/bs";

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

  const percentage = Math.trunc((score / questions.length) * 100);

  const exclamation = (percentage) => {
    if (percentage === 100) {
      return "weird flex but ok";
    } else if (percentage > 90) {
      return "slay";
    } else if (percentage > 80) {
      return "you ate";
    } else if (percentage > 70) {
      return "a whole vibe";
    } else if (percentage > 60) {
      return "low-key solid";
    } else if (percentage > 50) {
      return "not bad, fam";
    } else if (percentage > 40) {
      return "it’s giving… room for improvement";
    } else if (percentage > 30) {
      return "low-key a warm-up";
    } else if (percentage > 20) {
      return "the vibes are off";
    } else if (percentage > 10) {
      return "you got this next time";
    } else {
      return "a glow up in progress";
    }
  };

  useEffect(() => {
    calculateScore();
  }, []);

  return (
    <div>
      <h2 className="font-black text-2xl m-3 text-center mb-10 text-electric-violet-800">
        {percentage}% <br />
        <span className="italic">{exclamation(percentage)}</span>
      </h2>
      {questions.map((question, index) => (
        <div key={index} className="my-10">
          <h3 className="text-lg italic">{question.question}</h3>
          <div className="flex items-center ml-5">
            {userAnswers[index] === question.answer ? (
              <BsFillHandThumbsUpFill className="text-malachite-500 text-3xl" />
            ) : (
              <BsFillHandThumbsDownFill className="text-mexican-red-500 text-3xl" />
            )}
            <div className="ml-2 mt-2">
              <p>
                Your answer:{" "}
                <span
                  className={
                    userAnswers[index] === question.answer
                      ? "bg-malachite-200 px-2 py-1"
                      : "bg-mexican-red-200 px-2 py-1"
                  }
                >
                  {userAnswers[index]}
                </span>
              </p>
              {userAnswers[index] !== question.answer && (
                <p>Correct answer: {question.answer}</p>
              )}
            </div>
          </div>
        </div>
      ))}
      <button
        onClick={() => navigate(`/trivia-with-openai/`)}
        className="border-2 border-electric-violet-700 bg-electric-violet-700 text-white font-semibold rounded-md p-2 px-4 my-10 cursor-pointer w-full"
      >
        Play Again
      </button>
    </div>
  );
};

export default Results;
