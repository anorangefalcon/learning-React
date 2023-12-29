import { useRouteError } from "react-router-dom";

const Error404Page = () => {
  const error = useRouteError();
  console.log(error, "here are the details of the thin g ");
  return (
    <div>
      <h1>
        {error.status} - {error.data}
      </h1>
    </div>
  );
};

export default Error404Page;
