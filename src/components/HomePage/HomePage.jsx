import { Link } from "react-router";

function HomePage() {
  return (
    <>
      <p>Welcome to Where's Waldo Game</p>
      <p>How fast can you find the characters?</p>
      <p>Your name will be recored if find all the characters fast enough.</p>
      <p>
        <Link to="/boards">Select a game </Link>
      </p>
      <p>
        <Link to="waldo/ranking">Leaderboard</Link>
      </p>
    </>
  );
}

export default HomePage;
