import styles from "./DropDownMenu.module.css";

function DropDownMenu({ style, location, toggleDropDown }) {
  function clickHandler(e) {
    console.log(location);
    console.log(e.currentTarget.textContent);

    // Close dropdown on click
    toggleDropDown();

    fetch(
      `http://localhost:3000/api/characters/${e.currentTarget.textContent}?x=${location.left}&y=${location.top}`
    )
      .then((response) => response.json())
      .then((data) => console.log(data));
  }

  return (
    <div style={style} className={styles.container}>
      <p className={styles.selection} onClick={clickHandler}>
        Waldo
      </p>
      <p className={styles.selection} onClick={clickHandler}>
        Wizard
      </p>
      <p className={styles.selection} onClick={clickHandler}>
        Wenda
      </p>
    </div>
  );
}

export default DropDownMenu;
