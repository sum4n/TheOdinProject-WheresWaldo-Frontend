import { useEffect, useState } from "react";
import "./App.css";
import { Outlet } from "react-router";

function App() {
  const [boardList, setBoardList] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/api/gameboards", { credentials: "include" })
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("Failed to load game boards");
        }
        return response.json();
      })
      .then((data) => {
        // console.log(data);
        setBoardList(data);
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  return <Outlet context={{ boardList, error, loading }} />;
}

export default App;
