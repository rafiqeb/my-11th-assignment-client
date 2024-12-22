import {
    createBrowserRouter,
  } from "react-router-dom";
import MainLayout from "./MainLayout";
import Home from "../pages/Home";
import AllVolentear from "../pages/AllVolentear";
import Login from "../authentication/Login";
import Register from "../authentication/Register";
import AddVolenter from "../pages/AddVolenter";
import MyPosts from "../pages/MyPosts";

  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      children: [
        {
            path: '/',
            element: <Home></Home>
        },
        {
            path: 'volentear',
            element: <AllVolentear></AllVolentear>
        },
        {
          path: 'volentearNeed',
          element: <AddVolenter></AddVolenter>
        },
        {
          path: 'myPosts',
          element: <MyPosts></MyPosts>
        },
        {
            path: 'login',
            element: <Login></Login>
        },
        {
            path: 'register',
            element: <Register></Register>
        }
      ]
    },
  ]);

  export default router;