import { useEffect, useState } from "react";
import { Link, useLocation, useOutletContext, useParams } from "react-router";
import Header from "../Header/Header";
import styles from "./Rank.module.css";

function Rank() {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const { state } = useLocation();
  // console.log(state);

  const boardId = Number(useParams().boardId);

  useEffect(() => {
    setScores([]);
    setLoading(true);

    fetch(`http://localhost:3000/api/gameboards/${boardId}/score`, {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch scores");
        return res.json();
      })
      .then((data) => {
        // console.log(data);
        setScores(data.scores);
      })
      .catch(() => setScores([]))
      .finally(() => setLoading(false));
  }, [boardId]);

  const { boardList } = useOutletContext();
  // console.log(boardList);

  const currentBoard = boardList.find((board) => board.id === boardId);

  return (
    <>
      <Header boardId={boardId} />
      <div className={styles.mainContent}>
        <div className={styles.boardNameContainer}>
          {boardList.map((board) => {
            return (
              <Link
                key={board.id}
                to={`/ranking/${board.id}`}
                className={`${styles.boardName} ${
                  board.id === boardId ? styles.boardSelected : undefined
                }`}
              >
                {board.name}
              </Link>
            );
          })}
        </div>
        <div className={styles.scoreContainer}>
          <div className={styles.currentBoardBanner}>
            {!loading && currentBoard && (
              <>
                <img
                  src={currentBoard.imgUrl}
                  alt={currentBoard.name}
                  className={styles.currentBoardImg}
                />
                <Link
                  to={`/boards/${currentBoard.name}`}
                  className={styles.currentBoardLink}
                >
                  Play
                </Link>
              </>
            )}
          </div>

          {loading && <p>Loading...</p>}
          {!loading && scores.length === 0 && <p>No ranking found...</p>}
          {scores.length > 0 && (
            <table>
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Player</th>
                  <th>Time</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {scores.map((score, index) => {
                  return (
                    <tr
                      key={score.id}
                      className={
                        state?.scoreId === score.id
                          ? styles.selectedScore
                          : undefined
                      }
                    >
                      <td>{index + 1}</td>
                      <td>{score.username}</td>
                      <td>{score.time}</td>
                      <td>{new Date(score.createdAt).toDateString()}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}

export default Rank;
