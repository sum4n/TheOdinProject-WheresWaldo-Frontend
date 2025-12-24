import { Link, useOutletContext } from "react-router";
import Header from "../Header/Header";
import styles from "./GameBoardSelection.module.css";

function BoardSelection() {
  const { boardList } = useOutletContext();
  // console.log(boardList);

  return (
    <>
      <Header />
      <h1>Select a board to play</h1>
      <div className={styles.boardListContainer}>
        {boardList.length === 0 ? (
          <p>No board</p>
        ) : (
          boardList.map((object) => {
            return (
              <Link
                className={styles.boardLink}
                to={`/boards/${object.name}`}
                key={object.id}
              >
                <img
                  className={styles.boardImg}
                  src={object.imgUrl}
                  alt={object.name}
                />
                <div>
                  {object.characters.map((character) => {
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
          })
        )}
      </div>
    </>
  );
}

export default BoardSelection;
