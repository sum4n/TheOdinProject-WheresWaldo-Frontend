import { useEffect, useState } from "react";
import "./App.css";
import DropDownMenu from "./components/DropDownMenu/DropDownMenu";
import Marker from "./components/Marker/Marker";
import GameEndPopup from "./components/GameEndPopup/GameEndPopup";
import ClickResultNotification from "./components/ClickResultNotification/ClickResultNotification";

function App() {
  const [showDropDown, setShowDropDown] = useState(false);
  const [clickPosition, setClickPosition] = useState({ left: 0, top: 0 });
  const [pixelPosition, setPixelPosition] = useState({ left: 0, top: 0 });
  const [characterList, setCharacterList] = useState([]);
  const [characterLocations, setCharacterLocations] = useState([]);
  const [boardObject, setBoardObject] = useState({});
  const [gameEnd, setGameEnd] = useState(false);
  const [timeTaken, setTimeTaken] = useState(null);
  const [clickResult, setClickResult] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/assets", { credentials: "include" })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        setBoardObject(data.gameBoard);
        setCharacterList(data.characters);
      });
  }, []);

  useEffect(() => {
    if (clickResult) {
      const timeout = setTimeout(() => setClickResult(null), 1000);
      return () => {
        clearTimeout(timeout);
      };
    }
  });

  function handleCharacterFound(location, name) {
    // set location of the discovered character
    setCharacterLocations([...characterLocations, location]);
    // remove the character from the dropdown list
    console.log(characterList);
    setCharacterList(
      characterList.filter((character) => character.name != name)
    );
  }

  function toggleDropDown() {
    setShowDropDown((prev) => !prev);
  }

  function clickImgHandler(e) {
    toggleDropDown();

    const img = e.currentTarget;
    // Get the element's bounding rectangle
    const rect = img.getBoundingClientRect();

    // Calculate position as percentage
    const percentX = ((e.clientX - rect.left) / rect.width) * 100;
    const percentY = ((e.clientY - rect.top) / rect.height) * 100;

    setClickPosition({ left: percentX, top: percentY });

    // Calculate click postion relative to the displayed image
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

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
    // console.log(percentX, percentY);
  }

  return (
    <>
      <div className="container">
        <img
          className="boardImg"
          src={boardObject.imgUrl}
          alt={boardObject.name + " board"}
          onClick={clickImgHandler}
        />
        {!showDropDown ? null : (
          <div>
            <DropDownMenu
              clickPosition={clickPosition}
              location={pixelPosition}
              toggleDropDown={toggleDropDown}
              characterList={characterList}
              handleCharacterFound={handleCharacterFound}
              setGameEnd={setGameEnd}
              setTimeTaken={setTimeTaken}
              setClickResult={setClickResult}
            />
            <Marker left={clickPosition.left} top={clickPosition.top} />
          </div>
        )}
        {characterLocations.length > 0 &&
          characterLocations.map((characterLocation) => {
            return (
              <Marker
                key={[characterLocation.left, characterLocation.top]}
                left={characterLocation.left}
                top={characterLocation.top}
              />
            );
          })}
        {gameEnd && <GameEndPopup timeTaken={timeTaken} />}
        {clickResult && <ClickResultNotification clickResult={clickResult} />}
      </div>
    </>
  );
}

export default App;
