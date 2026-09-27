import { createBrowserRouter } from "react-router";
import Login from "../features/pages/Login";
import Register from "../features/pages/Register";
import Me from "../features/pages/Me"

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Register />,
  },
  {
    path: "/me",
    element: <Me />,
  },
]);
export default router;
