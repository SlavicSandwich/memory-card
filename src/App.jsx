import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import PlayArea from "./components/PlayArea";
const api_key = "cb9ac62f19e6479f95a9f97f416cfeeb";

function App() {
  const [results, setResults] = useState([]);
  const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
  };

  const getRandomRAWGPage = async () => {
    const amount_of_iterations = getRandomInt(10);
    let first_request = true;
    let res, res_obj;
    //Due to the fact that API returns only 20 games per fetch,
    //it is required to make sequential random amount of fetches,
    //to get Radnom set of game per new game.
    for (let i = 0; i < amount_of_iterations + 1; i++) {
      if (first_request) {
        res = await fetch(`https://rawg.io/api/games?token&key=${api_key}`);
        first_request = false;
      } else {
        res = await fetch(res_obj.next);
      }
      res_obj = await res.json();
    }
    setResults(res_obj.results);
  };
  return (
    <div className="app">
      <Header />
      <PlayArea imageFetcher={getRandomRAWGPage} results={results} />
    </div>
  );
}

export default App;
