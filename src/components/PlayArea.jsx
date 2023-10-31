import ScoreProgress from "./ScoreProgress";
import CardGrid from "./CardGrid";
import { useEffect } from "react";
import "../css/main.css";
export default function PlayArea({
  imageFetcher,
  results,
  setResults,
  shuffle,
  clickedCards,
  clickCard,
  gameState,
  handleGame,
  numberOfCards,
}) {
  useEffect(() => {
    console.log("effect triggered");
    handleGame(gameState);
  }, [clickedCards, gameState]);

  console.log(results);

  return (
    <main className="play-area">
      <ScoreProgress
        numberOfCards={numberOfCards}
        guesses={clickedCards.size}
      />
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
