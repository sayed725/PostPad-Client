import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Error from "../Pages/Error";
import Home from "../Pages/Home";
import Login from "../Pages/Authentication/Login";
import Register from "../Pages/Authentication/Register";




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
       
      ]
    },
  ]);