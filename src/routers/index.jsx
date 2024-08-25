import { Outlet } from "react-router-dom";
import Singin from "../components/Signin/Singin";
import { createBrowserRouter } from "react-router-dom";
import RootErrorPage from "./RootErrorPage";
import AuthenticatedRoute from "../components/AuthenticatedRoute";
import { Redirect } from "../components/AuthenticatedRoute/Redirect";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Outlet />,
    errorElement: <RootErrorPage />,
    children: [
      {
        path: "login",
        element: Singin,
      },
      {
        element: <AuthenticatedRoute />,
        children: [
          {
            path: "redirect",
            element: <Redirect />,
          },
        ],
      },
    ],
  },
]);

export default router;
