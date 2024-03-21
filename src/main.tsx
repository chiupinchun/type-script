import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/App.tsx'
import '@/assets/css/global.css'

import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import { routes } from './app/routes.tsx';
import { Provider } from 'react-redux';
import { store } from './app/common/store/index.ts';

const router = createHashRouter(routes);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App>
        <RouterProvider router={router} />
      </App>
    </Provider>
  </React.StrictMode>
)
