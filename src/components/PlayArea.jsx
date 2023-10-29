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
}) {
  useEffect(() => {
    console.log("effect triggered");
    setResults(shuffle(results));
  }, [clickedCards]);
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
