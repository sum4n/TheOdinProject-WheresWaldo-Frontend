function Header({ characters }) {
  return (
    <div>
      <a href="/">
        <img src="#" alt="game logo" />
        <span>Where's Waldo</span>
      </a>

      {characters && (
        <>
          <p>Time elapsed: </p>
          <div>
            {characters.map((character) => {
              return (
                <img
                  key={character.id}
                  src={character.imgUrl}
                  alt={character.name}
                  style={{ height: "48px" }}
                />
              );
            })}
          </div>
        </>
      )}

      <a href="/ranking/1">
        <img src="#" alt="ranking logo" style={{ height: "48px" }} />
        <span>Ranking</span>
      </a>
    </div>
  );
}

export default Header;
