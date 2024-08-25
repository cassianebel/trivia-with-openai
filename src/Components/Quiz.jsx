import { useState, useEffect } from "react";
import axios from "axios";
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
  }, [subject]);

  const fetchTriviaQuestions = async (subject, difficulty, number) => {
    console.log(subject, difficulty, number);
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content:
              "You are a helpful assistant that generates trivia questions.",
          },
          {
            role: "user",
            content: `Generate an array of ${number} multiple choice trivia questions and answers of ${difficulty} difficulty about ${subject} in JSON, formatted like this:
            {
                "triviaQuestions": [
                    {
                    "question": "What is the capital city of Australia?",
                    "choices": ["Sydney", "Melbourne", "Brisbane", "Canberra"],
                    "answer": "Canberra"
                    },
                ]
            }`,
          },
        ],
        temperature: 0.7,
        max_tokens: 1000,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        response_format: {
          type: "json_object",
        },
      },
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log(response.data.choices[0].message.content);

    return JSON.parse(response.data.choices[0].message.content);
  };

  const handleAnswer = (answer) => {
    setUserAnswers([...userAnswers, answer]);
    setCurrentQuestion(currentQuestion + 1);
  };

  if (currentQuestion >= questions.length && userAnswers.length > 0) {
    return <Results userAnswers={userAnswers} questions={questions} />;
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <div>
      <p>{questions[currentQuestion]?.question}</p>
      {questions[currentQuestion]?.choices.map((choice, index) => (
        <button key={choice} onClick={() => handleAnswer(choice)}>
          {choice}
        </button>
      ))}
    </div>
  );
};

export default Quiz;
