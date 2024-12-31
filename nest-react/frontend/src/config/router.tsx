import Secure from "@src/components/auth/secure.component";
import UsersList from "@src/components/base/users-list.component";
import { createBrowserRouter } from "react-router-dom";
import Login from "../components/auth/login.component";
import Home from "../components/base/home.component";
import NotFound from "../components/common/not-found.component";

const router = createBrowserRouter([
  {
    path: "",
    element: <Secure />,
    errorElement: <NotFound />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/users",
        element: <UsersList />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
