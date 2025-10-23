import styles from "./DropDownMenu.module.css";

function DropDownMenu({
  clickPosition,
  location,
  toggleDropDown,
  characterList,
  handleCharacterFound,
}) {
  function clickHandler(e) {
    console.log(location);
    console.log(e.currentTarget.textContent);

    // Close dropdown on click
    toggleDropDown();

    fetch(
      `http://localhost:3000/api/characters/check/${e.currentTarget.textContent}?x=${location.left}&y=${location.top}`,
      { credentials: "include" }
    )
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        if (data.gameEnd) {
          alert(`You found ${data.name}`);
          handleCharacterFound(clickPosition, data.name);
          alert(`You won! Time: ${data.timeElapsed}`);
        } else if (data.success) {
          alert(`You found ${data.name}`);
          handleCharacterFound(clickPosition, data.name);
        } else {
          alert("Not found");
        }
      });
  }

  return (
    <div
      style={{ left: `${clickPosition.left}%`, top: `${clickPosition.top}%` }}
      className={styles.container}
    >
      {characterList.map((character) => {
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
      })}
    </div>
  );
}

export default DropDownMenu;
