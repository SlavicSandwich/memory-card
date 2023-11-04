import { useState } from "react";
import "./css/App.css";
import Header from "./components/Header";
import PlayArea from "./components/PlayArea";
import LoadingScreen from "./components/LoadingScreen";
import StartScreen from "./components/StartScreen";
import GameOverModal from "./components/GameOverModal";
const api_key = "cb9ac62f19e6479f95a9f97f416cfeeb";
const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
};
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
// const MIN_LOAD_TIME = 250;
const MIN_LOAD_TIME = 1000;
// const setBackgroundImage = async () => {
//   const res = await fetch(
//     `https://rawg.io/api/games?token&key=${api_key}&page=${1}`
//   );
//   const res_obj = await res.json();
//   const game = res_obj.results[getRandomInt(20)];
//   document.body.style.backgroundImage = `url(${game.background_image})`;
// };
// // const arr = await getRandomRAWGPage();
// // document.body.style.backgroundImage = `url(${
// //   getRandomRAWGPage(2)[getRandomInt(20)].background_image
// // })`;
// // console.log(arr);
// // console.log(getRandomRAWGPage());
// setBackgroundImage();

function App() {
  const [results, setResults] = useState([]);
  const [number_of_cards, setNumberOfCards] = useState(5);
  const [clicked_cards, setClickedCards] = useState(new Set());
  const [game_state, setGameState] = useState("menu");
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [loading, setLoading] = useState(false);
  console.log(clicked_cards);

  // const getRandomRAWGPage = async () => {
  //   const amount_of_iterations = getRandomInt(10);
  //   let first_request = true;
  //   let res, res_obj;
  //   //Due to the fact that API returns only 20 games per fetch,
  //   //it is required to make sequential random amount of fetches,
  //   //to get Radnom set of game per new game.
  //   for (let i = 0; i < amount_of_iterations + 1; i++) {
  //     if (first_request) {
  //       res = await fetch(`https://rawg.io/api/games?token&key=${api_key}`);
  //       first_request = false;
  //     } else {
  //       res = await fetch(res_obj.next);
  //     }
  //     res_obj = await res.json();
  //   }
  //   return res_obj.results;
  // };

  const getRandomRAWGPage = async () => {
    const res = await fetch(
      `https://rawg.io/api/games?token&key=${api_key}&page=${getRandomInt(100)}`
    );
    const res_obj = await res.json();
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
    setLoading(true);
    await sleep(MIN_LOAD_TIME);
    const games_array = await getRandomRAWGPage();
    const selected_games = getRandomItems(games_array, number_of_games);
    setGameState("in play");
    setResults(selected_games);
    setClickedCards(new Set());
    setLoading(false);
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
      // setScore(0);
      return;
    }
    new_cards.add(e.target.lastChild.textContent);
    if (new_cards.size === number_of_cards) {
      setGameState("win");
      setScore(score + 1);
      setHighScore(score + 1 > highScore ? score + 1 : highScore);
      setClickedCards(new_cards);
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
    // if (gameState === "loss") {
    //   console.log("Game lost");
    //   setResults([]);
    //   setClickedCards(new Set());
    //   // setGameState("menu");
    //   setScore(0);
    // }
    // if (gameState === "win") {
    //   console.log("Game Won");
    //   setResults([]);
    //   setClickedCards(new Set());
    //   // setGameState("menu");
    //   // setHighScore(score + 1 > highScore ? score + 1 : highScore);
    // }
  };

  const handleContinue = () => {
    setNumberOfCards(number_of_cards + 1);
    generateResultArray(number_of_cards + 1);
  };

  const handlePlayAgain = () => {
    setGameState("in play");
    generateResultArray(number_of_cards);
    setScore(0);
  };

  const handleQuit = () => {
    setGameState("menu");
    setScore(0);
  };

  return (
    <>
      <div className="bg-image"></div>
      <div className="app">
        {loading ? (
          <LoadingScreen />
        ) : game_state === "menu" ? (
          <StartScreen
            onStart={(number_of_cards) => {
              setGameState("in play");
              setNumberOfCards(number_of_cards);
              generateResultArray(number_of_cards);
            }}
          />
        ) : (
          <>
            {(game_state === "win" || game_state === "loss") && (
              <GameOverModal
                status={game_state}
                score={score}
                onPlayAgain={handlePlayAgain}
                onQuit={handleQuit}
                onContinue={handleContinue}
              />
            )}
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
          </>
        )}
      </div>
    </>
  );
}

const setBackgroundImage = async () => {
  const res = await fetch(
    `https://rawg.io/api/games?token&key=${api_key}&page=${1}`
  );
  const res_obj = await res.json();
  const game = res_obj.results[getRandomInt(20)];
  document.querySelector(
    ".bg-image"
  ).style.backgroundImage = `url(${game.background_image})`;
};

setBackgroundImage();
export default App;
