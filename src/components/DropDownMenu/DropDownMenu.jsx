import { useState } from "react";
import styles from "./DropDownMenu.module.css";

function DropDownMenu({
  boardId,
  clickLocation,
  actualLocation,
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
    // console.log(actualLocation);
    if (characterCheck) return;

    setCharacterCheck(true);
    setFetchError(null);

    fetch(
      `${import.meta.env.VITE_BASE_URL}/api/game/${boardId}/characters/${character.id}?left=${actualLocation.left}&top=${actualLocation.top}`,
      { credentials: "include" },
    )
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("Server error");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setClickResult(data);
        toggleDropDown(); // close dropdown on fetching without error.
        if (data.success) {
          handleCharacterFound(
            clickLocation,
            data.characterName,
            data.timeElapsed,
          );
        }
        if (data.allCharactersFound) {
          setGameEnd(true);
          setTimeTaken(data.timeElapsed);
        }
      })
      .catch((error) => setFetchError(error))
      .finally(() => setCharacterCheck(false));
  }

  return (
    <div
      style={{ left: `${clickLocation.left}%`, top: `${clickLocation.top}%` }}
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
