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
    <>
      <p className="mb-10 text-center">
        OpenAI's got the questions. Do you have the answers? Whether you're a
        science whiz, a pop culture pro, or a history aficionado, there's a
        challenge waiting for you.
      </p>
      <form onSubmit={onSubmit}>
        <label
          htmlFor="subject"
          className="text-xl text-center w-full block mb-3"
        >
          Pick your favorite subject and let's go!
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          onChange={onSubjectChange}
          className="block w-full border-2 border-gray-700 font-semibold rounded-md p-2 mb-10"
        />
        <fieldset className="mb-10 p-4 pb-6 rounded-md border-2 border-transparent focus-within:border-electric-violet-700">
          <legend className="text-xl text-center block p-2 mx-auto">
            Choose a Difficulty
          </legend>
          <div className="flex justify-center">
            <div>
              <input
                type="radio"
                id="easy"
                name="difficulty"
                value="easy"
                onChange={onDifficultyChange}
                checked={selectedDifficulty === "easy"}
                className="sr-only peer"
              />
              <label
                htmlFor="easy"
                className="border-2 border-electric-violet-300 bg-electric-violet-300 font-semibold rounded-md p-2 px-4 m-3 cursor-pointer peer-checked:bg-electric-violet-700 peer-checked:border-electric-violet-700 peer-checked:text-white "
              >
                Easy
              </label>
            </div>
            <div>
              <input
                type="radio"
                id="medium"
                name="difficulty"
                value="medium"
                onChange={onDifficultyChange}
                checked={selectedDifficulty === "medium"}
                className="sr-only peer"
              />
              <label
                htmlFor="medium"
                className="border-2 border-electric-violet-300 bg-electric-violet-300 font-semibold rounded-md p-2 px-4 m-3 cursor-pointer peer-checked:bg-electric-violet-700 peer-checked:border-electric-violet-700 peer-checked:text-white "
              >
                Medium
              </label>
            </div>
            <div>
              <input
                type="radio"
                id="hard"
                name="difficulty"
                value="hard"
                onChange={onDifficultyChange}
                checked={selectedDifficulty === "hard"}
                className="sr-only peer"
              />
              <label
                htmlFor="hard"
                className="border-2 border-electric-violet-300 bg-electric-violet-300 font-semibold rounded-md p-2 px-4 m-3 cursor-pointer peer-checked:bg-electric-violet-700 peer-checked:border-electric-violet-700 peer-checked:text-white "
              >
                Hard
              </label>
            </div>
          </div>
        </fieldset>
        <fieldset className="mb-10 p-4 pb-6 rounded-md border-2 border-transparent focus-within:border-electric-violet-700">
          <legend className="text-xl text-center block p-2 mx-auto">
            Number of Questions
          </legend>
          <div className="flex justify-center">
            <div>
              <input
                type="radio"
                id="three"
                name="number"
                value="3"
                onChange={onNumberChange}
                checked={selectedNumber == 3}
                className="sr-only peer"
              />
              <label
                htmlFor="three"
                className="border-2 border-electric-violet-300 bg-electric-violet-300 font-semibold rounded-md p-2 px-4 m-3 cursor-pointer peer-checked:bg-electric-violet-700 peer-checked:border-electric-violet-700 peer-checked:text-white "
              >
                3
              </label>
            </div>
            <div>
              <input
                type="radio"
                id="five"
                name="number"
                value="5"
                onChange={onNumberChange}
                checked={selectedNumber == 5}
                className="sr-only peer"
              />
              <label
                htmlFor="five"
                className="border-2 border-electric-violet-300 bg-electric-violet-300 font-semibold rounded-md p-2 px-4 m-3 cursor-pointer peer-checked:bg-electric-violet-700 peer-checked:border-electric-violet-700 peer-checked:text-white "
              >
                5
              </label>
            </div>
            <div>
              <input
                type="radio"
                id="seven"
                name="number"
                value="7"
                onChange={onNumberChange}
                checked={selectedNumber == 7}
                className="sr-only peer"
              />
              <label
                htmlFor="seven"
                className="border-2 border-electric-violet-300 bg-electric-violet-300 font-semibold rounded-md p-2 px-4 m-3 cursor-pointer peer-checked:bg-electric-violet-700 peer-checked:border-electric-violet-700 peer-checked:text-white "
              >
                7
              </label>
            </div>
          </div>
        </fieldset>

        <button
          type="submit"
          disabled={selectedSubject === ""}
          className="rounded-md p-2 px-4 my-10 cursor-pointer w-full border-2 border-malachite-400 bg-malachite-400 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Start Quiz
        </button>
      </form>
    </>
  );
};

export default StarterForm;
