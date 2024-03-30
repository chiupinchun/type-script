import { RouteObject } from "react-router-dom";
import Home from "@app/home";
import Battle from "@app/battle";
import CharacterList from '@app/character/list'

export const routes: RouteObject[] = [
  {
    path: '/',
    Component: CharacterList
  },
  {
    path: "/home",
    Component: Home
  },
  {
    path: '/battle',
    Component: Battle
  },
  {
    path: '/character',
    children: [
      {
        path: 'list',
        Component: CharacterList
      }
    ]
  }
]