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
  function clickHandler(character) {
    // console.log(location);

    // Close dropdown on click
    toggleDropDown();

    fetch(
      `http://localhost:3000/api/characters/check/${character.name}?x=${location.left}&y=${location.top}`,
      { credentials: "include" }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setClickResult(data);
        if (data.success) {
          handleCharacterFound(clickPosition, data.name, data.timeElapsed);
        }
        if (data.gameEnd) {
          setGameEnd(true);
          setTimeTaken(data.timeElapsed);
        }
      });
  }

  return (
    <div
      style={{ left: `${clickPosition.left}%`, top: `${clickPosition.top}%` }}
      className={styles.container}
    >
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
