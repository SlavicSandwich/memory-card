export default function Card({ game, onClick }) {
  console.log("Card Render triggered");

  return (
    <button className="card" onClick={onClick}>
      <img src={game.background_image} />
      <span>{game.name}</span>
    </button>
  );
}
