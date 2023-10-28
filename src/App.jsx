// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import PlayArea from "./components/PlayArea";
const api_key = "cb9ac62f19e6479f95a9f97f416cfeeb";
import TestImage from "./TestImage";

function App() {
  const [results, setResults] = useState([]);
  // const getImage = async () => {
  //   const res = await fetch(`https://rawg.io/api/games?token&key=${api_key}`);
  //   const { results } = await res.json();
  //   // console.log(results);
  //   setResults(results[5]);
  // };

  const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
  };

  const getRandomRAWGPage = async () => {
    const amount_of_iterations = getRandomInt(10);
    let first_request = true;
    let res, res_obj;
    //Due to the fact that API returns only 20 games per fetch,
    //it is required to make sequential random amount of fetches.
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

  // const testButton = () => {
  //   getRandomRAWGPage();
  // };
  return (
    <div className="app">
      <Header />
      <PlayArea imageFetcher={getRandomRAWGPage} />
      {/* {results.map((item, i) => {
        return <TestImage key={i} src={item.background_image} />;
      })} */}
      {/* <button onClick={testButton} /> */}
    </div>
  );
}

export default App;
