export default function Card({ game }) {
  return (
    <button className="card">
      <img src={game.background_image} />
      <span>{game.name}</span>
    </button>
  );
}
