import { useEffect, useState } from "react";
import { Link } from "react-router";

function Rank() {
  const [scores, setScores] = useState();

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
                {score.username} - {score.time}
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
