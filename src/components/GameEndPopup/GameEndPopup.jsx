import { useEffect, useState } from "react";
import styles from "./GameEndPopup.module.css";
import { useNavigate } from "react-router";

function GameEndPopup() {
  const [username, setUserName] = useState("");
  const [errors, setErrors] = useState();
  const [resultData, setResultData] = useState({});

  useEffect(() => {
    fetch("http://localhost:3000/api/score", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setResultData(data);
      });
  }, []);

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
          navigate("ranking", { state: { username: username } });
        } else {
          setErrors(data.message[0]);
        }
      });
  }

  return (
    <div className={styles.container}>
      <p className={styles.gzText}>Congratulations!</p>
      <p className={styles.text}>You've found all characters!!</p>
      <p className={styles.text}>Time taken: {resultData.timeElapsed}</p>
      {resultData.rank <= 20 ? (
        <>
          <p className={styles.text}>Rank: {resultData.rank}</p>
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
        </>
      ) : (
        <p>
          You are not in top 20. You need to be in top 20 to save your score
        </p>
      )}

      <p>
        <a href="/">Start new game</a>
      </p>
    </div>
  );
}

export default GameEndPopup;
