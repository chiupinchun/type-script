import { RouteObject } from "react-router-dom";
import Home from "@app/home";
import Battle from "@app/battle";

export const routes: RouteObject[] = [
  {
    path: '/',
    Component: Battle
  },
  {
    path: "/home",
    Component: Home
  },
  {
    path: '/battle',
    Component: Battle
  }
]