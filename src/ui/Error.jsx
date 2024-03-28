import { useRouteError } from "react-router-dom";
import LinkButton from "./LinkButton";

function NotFound() {
  const error = useRouteError();

  return (
    <div className="flex h-screen items-center justify-center text-center text-2xl">
      <div className="mx-auto w-fit rounded-md bg-stone-200 p-4">
        <h1>Something went wrong 😢</h1>
        <p>{error.data || error.message}</p>
        <LinkButton to="-1">&larr; Go back</LinkButton>
      </div>
    </div>
  );
}

export default NotFound;
