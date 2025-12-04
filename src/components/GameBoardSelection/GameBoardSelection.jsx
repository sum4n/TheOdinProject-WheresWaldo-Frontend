import { Link, useOutletContext } from "react-router";

function BoardSelection() {
  const { boardList } = useOutletContext();
  // console.log(boardList);

  return (
    <>
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
