import App from "./App";
import Game from "./Pages/Solo/Game";
import Homepage from "./Pages/Homepage/Homepage";
import Createsalon from "./Pages/Salon/Createsalon";
import Salon from "./Pages/Salon/Salon";
import { createBrowserRouter } from "react-router-dom";
import Joinsalon from "./Pages/Salon/Joinsalon";
import MultiplayerGame from "./Pages/Multiplayer/Multiplayergame";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "/game",
        element: <Game />,
      },
      {
        path: "/salon",
        element: <Salon />,
      },
      {
        path: "/createsalon",
        element: <Createsalon />,
      },
      {
        path: "/joinsalon",
        element: <Joinsalon />,
      },
      {
        path: "/multiplayersalon",
        element: <MultiplayerGame />,
      },
      {
        path: "/game/game:id",
        element: <MultiplayerGame />,
      },
    ],
  },
]);
