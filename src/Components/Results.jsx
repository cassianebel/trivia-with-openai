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

  const over50 = ["weird flex but ok", "you ate", "not bad, fam"];
  const under50 = [
    "it’s giving… room for improvement",
    "low-key a warm-up",
    "the vibes were off",
  ];

  const exclamation = (percentage) => {
    if (percentage >= 50) {
      return over50[Math.floor(Math.random() * over50.length)];
    } else {
      return under50[Math.floor(Math.random() * under50.length)];
    }
  };

  useEffect(() => {
    calculateScore();
  }, []);

  return (
    <div>
      <h2 className="font-black text-2xl m-3 text-center mb-10 text-electric-violet-500">
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
                      ? "bg-malachite-200 dark:bg-malachite-400 dark:text-zinc-950 px-2 py-1"
                      : "bg-mexican-red-200 dark:bg-mexican-red-400 dark:text-zinc-950 px-2 py-1"
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
