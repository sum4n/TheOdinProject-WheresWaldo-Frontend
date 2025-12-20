import { useEffect, useState } from "react";
import styles from "./GameEndPopup.module.css";
import { Link, useNavigate } from "react-router";

function GameEndPopup({ boardObject }) {
  const [username, setUserName] = useState("");
  const [errors, setErrors] = useState();
  const [resultData, setResultData] = useState({});

  useEffect(() => {
    fetch(`http://localhost:3000/api/gameboards/${boardObject.id}/score`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setResultData(data);
      });
  }, [boardObject.id]);

  let navigate = useNavigate();

  function handleInput(e) {
    setUserName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch(`http://localhost:3000/api/gameboards/${boardObject.id}/score`, {
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
          navigate(`/ranking/${boardObject.id}`, {
            state: { username: username },
          });
          console.log("score saved");
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
      {resultData.rank <= 20 ? (
        <>
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
        </>
      ) : (
        <p>
          You are not in top 20. You need to be in top 20 to save your score
        </p>
      )}

      <p className={styles.linkContainer}>
        <Link to="/" className={styles.link}>
          Start new game
        </Link>
      </p>
    </div>
  );
}

export default GameEndPopup;
