import { useEffect, useState } from "react";
import { Link, useLocation, useOutletContext, useParams } from "react-router";
import Header from "../Header/Header";
import styles from "./Rank.module.css";

function Rank() {
  const [scores, setScores] = useState();
  const { state } = useLocation();
  // console.log(state);

  const { boardId } = useParams();

  useEffect(() => {
    fetch(`http://localhost:3000/api/gameboards/${boardId}/score`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setScores(data.scores);
      });
  }, [boardId]);

  const { boardList } = useOutletContext();

  return (
    <>
      <Header />
      <div className={styles.mainContent}>
        <div className={styles.boardNameContainer}>
          {boardList.map((board) => {
            return (
              <Link
                key={board.id}
                to={`/ranking/${board.id}`}
                className={`${styles.boardName} ${
                  board.id == boardId && styles.boardSelected
                }`}
              >
                {board.name}
              </Link>
            );
          })}
        </div>
        <div className={styles.scoreContainer}>
          <p>Rank:</p>
          {!scores && <p>Loading...</p>}
          {scores && scores.length === 0 && <p>No ranking found...</p>}
          {scores && scores.length > 0 && (
            <ol>
              {scores.map((score) => {
                return (
                  <li key={score.id}>
                    {state && score.username == state.username ? (
                      <p style={{ textDecoration: "underline" }}>
                        {score.username} - {score.time}{" "}
                      </p>
                    ) : (
                      <p>
                        {score.username} - {score.time}
                      </p>
                    )}
                  </li>
                );
              })}
            </ol>
          )}
        </div>
      </div>
      <Link to={"/"}>Start new game</Link>
    </>
  );
}

export default Rank;
