import { useEffect, useState } from "react";
import "./App.css";
import { Outlet } from "react-router";

function App() {
  const [boardList, setBoardList] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/gameboards", { credentials: "include" })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        setBoardList(data);
      });
  }, []);

  return <Outlet context={{ boardList }} />;
}

export default App;
