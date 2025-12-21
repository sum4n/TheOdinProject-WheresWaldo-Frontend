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
  // console.log(boardList);

  const currentBoard = boardList.find((board) => board.id == boardId);

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
          <div className={styles.currentBoardBanner}>
            {currentBoard && (
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

          {!scores && <p>Loading...</p>}
          {scores && scores.length === 0 && <p>No ranking found...</p>}
          {scores && scores.length > 0 && (
            <table>
              <tbody>
                <tr>
                  <th>Rank</th>
                  <th>Player</th>
                  <th>Time</th>
                  <th>Date</th>
                </tr>

                {scores.map((score) => {
                  return (
                    <tr
                      key={score.id}
                      className={
                        state && state.username === score.username
                          ? styles.selectedScore
                          : undefined
                      }
                    >
                      <td>{scores.indexOf(score) + 1}</td>
                      <td>{score.username}</td>
                      <td>{score.time}</td>
                      <td>{score.createdAt.substring(0, 10)}</td>
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
