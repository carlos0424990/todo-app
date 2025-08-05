import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";


import RedirectHome from './components/RedirectHome'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/Login'
import Register from './pages/Register'
import Todos from './pages/Todos'
import { Toaster } from "react-hot-toast";
import Loading from "./components/Loading";
import PublicOnlyRoute from "./components/PublicOnlyRoute";


const router = createBrowserRouter([
  {
    path: "/login",
    element: <PublicOnlyRoute >
      <Login />
    </PublicOnlyRoute>,
  },
  {
    path: "/register",
    element: <PublicOnlyRoute >
      <Register />
    </PublicOnlyRoute>,
  },
  {
    path: "/todos",
    element: <ProtectedRoute>
      <Todos />
    </ProtectedRoute>,
  },
  {
    path: "*",
    Component: RedirectHome,
  },
]);

const App = () => {
  return (
    <>
      <Toaster
        position="top-right"
      />
      <RouterProvider router={router} />
      <Loading/>
    </>
  );
}

export default App