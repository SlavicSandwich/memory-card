export default function Header({ score, highScore }) {
  return (
    <header className="header">
      <h1>Memory Game!</h1>
      <div className="statistic">
        <p className="current-score">
          SCORE: <span id="current-score">{score}</span>
        </p>
        <p className="high-score">
          HIGH SCORE: <span id="high-score">{highScore}</span>
        </p>
      </div>
    </header>
  );
}
