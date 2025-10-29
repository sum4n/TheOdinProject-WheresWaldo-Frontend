import { useState } from "react";
import styles from "./GameEndPopup.module.css";

function GameEndPopup({ timeTaken }) {
  const [username, setUserName] = useState("");

  function handleInput(e) {
    setUserName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch("http://localhost:3000/api/score", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username }),
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  }

  return (
    <div className={styles.container}>
      <p className={styles.gzText}>Congratulations!</p>
      <p className={styles.text}>You've found all characters!!</p>
      <p className={styles.text}>Time taken: {timeTaken}</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Enter name to check ranking:</label>
        <br />
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={handleInput}
          required
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
