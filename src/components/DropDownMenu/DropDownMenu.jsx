import styles from "./DropDownMenu.module.css";

function DropDownMenu({
  style,
  location,
  toggleDropDown,
  markLocation,
  characterList,
}) {
  function clickHandler(e) {
    console.log(location);
    console.log(e.currentTarget.textContent);

    // Close dropdown on click
    toggleDropDown();

    fetch(
      `http://localhost:3000/api/characters/${e.currentTarget.textContent}?x=${location.left}&y=${location.top}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data.success);
        if (data.success == true) {
          alert(`You found ${data.character.name}`);
          markLocation(data.character.name);
        } else {
          alert("Not found");
        }
      });
  }

  return (
    <div style={style} className={styles.container}>
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
