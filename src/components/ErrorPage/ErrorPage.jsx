import { Link } from "react-router";
import { useRouteError } from "react-router";

const ErrorPage = () => {
  const error = useRouteError();
  console.log(error);

  return (
    <div>
      <h1>Oh no, this route does not exist!</h1>
      <p>
        <i>{error.statusText || error.message} </i>
      </p>
      <Link to="/">Go to Board Selection page</Link>
    </div>
  );
};

export default ErrorPage;
