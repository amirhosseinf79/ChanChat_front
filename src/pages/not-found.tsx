import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="w-full flex flex-col justify-center items-center md:h-screen h-[92vh]">
      <div className="flex flex-col gap-1 text-center justify-center items-center">
        <h2 className="text-lg">Page not found!</h2>
        <Link to={"/"} className="dark:text-indigo-300 text-indigo-900">
          Back Home
        </Link>
      </div>
    </div>
  );
}
