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
  function clickHandler(e) {
    console.log(location);
    console.log(e.currentTarget.textContent);

    // Close dropdown on click
    toggleDropDown();

    fetch(
      `http://localhost:3000/api/characters/check/${e.currentTarget.id}?x=${location.left}&y=${location.top}`,
      { credentials: "include" }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setClickResult(data);
        if (data.gameEnd) {
          handleCharacterFound(clickPosition, data.name);
          setGameEnd(true);
          setTimeTaken(data.timeElapsed);
        }
        if (data.success) {
          handleCharacterFound(clickPosition, data.name);
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
              onClick={clickHandler}
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
