import { Navigate, Outlet } from "react-router-dom";
import SignIn from "../components/Signin/Singin";
import { createBrowserRouter } from "react-router-dom";
import RootErrorPage from "./RootErrorPage";
import AuthenticatedRoute from "../components/AuthenticatedRoute";
import { Redirect } from "../components/AuthenticatedRoute/Redirect";
import CreateUser from "../containers/CreateUser";
import VehicleTable from "@/containers/VehicleTable";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Outlet />,
    errorElement: <RootErrorPage />,
    children: [
      {
        index: true,
        element: <Navigate to="login"  replace/>,
      },
      {
        index: true,
        path: "login",
        element: <SignIn />,
      },
      {
        element: <AuthenticatedRoute />,
        children: [
          {
            path: "redirect",
            element: <Redirect />,
          },
          {
            path: "create-user",
            element: <CreateUser />,
          },
          {
            path: "owner",
            element: (
              <div>
                Owner Layout
                <br />
                <Outlet />
              </div>
            ),
            children: [
              {
                path: "dashboard",
                element: <div>Dashboard</div>,
              },
              {
                path: "vehicle",
                element: <VehicleTable />,
              },
              {
                path: "vehicle/:vehicleId",
                element: <div>vehicle by id</div>,
              },
              {
                path: "driver",
                element: <div>drivers</div>,
              },
              {
                path: "driver/:driverId",
                element: <div>drivers by id</div>,
              },
              {
                path: "assistant-driver",
                element: <div>assistant-drivers</div>,
              },
              {
                path: "assistant-driver/:assistantDriverId",
                element: <div>assistant-drivers by id</div>,
              },
              {
                path: "handyman",
                element: <div>handyman</div>,
              },
              {
                path: "handyman/:handymanId",
                element: <div>handyman by id</div>,
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
