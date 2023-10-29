import ScoreProgress from "./ScoreProgress";
import CardGrid from "./CardGrid";
import { useEffect } from "react";
export default function PlayArea({
  imageFetcher,
  results,
  setResults,
  shuffle,
  clickedCards,
  clickCard,
  gameState,
  handleGame,
}) {
  useEffect(() => {
    console.log("effect triggered");
    handleGame(gameState);
  }, [clickedCards, gameState]);

  console.log(results);

  return (
    <main className="play-area">
      <ScoreProgress />
      {results.length > 0 ? (
        <CardGrid results={results} clickCard={clickCard} />
      ) : (
        ""
      )}
      {/* <CardGrid results={results} /> */}
      <button onClick={imageFetcher} />
    </main>
  );
}
