import { Link } from "react-router";

function Header({ characters }) {
  return (
    <div>
      <Link to="/">
        <img
          src="/public/logo/Site-logo.webp"
          alt="game logo"
          style={{ width: "48px" }}
        />
        <span>Where's Waldo</span>
      </Link>

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

      <Link to="/ranking/1">
        <svg
          stroke="currentColor"
          fill="currentColor"
          stroke-width="0"
          viewBox="0 0 640 512"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M353.8 54.1L330.2 6.3c-3.9-8.3-16.1-8.6-20.4 0L286.2 54.1l-52.3 7.5c-9.3 1.4-13.3 12.9-6.4 19.8l38 37-9 52.1c-1.4 9.3 8.2 16.5 16.8 12.2l46.9-24.8 46.6 24.4c8.6 4.3 18.3-2.9 16.8-12.2l-9-52.1 38-36.6c6.8-6.8 2.9-18.3-6.4-19.8l-52.3-7.5zM256 256c-17.7 0-32 14.3-32 32l0 192c0 17.7 14.3 32 32 32l128 0c17.7 0 32-14.3 32-32l0-192c0-17.7-14.3-32-32-32l-128 0zM32 320c-17.7 0-32 14.3-32 32L0 480c0 17.7 14.3 32 32 32l128 0c17.7 0 32-14.3 32-32l0-128c0-17.7-14.3-32-32-32L32 320zm416 96l0 64c0 17.7 14.3 32 32 32l128 0c17.7 0 32-14.3 32-32l0-64c0-17.7-14.3-32-32-32l-128 0c-17.7 0-32 14.3-32 32z"></path>
        </svg>
        <span>Ranking</span>
      </Link>
    </div>
  );
}

export default Header;
