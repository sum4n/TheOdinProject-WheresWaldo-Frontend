import { useState } from "react";
import styles from "./DropDownMenu.module.css";

function DropDownMenu({
  clickPosition,
  location,
  toggleDropDown,
  characterList,
  handleCharacterFound,
  setGameEnd,
  setTimeTaken,
  setClickResult,
}) {
  const [characterCheck, setCharacterCheck] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  function clickHandler(character) {
    // console.log(location);
    if (characterCheck) return;

    // Close dropdown on click
    toggleDropDown();

    setCharacterCheck(true);
    setFetchError(null);

    fetch(
      `http://localhost:3000/api/characters/check/${character.name}?x=${location.left}&y=${location.top}`,
      { credentials: "include" }
    )
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("Server error");
        }
        return response.json();
      })
      .then((data) => {
        // console.log(data);
        setClickResult(data);
        if (data.success) {
          handleCharacterFound(clickPosition, data.name, data.timeElapsed);
        }
        if (data.gameEnd) {
          setGameEnd(true);
          setTimeTaken(data.timeElapsed);
        }
      })
      .catch((error) => setFetchError(error))
      .finally(() => setCharacterCheck(false));
  }

  return (
    <div
      style={{ left: `${clickPosition.left}%`, top: `${clickPosition.top}%` }}
      className={styles.container}
    >
      {characterCheck && <p className={styles.checkMsg}>Checking...</p>}
      {fetchError && <p className={styles.errorMsg}>{fetchError.message}</p>}
      {!characterCheck && !fetchError && (
        <p className={styles.checkMsg}>Select:</p>
      )}
      {characterList.map((character) => {
        if (!character.found) {
          return (
            <div
              key={character.id}
              id={character.name}
              className={styles.selection}
              onClick={() => clickHandler(character)}
            >
              <img
                className={styles.characterImg}
                src={character.imgUrl}
                alt={character.name + " image"}
              />
            </div>
          );
        }
      })}
    </div>
  );
}

export default DropDownMenu;
