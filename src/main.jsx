import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import RouterComponent from "./router/RouterComponent.jsx";
import { ThemeProvider } from "@material-tailwind/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <RouterComponent />
    </ThemeProvider>
  </React.StrictMode>
);
