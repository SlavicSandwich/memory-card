import "../css/card.css";
export default function Card({ game, onClick }) {
  console.log("Card Render triggered");

  return (
    <button className="card" onClick={onClick}>
      <img src={game.background_image} className="card-image" />
      <span className="card-name">{game.name}</span>
    </button>
  );
}
