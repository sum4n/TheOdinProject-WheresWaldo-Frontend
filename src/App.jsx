import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import waldoImg from "./assets/waldo.jpeg";
import "./App.css";
import DropDownMenu from "./components/DropDownMenu/DropDownMenu";

function App() {
  const [showDropDown, setShowDropDown] = useState(false);
  const [clickPosition, setClickPosition] = useState({ left: 0, top: 0 });

  function clickImgHandler(e) {
    setShowDropDown((prev) => !prev);

    const img = e.currentTarget;
    const rect = img.getBoundingClientRect();

    // console.log(rect);

    // Calculate click postion relative to the displayed image
    // console.log(img);
    // console.log(e.clientX, e.clientY);
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    console.log(`Clicked position: ${x}px X, ${y}px Y`);
    setClickPosition({ left: x, top: y });
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
          />
        )}
      </div>
    </>
  );
}

export default App;
