import { useState } from "react";

const SubjectSelector = ({ handleSubjectChange }) => {
  const [selectedSubject, setSelectedSubject] = useState("html");

  const onSubmit = (event) => {
    event.preventDefault();
    handleSubjectChange(selectedSubject);
  };

  const onChange = (event) => {
    setSelectedSubject(event.target.value);
  };

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="subject">Choose a subject:</label>
      <select id="subject" name="subject" onChange={onChange}>
        <option value="html">HTML</option>
        <option value="css">CSS</option>
        <option value="javascript">JavaScript</option>
      </select>
      <button type="submit">Start Quiz</button>
    </form>
  );
};

export default SubjectSelector;
