import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";

function Rank() {
  const [scores, setScores] = useState();
  const { state } = useLocation();
  // console.log(state);

  useEffect(() => {
    fetch("http://localhost:3000/api/score", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setScores(data.scores);
      });
  }, []);

  return (
    <>
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
