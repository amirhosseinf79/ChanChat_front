import { useNavigate } from "react-router-dom";
import errorType from "../../types/error";

interface prp {
  loading?: boolean;
  children: any;
  error?: errorType;
}

export default function DataLoader({ children, error, loading }: prp) {
  const navigate = useNavigate();
  if (loading) {
    return (
      <div className="h-full p-5 flex flex-col items-center justify-center">
        <span className="loading loading-infinity loading-lg"></span>
      </div>
    );
  } else if (error) {
    if (error.status == 404) {
      return (
        <div className="flex flex-col items-center justify-center p-5 h-full">
          <div className="text-7xl">404</div>
          <pre className="text-center font-normal">{error.details}</pre>
        </div>
      );
    } else if (error.status == 401) navigate("/auth");
  } else {
    return children;
  }
}
