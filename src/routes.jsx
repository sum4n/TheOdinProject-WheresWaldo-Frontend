import App from "./App.jsx";
import Rank from "./components/Rank/Rank.jsx";
import GameBoard from "./components/GameBoard/GameBoard.jsx";
import BoardSelection from "./components/GameBoardSelection/GameBoardSelection.jsx";
import ErrorPage from "./components/ErrorPage/ErrorPage.jsx";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <BoardSelection /> },
      { path: "/boards/:boardname", element: <GameBoard /> },
      { path: "/ranking/:boardId", element: <Rank /> },
    ],
  },
];

export default routes;
