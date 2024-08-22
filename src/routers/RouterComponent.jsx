import React from "react";
import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
} from "react-router-dom";
import Register from "../components/Register/Register";
import App from "../App";
import VehicleRegForm from "../components/Forms/VehicleRegForm";
import Dashboard from "../containers/Dashboard";
import SingIn from "../components/Signin/Singin";

function RouterComponent() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route index element={<App />} />
        <Route path="/signin" element={<SingIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/vehicle-reg-form" element={<VehicleRegForm />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default RouterComponent;
