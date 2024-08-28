import { useState, useEffect } from "react";
import Results from "./Results";

const Quiz = ({ subject, difficulty, number }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const triviaQuestions = await fetchTriviaQuestions(
          subject,
          difficulty,
          number
        );
        setQuestions(triviaQuestions.triviaQuestions);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch questions, please try again later.");
        setLoading(false);
      }
    };
    fetchQuestions();
  }, []);

  const fetchTriviaQuestions = async (subject, difficulty, number) => {
    console.log(subject, difficulty, number);

    const response = await fetch(
      `https://cassia-proxy-server-0e93eb694b50.herokuapp.com/api/trivia?subject=${subject}&difficulty=${difficulty}&number=${number}`
    );

    const data = await response.json();
    console.log(data);

    return JSON.parse(data);
  };

  const handleAnswer = (answer) => {
    setUserAnswers([...userAnswers, answer]);
    setCurrentQuestion(currentQuestion + 1);
  };

  if (currentQuestion >= questions.length && userAnswers.length > 0) {
    return <Results userAnswers={userAnswers} questions={questions} />;
  }

  if (loading) {
    return <div className="loader">Loading...</div>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <div>
      <p className="text-xl text-center italic">
        {questions[currentQuestion].question}
      </p>
      {questions[currentQuestion].choices.map((choice, index) => (
        <button
          key={choice}
          onClick={() => handleAnswer(choice)}
          className="block border-2 border-electric-violet-300 bg-electric-violet-300 font-semibold rounded-md p-2 px-4 my-5 mx-auto cursor-pointer w-full active:bg-electric-violet-700 focus-within:bg-electric-violet-600 focus-within:text-white active:text-white"
        >
          {choice}
        </button>
      ))}
    </div>
  );
};

export default Quiz;
