import logo from "../assets/Jacko-guilty-gear-unscreen.gif";
export default function LoadingScreen() {
  return (
    <div className="loading-screen">
      {/* <div className="loading-animation"></div> */}
      <img src={logo} className="loading-animation" />
      <p>Loading games...</p>
    </div>
  );
}
