import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { SocketContextProvider } from "./contexts/SocketContext";

import App from "./App";
import RockPaperScissors from "./pages/RockPaperScissors/RockPaperScissors";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/game",
    element: <RockPaperScissors />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <SocketContextProvider>
    <RouterProvider router={router} />
  </SocketContextProvider>
);
