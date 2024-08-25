import { useNavigate } from "react-router-dom";

const Results = ({ userAnswers, questions }) => {
  const navigate = useNavigate();
  return (
    <div>
      <h2>Results</h2>
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
