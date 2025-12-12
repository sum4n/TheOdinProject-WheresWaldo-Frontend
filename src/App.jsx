import { useEffect, useState } from "react";
import "./App.css";
import { Outlet } from "react-router";

function App() {
  const [boardList, setBoardList] = useState([]);
  const [clickResult, setClickResult] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/assets", { credentials: "include" })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        setBoardList(data.gameBoard);
      });
  }, []);

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
      <Outlet context={{ boardList }} />
    </>
  );
}

export default App;
