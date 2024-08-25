import { useState } from "react";

const StarterForm = ({ handleSubmit }) => {
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("easy");
  const [selectedNumber, setSelectedNumber] = useState(3);

  const onSubmit = (event) => {
    event.preventDefault();
    handleSubmit(selectedSubject, selectedDifficulty, selectedNumber);
  };

  const onSubjectChange = (event) => {
    setSelectedSubject(event.target.value);
  };

  const onDifficultyChange = (event) => {
    setSelectedDifficulty(event.target.value);
  };

  const onNumberChange = (event) => {
    setSelectedNumber(event.target.value);
  };

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="subject">Your Favorite Subject</label>
      <input
        type="text"
        id="subject"
        name="subject"
        onChange={onSubjectChange}
      />
      <fieldset>
        <legend>Choose a Difficulty</legend>
        <input
          type="radio"
          id="easy"
          name="difficulty"
          value="easy"
          onChange={onDifficultyChange}
          checked={selectedDifficulty === "easy"}
        />
        <label htmlFor="easy">Easy</label>
        <input
          type="radio"
          id="medium"
          name="difficulty"
          value="medium"
          onChange={onDifficultyChange}
          checked={selectedDifficulty === "medium"}
        />
        <label htmlFor="medium">Medium</label>
        <input
          type="radio"
          id="hard"
          name="difficulty"
          value="hard"
          onChange={onDifficultyChange}
          checked={selectedDifficulty === "hard"}
        />
        <label htmlFor="hard">Hard</label>
      </fieldset>
      <fieldset>
        <legend>Number of Questions</legend>
        <input
          type="radio"
          id="3"
          name="number"
          value="3"
          onChange={onNumberChange}
          checked={selectedNumber === 3}
        />
        <label htmlFor="3">3</label>
        <input
          type="radio"
          id="5"
          name="number"
          value="5"
          onChange={onNumberChange}
          checked={selectedNumber === 5}
        />
        <label htmlFor="5">5</label>
        <input
          type="radio"
          id="7"
          name="number"
          value="7"
          onChange={onNumberChange}
          checked={selectedNumber === 7}
        />
        <label htmlFor="7">7</label>
      </fieldset>

      <button type="submit" disabled={selectedSubject === ""}>
        Start Quiz
      </button>
    </form>
  );
};

export default StarterForm;
