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
import PrivateRoute from "../privateRoute/PrivateRoute";
import UpdatePost from "../components/UpdatePost";
import ErrorPage from "../pages/ErrorPage";
import MyRequest from "../components/MyRequest";
import VolunteerRequest from "../pages/VolunteerRequest";


  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      errorElement: <ErrorPage></ErrorPage>,
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
            element: <AllVolentear></AllVolentear>
        },
        {
          path: '/details/:id',
          element: <PrivateRoute><DetailsPage></DetailsPage></PrivateRoute>,
          loader: ({params})=> fetch(`${import.meta.env.VITE_API_URL}/volunteers/${params.id}`)
        },
        {
          path: 'beVolunteer/:id',
          element: <PrivateRoute><BeVolunteer></BeVolunteer></PrivateRoute>,
          loader: ({params})=> fetch(`${import.meta.env.VITE_API_URL}/volunteers/${params.id}`)
        },
        {
          path: 'volentearNeed',
          element: <PrivateRoute><AddVolenter></AddVolenter></PrivateRoute>
        },
        {
          path: 'myPosts',
          element: <PrivateRoute><MyPosts></MyPosts></PrivateRoute>,
        },
        {
          path: 'my-request',
          element: <PrivateRoute><MyRequest></MyRequest></PrivateRoute>
        },
        {
          path: 'volunteer-request',
          element: <PrivateRoute><VolunteerRequest></VolunteerRequest></PrivateRoute>
        },
        {
          path: 'updatePost/:id',
          element: <UpdatePost></UpdatePost>,
          loader: ({params})=> fetch(`${import.meta.env.VITE_API_URL}/volunteers/${params.id}`)
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