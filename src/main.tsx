import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Auth from "./pages/auth.tsx";
import NotFound from "./pages/not-found.tsx";

const appSections = createBrowserRouter([
  {
    path: "/",
    element: <></>,
    errorElement: <NotFound />,
  },
  {
    path: "auth",
    element: <Auth />,
  },
]);

createRoot(document.getElementById("root2")!).render(
  <StrictMode>
    <RouterProvider router={appSections} />
  </StrictMode>
);
