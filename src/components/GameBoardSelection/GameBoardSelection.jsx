import { Link, useOutletContext } from "react-router";
import Header from "../Header/Header";

function BoardSelection() {
  const { boardList } = useOutletContext();
  // console.log(boardList);

  return (
    <>
      <Header />
      <h1>Select a board to play</h1>
      {!boardList ? (
        <p>No board</p>
      ) : (
        boardList.map((object) => {
          return (
            <Link to={`/boards/${object.name}`} key={object.id}>
              <img
                style={{ width: "200px", height: "200px" }}
                key={object.id}
                src={object.imgUrl}
              />
            </Link>
          );
        })
      )}
    </>
  );
}

export default BoardSelection;
