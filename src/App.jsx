import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import PlayArea from "./components/PlayArea";
const api_key = "cb9ac62f19e6479f95a9f97f416cfeeb";
const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
};
function App() {
  const [results, setResults] = useState([]);
  const [number_of_cards, setNumberOfCards] = useState(5);
  const [clicked_cards, setClickedCards] = useState(new Set());
  const [game_state, setGameState] = useState("menu");
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  console.log(clicked_cards);

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
    return res_obj.results;
  };

  const getRandomItems = (arr, n) => {
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

  const generateResultArray = async (number_of_games) => {
    const games_array = await getRandomRAWGPage();
    const selected_games = getRandomItems(games_array, number_of_games);
    setGameState("in play");
    setResults(selected_games);
    setClickedCards(new Set());
  };

  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex > 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  const clickCard = (e) => {
    // console.log(e.target.lastChild.textContent);
    const new_cards = new Set(clicked_cards);
    if (new_cards.has(e.target.lastChild.textContent)) {
      setGameState("loss");
      setScore(0);
      return;
    }
    new_cards.add(e.target.lastChild.textContent);
    if (new_cards.size === number_of_cards) {
      setGameState("win");
      setScore(score + 1);
      setHighScore(score + 1 > highScore ? score + 1 : highScore);
    } else {
      setClickedCards(new_cards);
      setScore(score + 1);
      setHighScore(score + 1 > highScore ? score + 1 : highScore);
    }
    // console.log(clicked_cards);
  };

  const handleGame = (gameState) => {
    if (gameState === "in play") {
      setResults(shuffle(results));
      // setScore(clicked_cards.size);
      // setHighScore(score + 1 > highScore ? score + 1 : highScore);
    }
    if (gameState === "loss") {
      console.log("Game lost");
      setResults([]);
      setClickedCards(new Set());
      setGameState("menu");
      setScore(0);
    }
    if (gameState === "win") {
      console.log("Game Won");
      setResults([]);
      setClickedCards(new Set());
      setGameState("menu");
      // setHighScore(score + 1 > highScore ? score + 1 : highScore);
    }
  };

  return (
    <div className="app">
      <Header score={score} highScore={highScore} />
      <PlayArea
        imageFetcher={() => generateResultArray(number_of_cards)}
        results={results}
        setResults={setResults}
        shuffle={shuffle}
        clickedCards={clicked_cards}
        clickCard={clickCard}
        gameState={game_state}
        handleGame={handleGame}
        numberOfCards={number_of_cards}
      />
    </div>
  );
}

export default App;
