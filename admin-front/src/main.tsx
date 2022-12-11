import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from "./routes/root";
import Admin from './components/admin/admin';
import User from './components/admin/users';
import ErrorPage from './ErrorPage';
import { LoginPage } from './components/pages/LoginPage';
import { ProvideUser } from './hooks/user';
import { ChakraProvider } from '@chakra-ui/react'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "admin/",
        element: <Admin />,
        children: [
          {
            path: "user/",
            element: <User />
          }
        ]
      },
      {
        path: "login/",
        element: <LoginPage />
      }
    ],
  },

]);
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <ProvideUser>
        <RouterProvider router={router} />
      </ProvideUser>
    </ChakraProvider >
  </React.StrictMode>
)
