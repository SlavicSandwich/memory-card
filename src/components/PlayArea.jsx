import ScoreProgress from "./ScoreProgress";
import CardGrid from "./CardGrid";
export default function PlayArea({ imageFetcher }) {
  return (
    <main className="play-area">
      <ScoreProgress />

      <CardGrid />
    </main>
  );
}
