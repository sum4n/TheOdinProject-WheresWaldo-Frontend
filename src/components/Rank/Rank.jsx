import { useEffect, useState } from "react";
import {
  Link,
  useLocation,
  useOutletContext,
  useParams,
  useNavigate,
} from "react-router";

function Rank() {
  const [scores, setScores] = useState();
  const { state } = useLocation();
  // console.log(state);

  let navigate = useNavigate();

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

  function handleBoardChange(e) {
    console.log(e.target.value);
    const boardId = e.target.value;
    navigate(`/ranking/${boardId}`);
  }

  return (
    <>
      <form method="get">
        <label htmlFor="boards">Choose a board: </label>
        <select
          name="boards"
          id="boards"
          onChange={handleBoardChange}
          value={boardId}
        >
          {boardList.map((board) => {
            return (
              <option key={board.id} value={board.id}>
                {board.name}
              </option>
            );
          })}
        </select>
      </form>

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
      <Link to={"/"}>Start new game</Link>
    </>
  );
}

export default Rank;
