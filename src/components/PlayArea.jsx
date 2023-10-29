import ScoreProgress from "./ScoreProgress";
import CardGrid from "./CardGrid";
export default function PlayArea({ imageFetcher, results }) {
  return (
    <main className="play-area">
      <ScoreProgress />
      {results.length > 0 ? <CardGrid results={results} /> : ""}
      {/* <CardGrid results={results} /> */}
      <button onClick={imageFetcher} />
    </main>
  );
}
