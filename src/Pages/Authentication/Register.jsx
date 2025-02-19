import { Link, useNavigate } from 'react-router-dom'

import loginLottieJSON from '../../assets/lotte registation.json'
import Lottie from 'lottie-react';

import { useContext, useState } from 'react'
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import toast from 'react-hot-toast'
import { Helmet } from 'react-helmet-async'
import { AuthContext } from '../../Provider/AuthProvider'
import SocialLogin from '../../Components/SocialLogin';
import useAxiosPublic from '../../Hooks/useAxiosPublic';

const Registration = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate()
  const { createUser, updateUserProfile } =
    useContext(AuthContext)
    const axiosPublic= useAxiosPublic()

  const handleSignUp = async e => {
    e.preventDefault()
    const form = e.target
    const email = form.email.value
    const name = form.name.value
    const photo = form.photo.value
    const pass = form.password.value
    if (pass.length < 6) {
      toast.error('Password must be 6 character or more')
      return;
  } 
 
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).*$/;
  if (!passwordRegex.test(pass)) {
      toast.error('At least one uppercase, one lowercase character');
      return;
  }  

    // console.log({ email, pass, name, photo })
    try {
      //2. User Registration
      const result = await createUser(email, pass)
      // console.log(result)



      await updateUserProfile(name, photo)
      .then(()=>{
          // create user entry in the database
          const userInfo = {
            email: result.user?.email,
            name: result.user?.displayName,
            role: 'bronze'
         }

         axiosPublic.post('/users', userInfo)
         .then(res=>{
            //  console.log(res.data)
             toast.success(`Congratulations! Registration Successful`);
             navigate( "/");

         })
      })

    } catch (err) {
      // console.log(err)
      toast.error(err?.message)
    }
  }

  
  return (
   <div className='min-h-screen'>
     <div className='flex lg:py-[80px] py-[50px] '>
      <Helmet> <title>PostPad | Register </title></Helmet>
      <div className='flex w-full max-w-sm mx-auto overflow-hidden bg-white dark:bg-[#20293d] dark:text-white rounded-lg shadow-lg  lg:max-w-4xl '>
        <div className='w-full px-6 py-8 md:px-8 lg:w-1/2'>
          <div className='flex justify-center mx-auto'>
            <img className='w-auto h-7 sm:h-8' src='/postpad-logo.png' alt='' />
          </div>

          <p className='mt-3 text-xl text-center text-gray-600 dark:text-white animate__animated animate__fadeInLeft'>
            Get Your Free Account Now.
          </p>

          <SocialLogin></SocialLogin>

          <div className='flex items-center justify-between mt-4'>
            <span className='w-1/5 border-b  lg:w-1/4'></span>

            <div className='text-xs text-center text-gray-500 dark:text-white uppercase  hover:underline'>
              or Registration with email
            </div>

            <span className='w-1/5 border-b dark:border-gray-400 lg:w-1/4'></span>
          </div>
          <form onSubmit={handleSignUp}>
            <div className='mt-4'>
              <label
                className='block mb-2 text-sm font-medium text-gray-600 dark:text-white  '
                htmlFor='name'
              >
                UserName
              </label>
              <input
                id='name'
                autoComplete='name'
                name='name'
                placeholder='Username'
                required
                className='block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg border-2 border-gray-300 dark:bg-[#20293d] dark:text-white     focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300'
                type='text'
              />
            </div>
            <div className='mt-4'>
              <label
                className='block mb-2 text-sm font-medium text-gray-600 dark:text-white '
                htmlFor='photo'
              >
                Photo URL
              </label>
              <input
                id='photo'
                autoComplete='photo'
                name='photo'
                placeholder='Photo URL'
                required
                className='block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg  border-2 border-gray-300 dark:bg-[#20293d] dark:text-white    focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300'
                type='text'
              />
            </div>
            <div className='mt-4'>
              <label
                className='block mb-2 text-sm font-medium text-gray-600 dark:text-white '
                htmlFor='LoggingEmailAddress'
              >
                Email Address
              </label>
              <input
                id='LoggingEmailAddress'
                autoComplete='email'
                placeholder='Email'
                required
                name='email'
                className='block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg border-2 border-gray-300 dark:bg-[#20293d] dark:text-white     focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300'
                type='email'
              />
            </div>

            <div className='mt-4 relative'>
              <div className='flex justify-between'>
                <label
                  className='block mb-2 text-sm font-medium text-gray-600 dark:text-white '
                  htmlFor='loggingPassword'
                >
                  Password
                </label>
              </div>

              <input
                id='loggingPassword'

                autoComplete='current-password'
                name='password'
                placeholder='Password'
                required
                className='block w-full  px-4 py-2 text-gray-700 bg-white border rounded-lg border-2 border-gray-300 dark:bg-[#20293d] dark:text-white    focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300'
                 type={showPassword ? "text" : "password"}
              />
               <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-5 top-[42px] text-xl cursor-pointer"
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </span>
            </div>
            <div className='mt-6'>
              <button
                type='submit'
                className='w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-[#005694] rounded-lg hover:bg-[#005694] hover:text-black focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50'
              >
                Register
              </button>
            </div>
          </form>

          <div className='flex items-center justify-between mt-4'>
            <span className='w-1/5 border-b  md:w-1/4'></span>

            <Link
              to='/login'
              className='text-xs text-blue-500 uppercase  hover:underline'
            >
              or Log In
            </Link>

            <span className='w-1/5 border-b  md:w-1/4'></span>
          </div>
        </div>
        <div
          className='hidden bg-cover bg-center lg:block lg:w-1/2 mt-[100px]'>
            
            <Lottie animationData={loginLottieJSON}></Lottie>
        </div>
      </div>
    </div>
   </div>
  )
}

export default Registration