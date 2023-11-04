import { useState } from "react";
import Modal from "./Modal";
import OptionButton from "./OptionButton";
import "../css/startScreen.css";

function RadioInput({ defaultChecked, value, labelText, onChange }) {
  return (
    <label>
      <input
        type="radio"
        className="radio"
        defaultChecked={defaultChecked}
        name="answer"
        onChange={() => onChange(value)}
      />
      <span>{labelText}</span>
    </label>
  );
}

export default function StartScreen({ onStart }) {
  const cardGoals = [5, 10, 15];
  const [cardGoal, setCardGoal] = useState(cardGoals[0]);

  const handleStartGame = (e) => {
    e.preventDefault();
    onStart(cardGoal);
  };

  const handleChange = (newCardGoal) => {
    setCardGoal(newCardGoal);
  };

  return (
    <Modal>
      <div className="start-screen-modal-content modal-content">
        <p className="ask-text">Select difficulty</p>
        <form onSubmit={handleStartGame}>
          <div className="difficulty-options">
            <RadioInput
              value={cardGoals[0]}
              labelText="Easy"
              defaultChecked
              onChange={handleChange}
            />
            <RadioInput
              value={cardGoals[1]}
              labelText="Medium"
              onChange={handleChange}
            />
            <RadioInput
              value={cardGoals[2]}
              labelText="Hard"
              onChange={handleChange}
            />
          </div>
          <div className="start-options">
            <OptionButton type="submit">Start Game!</OptionButton>
            <OptionButton
              onClick={() =>
                window.open(
                  "https://github.com/SlavicSandwich/memory-card",
                  "_blank"
                )
              }
            >
              Game Repo
            </OptionButton>
          </div>
        </form>
      </div>
    </Modal>
  );
}
