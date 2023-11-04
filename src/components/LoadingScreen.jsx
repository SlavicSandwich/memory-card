import logo from "../assets/Scorpion mortal kombat 12.gif";
import "../css/loadingScreen.css";
export default function LoadingScreen() {
  return (
    <div className="loading-screen">
      {/* <div className="loading-animation"></div> */}
      <img src={logo} className="loading-animation" />
      <p>Loading games...</p>
    </div>
  );
}
