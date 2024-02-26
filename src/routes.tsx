import { RouteObject } from "react-router-dom";
import Home from "@/pages/home";
import Battle from "@/pages/battle";

export const routes: RouteObject[] = [
  {
    path: "/",
    Component: Home
  },
  {
    path: '/battle',
    Component: Battle
  }
]