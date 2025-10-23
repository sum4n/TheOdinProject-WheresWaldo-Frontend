import { useState } from "react";
import styles from "./GameEndPopup.module.css";

function GameEndPopup({ timeTaken }) {
  const [username, setUserName] = useState("");

  function handleInput(e) {
    setUserName(e.target.value);
  }

  return (
    <div className={styles.container}>
      <p className={styles.gzText}>Congratulations!</p>
      <p className={styles.text}>You've found all characters!!</p>
      <p className={styles.text}>Time taken: {timeTaken}</p>
      <form action="#" method="post">
        <label htmlFor="username">Enter name to check ranking:</label>
        <br />
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={handleInput}
        />
        <br />
        <input type="submit" value="Submit" />
      </form>
      <p>
        <a href="#">Start new game</a>
      </p>
    </div>
  );
}

export default GameEndPopup;
