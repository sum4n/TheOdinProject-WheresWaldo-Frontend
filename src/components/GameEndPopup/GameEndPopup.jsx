import { useState } from "react";

function GameEndPopup({ timeTaken }) {
  const [username, setUserName] = useState("");

  function handleInput(e) {
    setUserName(e.target.value);
  }

  return (
    <div>
      <p>Congratulations!</p>
      <p>You've found all characters!!</p>
      <p>Time taken: {timeTaken}</p>
      <form action="#" method="post">
        <label htmlFor="username">Enter name to check ranking:</label>
        <br />
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={handleInput}
        />
        <br />
        <input type="submit" value="Submit" />
      </form>
      <a href="#">Start new game</a>
    </div>
  );
}

export default GameEndPopup;
