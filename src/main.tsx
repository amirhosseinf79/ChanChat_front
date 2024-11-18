import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Auth from "./pages/auth.tsx";
import NotFound from "./pages/not-found.tsx";
import MainApp from "./pages/app.tsx";

const appSections = createBrowserRouter([
  {
    path: "/",
    element: <MainApp />,
    errorElement: <NotFound />,
  },
  {
    path: "auth",
    element: <Auth />,
  },
]);

createRoot(document.getElementById("root2")!).render(
  <RouterProvider router={appSections} />
);
