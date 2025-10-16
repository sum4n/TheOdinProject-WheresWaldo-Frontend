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
      `http://localhost:3000/api/characters/check/${e.currentTarget.textContent}?x=${location.left}&y=${location.top}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data.success);
        if (data.success == true) {
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
          <p
            key={character}
            className={styles.selection}
            onClick={clickHandler}
          >
            {character}
          </p>
        );
      })}
    </div>
  );
}

export default DropDownMenu;
