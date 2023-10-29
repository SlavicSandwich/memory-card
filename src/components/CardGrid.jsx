import Card from "./Card";
export default function CardGrid({ results }) {
  const getRandomGames = (arr, n) => {
    let len = arr.length;
    const result = new Array(n),
      taken = new Set();
    if (n > len)
      throw new RangeError(
        "Amount of elements to randomly select is bigger than length of an arrray"
      );
    while (n--) {
      const x = Math.floor(Math.random() * len);
      result[n] = arr[x in taken ? taken[x] : x];
      taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
  };
  const game_cards = getRandomGames(results, 5);
  return (
    <div className="card-grid">
      {game_cards.map((game, i) => {
        // return <img src={item.background_image} key={i} />;
        return <Card game={game} key={i} />;
      })}
    </div>
  );
}
