import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const MemberMessage = () => {
  return (
    <div>
      <Helmet>
        <title>PostPad | UserPost</title>
      </Helmet>
      <div className="text-center my-20 min-h-screen">
        <div className="p-5 bg-white dark:bg-[#20293d] dark:text-white rounded-md shadow-lg">
          <p className="mb-10 text-4xl font-bold">OH! NO</p>
          <p className="mb-5 font-bold text-2xl">
            You have reached the limit of 5 posts
            <br className="hidden sm:block" /> Become a Member to add more posts
            and enjoy exclusive benefits!
          </p>
          <Link
            className="btn  bg-[#005694] text-white hover:bg-[#005694]"
            to="/member"
          >
            Become a Member
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MemberMessage;
