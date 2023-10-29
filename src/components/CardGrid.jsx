import Card from "./Card";
export default function CardGrid({ results, clickCard }) {
  console.log("CardGrid Render triggered");

  return (
    <div className="card-grid">
      {results.map((game, i) => {
        // return <img src={item.background_image} key={i} />;
        return <Card game={game} key={game.id} onClick={clickCard} />;
      })}
    </div>
  );
}
