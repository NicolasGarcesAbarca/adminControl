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
import { CreateUser } from './components/pages/CreateUser';
import { ProvideUser } from './hooks/user';
import { ChakraProvider,extendTheme } from '@chakra-ui/react'
import { AllowOnlyAdmin } from './components/pages/AllowOnlyAdmin';

const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
}

const theme = extendTheme({ colors })


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "admin/",
        element: <AllowOnlyAdmin><Admin /></AllowOnlyAdmin>,
        children: [
          {
            path: "user/",
            element: <User />
          },
          {
            path: "createuser/",
            element: <CreateUser />
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
    <ChakraProvider theme={theme}>
      <ProvideUser>
        <RouterProvider router={router} />
      </ProvideUser>
    </ChakraProvider >
  </React.StrictMode>
)
