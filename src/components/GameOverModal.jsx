import OptionButton from "./OptionButton";
import winPose from "../assets/MK1_Scorp_WinPoseAnim.gif";
import losePose from "../assets/scorpion-ultimate-mk3-fan-remake-dizzy.gif";
import Modal from "./Modal";
import "../css/gameOverModal.css";

export default function GameOverModal({
  score,
  onPlayAgain,
  onQuit,
  status,
  onContinue,
}) {
  return (
    <Modal>
      <div
        className="game-over-modal-content modal-content"
        data-status={status}
      >
        <h2>{status === "win" ? "You win!" : "Sorry, Game Over!"}</h2>
        {status && (
          <img
            src={status === "win" ? winPose : losePose}
            className="status-gif"
            alt=""
          />
        )}

        <div className="final-statistics">
          <span className="final-score">
            Your final score is{" "}
            <span className="final-score-number"> {score}</span>
          </span>
        </div>

        <div className="options">
          {status === "win" && (
            <OptionButton onClick={onContinue}>Keep playing</OptionButton>
          )}
          <OptionButton onClick={onPlayAgain}>Play Again</OptionButton>
          <OptionButton onClick={onQuit}>Quit</OptionButton>
        </div>
      </div>
    </Modal>
  );
}
