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
  const [waldoLocation, setWaldoLocation] = useState();
  const [wizardLocation, setWizardLocation] = useState();
  const [wendaLocation, setWendaLocation] = useState();
  const [characterList, setCharacterList] = useState([
    "Waldo",
    "Wizard",
    "Wenda",
  ]);
  // console.log(characterList);
  function markLocationWhenFound(name) {
    // console.log(e);
    // console.log(clickPosition);
    if (name == "Waldo") {
      setWaldoLocation(clickPosition);
      setCharacterList(characterList.filter((name) => name != "Waldo"));
      // console.log(characterList);
    }
    if (name == "Wizard") {
      setWizardLocation(clickPosition);
      setCharacterList(characterList.filter((name) => name != "Wizard"));
    }
    if (name == "Wenda") {
      setWendaLocation(clickPosition);
      setCharacterList(characterList.filter((name) => name != "Wenda"));
    }
  }

  // console.log(waldoLocation);

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
          <div>
            <DropDownMenu
              style={{
                position: "absolute",
                left: clickPosition.left,
                top: clickPosition.top,
                border: "2px solid black",
              }}
              location={pixelPosition}
              toggleDropDown={toggleDropDown}
              markLocation={markLocationWhenFound}
              characterList={characterList}
            />
            <Marker left={clickPosition.left} top={clickPosition.top} />
          </div>
        )}
        {!waldoLocation ? null : (
          <Marker left={waldoLocation.left} top={waldoLocation.top} />
        )}
        {!wizardLocation ? null : (
          <Marker left={wizardLocation.left} top={wizardLocation.top} />
        )}
        {!wendaLocation ? null : (
          <Marker left={wendaLocation.left} top={wendaLocation.top} />
        )}
      </div>
    </>
  );
}

function Marker({ left, top }) {
  return (
    <div
      className="marker"
      style={{
        left: left - 19, // 30px width and height / 2
        top: top - 19, // there is offset of 8px / 2
      }} // so 15+4=19 should be substracted to print the div keeping the click location at the center
    ></div>
  );
}

export default App;
