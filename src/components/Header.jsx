export default function Header() {
  return (
    <header className="header">
      <h1>Memory Game!</h1>
      <div className="statistic">
        <p className="current-score">
          SCORE: <span id="current-score">0</span>
        </p>
        <p className="high-score">
          HIGH SCORE: <span id="high-score">0</span>
        </p>
      </div>
    </header>
  );
}
