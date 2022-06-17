import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import SnackbarProvider from "react-simple-snackbar";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <SnackbarProvider>
    <App />
  </SnackbarProvider>
);
