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
import AddPost from "../Pages/Dashboard/AddPost";
import UserPost from "../Pages/Dashboard/UserPost";




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
        element:<Dashboard></Dashboard>,
        children:[
            // user routes 
            {
             path: 'userHome',
             element: <UserHome></UserHome>
            },
            {
             path: 'addPost',
             element: <AddPost></AddPost>
            },
            {
             path: 'userPost',
             element: <UserPost></UserPost>
            },
            // admin routes 
            {

            }
        ]
    }


  ]);