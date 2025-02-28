import { Link, useLocation, useNavigate } from "react-router-dom";

import loginLottieJSON from "../../assets/Animation - 1736922921301.json";

import { useContext, useState } from "react";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../../Provider/AuthProvider";
import Lottie from "lottie-react";
import SocialLogin from "../../Components/SocialLogin";
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  // console.log(from)
  const { signIn, user } = useContext(AuthContext);

  // Use React Hook Form
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const handleLogIn = ({ email, password }) => {
    signIn(email, password)
      .then((result) => {
        const user = result.user;

        // console.log(user);

        toast.success(`Congratulations! ${user.displayName} Login Successful`);
        // Conditional navigation logic if necessary
        navigate(from, { replace: true });
      })
      .catch((err) => {
        // console.log(err)
        setError({ ...error, Login: err.code });
        toast.error(`${err.code}`);
      });
  };

  const handleUserAutoFill = () => {
    setValue("email", "normaluser@gmail.com");
    setValue("password", "1234Aa!");
    
  };
  const handleMemberAutoFill = () => {
    setValue("email", "member@gmail.com");
    setValue("password", "1234Aa!");
    
  };
  const handleAdminAutoFill = () => {
    setValue("email", "pad@gmail.com");
    setValue("password", "1234Aa!");
    
  };

  

  return (
    <div className="min-h-screen">
      <div className="flex  lg:my-[100px] my-[50px]">
        <Helmet>
          {" "}
          <title>PostPad | LogIn </title>
        </Helmet>
        <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white dark:bg-[#20293d] dark:text-white rounded-lg shadow-lg  lg:max-w-4xl ">
          <div className="hidden bg-cover bg-center lg:block lg:w-1/2">
            <Lottie animationData={loginLottieJSON}></Lottie>
          </div>

          <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
            <div className="flex justify-center mx-auto">
              <img
                className="w-auto h-7 sm:h-8"
                src="/postpad-logo.png"
                alt=""
              />
            </div>

            <p className="mt-3 text-xl text-center text-gray-600 dark:text-white animate__animated animate__fadeInLeft">
              Welcome back!
            </p>

            <SocialLogin></SocialLogin>
            <div className="flex items-center justify-between mt-4">
              <span className="w-1/5 border-b  lg:w-1/4"></span>

              <div className="text-xs text-center text-gray-500 dark:text-white uppercase  hover:underline">
                Click to Auto Fill
              </div>

              <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
            </div>

            <div className="flex justify-between py-5">
              <button onClick={handleUserAutoFill} className="btn btn-sm rounded-md text-white bg-[#005694]  hover:bg-[#005694] hover:font-bold">User</button>
              <button onClick={handleMemberAutoFill} className="btn btn-sm rounded-md text-white bg-[#005694]  hover:bg-[#005694] hover:font-bold">Member</button>
              <button onClick={handleAdminAutoFill} className="btn btn-sm rounded-md text-white bg-[#005694]  hover:bg-[#005694] hover:font-bold">Admin</button>
            </div>

            <div className="flex items-center justify-between mt-4">
              <span className="w-1/5 border-b  lg:w-1/4"></span>

              <div className="text-xs text-center text-gray-500 dark:text-white uppercase  hover:underline">
                or login with email
              </div>

              <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
            </div>

            {/* form starts  */}
            <form onSubmit={handleSubmit(handleLogIn)} className="mx-auto">
              {/* Email Field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text dark:text-white ">
                    Email address
                  </span>
                </label>
                <input
                  type="email"
                  placeholder="Email"
                  // value={email}
                  className={`input input-bordered ${
                    errors.email ? "border-red-600" : ""
                  } focus:border-blue-400 border-2 border-gray-300  dark:bg-[#20293d] dark:text-white focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300`}
                  {...register("email", {
                    required: "Email is required",
                  })}
                />
                {errors.email && (
                  <span className="text-red-600 text-sm">
                    {errors.email.message}
                  </span>
                )}
              </div>

              {/* Password Field */}
              <div className="form-control relative">
                <label className="label">
                  <span className="label-text dark:text-white">Password</span>
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  // defaultValue={password}
                  className={`input input-bordered 
                    ${errors.password ? "border-red-600" : ""}
                     focus:border-blue-400 border-2 border-gray-300 dark:bg-[#20293d] dark:text-white focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300`}
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
                {errors.password && (
                  <span className="text-red-600 text-sm">
                    {errors.password.message}
                  </span>
                )}
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-[52px] text-xl cursor-pointer"
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </span>
                {error.Login && (
                  <span className="text-sm text-red-600">{error.Login}</span>
                )}
              </div>

              {/* Forgot Password Link */}
              <label className="label">
                <Link
                  //   onClick={handleForgotPassword}
                  className="label-text-alt link link-hover"
                >
                  Forgot password?
                </Link>
              </label>

              {/* Submit Button */}
              <div className="form-control mt-6">
                <button className="btn rounded-md text-white hover:font-bold bg-[#005694]  hover:bg-[#005694]">
                  Login
                </button>
              </div>
            </form>

            <div className="flex items-center justify-between mt-4">
              <span className="w-1/5 border-b   md:w-1/4"></span>

              <Link
                to="/register"
                className="text-xs text-blue-500 uppercase  hover:underline"
              >
                or Register
              </Link>

              <span className="w-1/5 border-b  md:w-1/4"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
