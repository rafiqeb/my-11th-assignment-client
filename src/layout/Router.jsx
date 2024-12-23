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
import Volunteer from "../components/Volunteer";
import DetailsPage from "../components/DetailsPage";
import BeVolunteer from "../components/BeVolunteer";

  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      children: [
        {
            path: '/',
            element: <Home></Home>,
            children: [
              {
                path: '/',
                element: <Volunteer></Volunteer>,
                loader: ()=> fetch(`${import.meta.env.VITE_API_URL}/volunteers`)
              }
            ]
        },
        {
            path: 'volentear',
            element: <AllVolentear></AllVolentear>,
            loader: ()=> fetch(`${import.meta.env.VITE_API_URL}/volunteers`)
        },
        {
          path: '/details/:id',
          element: <DetailsPage></DetailsPage>,
          loader: ({params})=> fetch(`${import.meta.env.VITE_API_URL}/volunteers/${params.id}`)
        },
        {
          path: 'beVolunteer',
          element: <BeVolunteer></BeVolunteer>
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