import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import waldoImg from "./assets/waldo.jpeg";
import "./App.css";
import DropDownMenu from "./components/DropDownMenu/DropDownMenu";

function App() {
  const [showDropDown, setShowDropDown] = useState(false);

  function clickImgHandler(e) {
    console.log(e.currentTarget);
    setShowDropDown((prev) => !prev);
  }

  return (
    <>
      <img
        className="waldoImg"
        src={waldoImg}
        alt="crowd at beach"
        onClick={clickImgHandler}
      />
      {!showDropDown ? null : <DropDownMenu />}
    </>
  );
}

export default App;
