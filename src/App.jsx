import { useEffect, useState } from "react";
import "./App.css";
import { Outlet } from "react-router";

function App() {
  const [characterList, setCharacterList] = useState([]);
  const [boardList, setBoardList] = useState([]);
  const [clickResult, setClickResult] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/assets", { credentials: "include" })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        setBoardList(data.gameBoard);
        setCharacterList(data.characters);
        // setAssets(data);
      });
  }, []);
  // console.log(assets);

  useEffect(() => {
    if (clickResult) {
      const timeout = setTimeout(() => setClickResult(null), 1000);
      return () => {
        clearTimeout(timeout);
      };
    }
  });

  return (
    <>
      <h1>Where's Waldo</h1>
      <Outlet context={{ boardList, characterList, setCharacterList }} />
    </>
  );
}

export default App;
