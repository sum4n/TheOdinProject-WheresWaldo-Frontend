import { Link, useOutletContext } from "react-router";
import Header from "../Header/Header";
import styles from "./GameBoardSelection.module.css";

function BoardSelection() {
  const { boardList, error, loading } = useOutletContext();
  // console.log(boardList);

  return (
    <>
      <Header boardId={boardList.length > 0 ? boardList[0].id : undefined} />
      <h1>Select a board to play</h1>
      <div className={styles.boardListContainer}>
        {error && <p>{error.message}</p>}
        {!error && loading && <p>Loading boards...</p>}
        {!loading && !error && boardList.length === 0 && (
          <p>No boards available</p>
        )}
        {!error &&
          !loading &&
          boardList.map((board) => {
            return (
              <Link
                className={styles.boardLink}
                to={`/boards/${board.name}`}
                key={board.id}
              >
                <img
                  className={styles.boardImg}
                  src={board.imgUrl}
                  alt={board.name}
                />
                <div>
                  {board.characters.map((character) => {
                    return (
                      <img
                        key={character.id}
                        className={styles.characterImg}
                        src={character.imgUrl}
                        alt={character.name}
                      />
                    );
                  })}
                </div>
              </Link>
            );
          })}
      </div>
    </>
  );
}

export default BoardSelection;
