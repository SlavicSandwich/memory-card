export default function ScoreProgress({ numberOfCards, guesses }) {
  return (
    <div className="score-progress">
      <span id="current-score-play">{guesses}</span>/
      <span id="max-score-play">{numberOfCards}</span>
    </div>
  );
}
