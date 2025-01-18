import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Error from "../Pages/Error";
import Home from "../Pages/Home";
import Login from "../Pages/Authentication/Login";
import Register from "../Pages/Authentication/Register";
import Member from "../Pages/Member";
import Notification from "../Pages/Notification";
import Dashboard from "../Layout/DashBoard";
import UserHome from "../Pages/Dashboard/UserHome";

import UserPost from "../Pages/Dashboard/UserPost";
import AdminHome from "../Pages/Dashboard/AdminHome";
import AdminAnnouncements from "../Pages/Dashboard/AdminAnnouncements";

import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import ManageUsers from "../Pages/Dashboard/ManageUsers";
import Activities from "../Pages/Dashboard/Activities";
import AddaPost from "../Pages/Dashboard/AddaPost";




  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      errorElement: <Error></Error>,
      children: [
        {
            path:'/',
            element: <Home></Home>
        },
        {
            path:'login',
            element: <Login></Login>
        },
        {
            path:'register',
            element: <Register></Register>
        }
        ,
        {
            path:'member',
            element:<Member></Member>
        },
        {
            path:'notification',
            element:<Notification></Notification>
        }
       
      ]
    },
    {
        path:'dashboard',
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children:[
            // user routes 
            {
             path: 'userHome',
             element: <UserHome></UserHome>
            },
            {
             path: 'addPost',
             element: <AddaPost></AddaPost>
            },
            {
             path: 'userPost',
             element: <UserPost></UserPost>
            },

            // admin routes 
            {
             path:'adminHome',
             element: <AdminRoute><AdminHome></AdminHome></AdminRoute>
            },
            {
             path:'manageUsers',
             element: <AdminRoute><ManageUsers></ManageUsers></AdminRoute>
            },
            {
             path:'announcement',
             element: <AdminRoute><AdminAnnouncements></AdminAnnouncements></AdminRoute>
            },
            {
             path:'activities',
             element: <AdminRoute> <Activities></Activities></AdminRoute>
            }
        ]
    }


  ]);