import { useState, useEffect } from "react";
import axios from "axios";
import Results from "./Results";

const Quiz = ({ subject }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      const triviaQuestions = await fetchTriviaQuestions(subject);
      setQuestions(triviaQuestions.triviaQuestions);
    };
    fetchQuestions();
  }, [subject]);

  const fetchTriviaQuestions = async (subject) => {
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
            content: `Generate 3 multiple choice trivia questions and answers of medium difficulty about ${subject} in JSON, formatted like this:
            {
                "triviaQuestions": [
                    {
                    "question": "What is the capital city of Australia?",
                    "choices": ["Sydney", "Melbourne", "Brisbane", "Canberra"],
                    "answer": "Canberra"
                    },
                    etc.
                ]
            }`,
          },
        ],
        temperature: 0.7,
        max_tokens: 500,
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

  return (
    <div>
      <h2>{questions[currentQuestion]?.question}</h2>
      {questions[currentQuestion]?.choices.map((choice, index) => (
        <button key={choice} onClick={() => handleAnswer(choice)}>
          {choice}
        </button>
      ))}
    </div>
  );
};

export default Quiz;
