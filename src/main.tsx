import { SnackbarProvider } from "notistack";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <SnackbarProvider maxSnack={1} autoHideDuration={1500}>
      <App />
    </SnackbarProvider>
  </React.StrictMode>
);
