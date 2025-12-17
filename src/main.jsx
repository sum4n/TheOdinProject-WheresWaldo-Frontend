import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
// import './index.css'
import App from "./App.jsx";
import Rank from "./components/Rank/Rank.jsx";
import GameBoard from "./components/GameBoard/GameBoard.jsx";
import BoardSelection from "./components/GameBoardSelection/GameBoardSelection.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <BoardSelection /> },
      { path: "/boards/:boardname", element: <GameBoard /> },
      { path: "/ranking/:boardId", element: <Rank /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
