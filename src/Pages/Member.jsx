import React from "react";
import { Link } from "react-router-dom";
import useMember from "../Hooks/useMember";
import LoadingSpinner from "../Components/LoadingSpinner";
import { Helmet } from "react-helmet-async";

const Member = () => {

    const [ isMember, isMemberLoading ] = useMember()

    // console.log(isMember)


    // if(isMemberLoading){
    //     return <LoadingSpinner></LoadingSpinner>
    // }




  return (
    <div className="min-h-screen w-11/12 lg:w-7/12 mx-auto mt-[50px] lg:mt-[100px]">
       <Helmet> <title>PostPad | Member </title></Helmet>
      <div className="flex flex-col md:flex-row items-center justify-between bg-white dark:bg-[#20293d] dark:text-white p-5 gap-10 sm:gap-2 lg:p-8 shadow-lg">
        <div className="md:w-1/2 text-left">
        {
            isMember?   <h2 className="text-3xl font-bold mb-4">Already A Member</h2>  :   <h2 className="text-3xl font-bold mb-4">Become A Member</h2>
        }
          <p className="text-gray-600 mb-4 font-semibold dark:text-white">
          Started with just 10$!
          </p>
          <p className="text-gray-600 mb-3 dark:text-white">
          Join Us and Unlock Exclusive Member Benefits!
          </p>
          <p className="text-gray-600 mb-3 dark:text-white">
          1. You will get permit to post more than 5 post
          </p>
          <p className="text-gray-600 mb-3 dark:text-white">
          More Extra Features & Benefits Coming soon!
          </p>
          {
            isMember?   <button className=" bg-[#005694] hover:bg-[#005694] text-white px-6 py-2 mt-5 rounded-md ">
            You are Already a Member
          </button>: <Link to="/dashboard/payment">
            <button className=" bg-[#005694] hover:bg-[#005694] text-white px-6 py-2 mt-4 rounded-md ">
              Pay Now 10$
            </button>
          </Link>
          }
        </div>

        <div className="md:w-1/2 flex items-center justify-center">
          <img
            src="/5538595_2869279.jpg"
            alt="Membership Illustration"
            className="w-full "
          />
        </div>
      </div>
    </div>
  );
};

export default Member;
