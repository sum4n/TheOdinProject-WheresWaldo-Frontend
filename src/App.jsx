import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import waldoImg from "./assets/waldo.jpeg";
import "./App.css";
import DropDownMenu from "./components/DropDownMenu/DropDownMenu";

function App() {
  const [showDropDown, setShowDropDown] = useState(false);
  const [clickPosition, setClickPosition] = useState({ left: 0, top: 0 });
  const [pixelPosition, setPixelPosition] = useState({ left: 0, top: 0 });

  function clickImgHandler(e) {
    toggleDropDown();

    const img = e.currentTarget;
    const rect = img.getBoundingClientRect();

    // Calculate click postion relative to the displayed image
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setClickPosition({ left: x, top: y });

    // Calculate click position relative to the natural image resolution
    const scaleX = img.naturalWidth / rect.width;
    const scaleY = img.naturalHeight / rect.height;

    const actualX = Math.round(x * scaleX);
    const actualY = Math.round(y * scaleY);

    setPixelPosition({ left: actualX, top: actualY });

    // console.log(img);
    // console.log(rect);
    // console.log(e.clientX, e.clientY);
    // console.log(`Clicked position: ${x}px X, ${y}px Y`);
    // console.log({ scaleX, scaleY });
    // console.log(`The actual click position: ${actualX}px X, ${actualY}px Y`);
  }

  function toggleDropDown() {
    setShowDropDown((prev) => !prev);
  }

  return (
    <>
      <div className="container">
        <img
          className="waldoImg"
          src={waldoImg}
          alt="crowd at beach"
          onClick={clickImgHandler}
        />
        {!showDropDown ? null : (
          <DropDownMenu
            style={{
              position: "absolute",
              left: clickPosition.left,
              top: clickPosition.top,
              border: "2px solid black",
            }}
            location={pixelPosition}
            toggleDropDown={toggleDropDown}
          />
        )}
      </div>
    </>
  );
}

export default App;
