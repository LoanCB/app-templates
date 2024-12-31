import { createBrowserRouter } from "react-router-dom";
import Login from "../components/auth/login.component";
import Home from "../components/base/home.component";
import NotFound from "../components/common/not-found.component";

const router = createBrowserRouter([
  {
    path: "",
    errorElement: <NotFound />,
    children: [
      {
        path: "",
        element: <Home />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
