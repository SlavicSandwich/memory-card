import "../css/card.css";
export default function Card({ game, onClick }) {
  console.log("Card Render triggered");

  return (
    <button className="card" onClick={onClick}>
      <img
        src={game.background_image}
        className="card-image pointer-events-none"
      />
      <div className="card-name pointer-events-none">{game.name}</div>
    </button>
  );
}
