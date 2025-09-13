import styles from "./DropDownMenu.module.css";

function DropDownMenu({ style }) {
  return (
    <div style={style} className={styles.container}>
      <p
        className={styles.selection}
        onClick={(e) => console.log(e.currentTarget)}
      >
        Waldo
      </p>
      <p
        className={styles.selection}
        onClick={(e) => console.log(e.currentTarget)}
      >
        Wizard
      </p>
      <p
        className={styles.selection}
        onClick={(e) => console.log(e.currentTarget)}
      >
        Wanda
      </p>
    </div>
  );
}

export default DropDownMenu;
