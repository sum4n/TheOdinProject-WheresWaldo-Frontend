import { useEffect, useState } from "react";
import styles from "./GameEndPopup.module.css";
import { Link, useNavigate } from "react-router";

function GameEndPopup({ boardObject }) {
  const [username, setUserName] = useState("");
  const [errors, setErrors] = useState();
  const [resultData, setResultData] = useState({});

  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_BASE_URL}/api/gameboards/${boardObject.id}/rank`,
      {
        credentials: "include",
      },
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setResultData(data);
      });
  }, [boardObject.id]);

  let navigate = useNavigate();

  function handleInput(e) {
    setUserName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch(
      `${import.meta.env.VITE_BASE_URL}/api/gameboards/${boardObject.id}/score`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: username }),
        credentials: "include",
      },
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.message == "success") {
          navigate(`/ranking/${boardObject.id}`, {
            state: { scoreId: data.score.id },
          });
          // console.log("score saved");
        } else {
          setErrors(data.message[0]);
        }
      });
  }

  return (
    <div className={styles.container}>
      <p className={styles.gzText}>Congratulations!</p>
      <p className={styles.text}>You've found all characters!!</p>
      <p className={styles.text}>Time taken: {resultData.timeElapsed}s</p>

      <p className={styles.text}>Rank: {resultData.rank}</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Save you name on the leaderboard:</label>
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

      <p className={styles.linkContainer}>
        <Link to="/" className={styles.link}>
          Start new game
        </Link>
      </p>
    </div>
  );
}

export default GameEndPopup;
