import errorType from "../../types/error";

interface prp {
  loading?: boolean;
  children: any;
  error?: errorType;
}

export default function DataLoader({ children, error, loading }: prp) {
  if (loading) {
    return (
      <div className="h-full p-5 flex flex-col items-center justify-center">
        <span className="loading loading-infinity loading-lg"></span>
      </div>
    );
  } else if (error) {
    if (error.status == 404) {
      return (
        <div className="flex flex-col items-center justify-center p-5">
          <div className="text-2xl">404</div>
          <div>{error.details}</div>
        </div>
      );
    }
  } else {
    return children;
  }
}
