import { Link, useOutletContext, useParams } from "react-router";
import { useEffect, useState } from "react";
import DropDownMenu from "../DropDownMenu/DropDownMenu";
import Marker from "../Marker/Marker";
import GameEndPopup from "../GameEndPopup/GameEndPopup";
import ClickResultNotification from "../ClickResultNotification/ClickResultNotification";
import styles from "./GameBoard.module.css";
import Header from "../Header/Header";

function GameBoard() {
  const [showDropDown, setShowDropDown] = useState(false);
  const [clickPosition, setClickPosition] = useState({ left: 0, top: 0 });
  const [pixelPosition, setPixelPosition] = useState({ left: 0, top: 0 });
  const [characterLocations, setCharacterLocations] = useState([]);
  const [gameEnd, setGameEnd] = useState(false);
  const [timeTaken, setTimeTaken] = useState(null);
  const [clickResult, setClickResult] = useState(null);
  const [characters, setCharacters] = useState([]);
  const [charLoading, setCharLoading] = useState(true);
  const [charError, setCharError] = useState(null);

  // get name of the board from the url parameter.
  const { boardname } = useParams();
  // console.log(boardname);

  // get list of boards
  const { boardList, loading, error } = useOutletContext();

  // find the specific board to play
  // this condition is needed, else page refresh will cause error.
  // find board from list of boards.
  const boardObject = boardList?.find((board) => board.name == boardname);
  // console.log(boardList);

  // get board characters
  useEffect(() => {
    // if - prevents error in page refresh
    if (boardObject) {
      fetch(`http://localhost:3000/api/${boardObject.id}/characters`, {
        credentials: "include",
      })
        .then((response) => {
          if (response.status >= 400) {
            throw new Error("Failed to load characters");
          }
          return response.json();
        })
        .then((data) => {
          setCharacters(data);
          // console.log(data);
        })
        .catch((error) => setCharError(error))
        .finally(() => setCharLoading(false));
    }
  }, [boardObject]);

  useEffect(() => {
    if (clickResult) {
      const timeout = setTimeout(() => setClickResult(null), 1000);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [clickResult]);

  function handleCharacterFound(location, name, timeTaken) {
    // set location of the discovered character
    setCharacterLocations([...characterLocations, location]);
    // console.log(characters);
    // remove the character from the dropdown list
    // add custom found property to individual character when discovered
    setCharacters((prev) =>
      prev.map((character) =>
        character.name === name
          ? { ...character, found: true, timeTaken: timeTaken }
          : character
      )
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

  if (loading) {
    return (
      <>
        <Header />
        <p>Loading board...</p>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <p>{error.message}</p>
      </>
    );
  }

  if (!boardObject) {
    return (
      <>
        <Header />
        <p>Board not found</p>
      </>
    );
  }

  return (
    <>
      <Header
        characters={characters}
        gameEnd={gameEnd}
        boardId={boardObject && boardObject.id}
      />
      <div className={styles.container}>
        {charLoading && <p>Loading characters...</p>}
        {charError && <p>{charError.message}</p>}
        {!charLoading && !charError && (
          <img
            className={styles.boardImg}
            src={boardObject.imgUrl}
            alt={boardObject.name + " board"}
            onClick={clickImgHandler}
          />
        )}
        {!showDropDown ? null : (
          <div>
            <DropDownMenu
              clickPosition={clickPosition}
              location={pixelPosition}
              toggleDropDown={toggleDropDown}
              characterList={characters}
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
        {gameEnd && (
          <GameEndPopup timeTaken={timeTaken} boardObject={boardObject} />
        )}
        {clickResult && <ClickResultNotification clickResult={clickResult} />}
      </div>
    </>
  );
}

export default GameBoard;
