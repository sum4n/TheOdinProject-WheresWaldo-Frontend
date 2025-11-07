import { useState } from "react";
import styles from "./GameEndPopup.module.css";
import { useNavigate } from "react-router";

function GameEndPopup({ timeTaken }) {
  const [username, setUserName] = useState("");
  const [errors, setErrors] = useState();

  let navigate = useNavigate();

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
      .then((data) => {
        // console.log(data);
        if (data.message == "success") {
          navigate("ranking");
        } else {
          setErrors(data.message[0]);
        }
      });
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
        {errors && <p className={styles.error}>{errors.msg}</p>}
        <br />
        <input type="submit" value="Submit" />
      </form>
      <p>
        <a href="/">Start new game</a>
      </p>
    </div>
  );
}

export default GameEndPopup;
