import React from "react";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaLayerGroup, FaTags } from "react-icons/fa6";
import { MdGroups } from "react-icons/md";
import { FaComments } from "react-icons/fa";
import { RiArrowUpDownFill } from "react-icons/ri";
import { TbMessageReportFilled } from "react-icons/tb";
// import { PieChart, Pie, Cell,  Legend } from "recharts";
import { Cell, PieChart, Pie, Legend, ResponsiveContainer } from "recharts";
import AddTags from "./AddTags";
import { Helmet } from "react-helmet-async";
import CustomChart from "./CustomChart";
import LoadingSpinner from "../../Components/LoadingSpinner";
import StatsCard from "./AdminHomeCards/StatsCard";
import { BiSolidDownvote } from "react-icons/bi";
import { BiSolidUpvote } from "react-icons/bi";
import VotesCharts from "./VotesCharts";
import PieChartt from "./PieChart";

const AdminHome = () => {
  const axiosSecure = useAxiosSecure();

  const { user } = useAuth();

  const { data: stats, isLoading = {} } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-stats");
      return res.data;
    },
  });

  // console.log(stats)

  // if(isLoading){
  //     return <LoadingSpinner/>
  // }

  return (
    <div className="min-h-screen">
      <Helmet>
        {" "}
        <title>PostPad | Admin | Home </title>
      </Helmet>

      {/* Admin Profile  */}

      <div className="w-full border shadow-sm border-[#e5e7eb] dark:border-none bg-white dark:bg-[#20293d] rounded-lg">
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0">
              <div className="avatar h-32 w-32 rounded-md">
                <div className="ring-[#005694] ring-offset-base-100 w-24 rounded-md ring-2 ring-offset-2">
                  <img src={user?.photoURL} alt={user?.displayName} />
                </div>
              </div>
            </div>

            <div className="flex-grow space-y-4">
              <div>
                <h1 className="text-2xl font-bold">{user?.displayName}</h1>
                <p className="text-muted-foreground font-semibold">
                  Email: {user?.email}
                </p>
              </div>

              <p className=" w-full md:w-11/12 lg:w-10/12 xl:w-9/12">
                Welcome to the admin dashboard. Here you can manage users,
                posts, comments, and site settings. Use the navigation menu to
                access different sections of the admin panel.
              </p>
              <p className=" w-full md:w-11/12 lg:w-10/12 xl:w-9/12">
                You can add new tags for posts and manage existing ones using
                the "Add Tags" section below.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* stats card  */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
        <StatsCard
          title={"Total Posts"}
          value={stats?.posts}
          subTitle={"Posts"}
          icon={<FaLayerGroup className="h-4 w-4" />}
        />
        <StatsCard
          title={"Total Comments"}
          value={stats?.comments}
          subTitle={"Comments"}
          icon={<FaComments className="h-4 w-4" />}
        />
        <StatsCard
          title={"Total Votes"}
          value={stats?.totalVotes}
          subTitle={"Votes"}
          icon={<RiArrowUpDownFill className="h-4 w-4" />}
        />
        <StatsCard
          title={"Total Users"}
          value={stats?.users}
          subTitle={"Users"}
          icon={<MdGroups className="h-4 w-4" />}
        />
        <StatsCard
          title={"Total Reports"}
          value={stats?.reports}
          subTitle={"Reports"}
          icon={<TbMessageReportFilled className="h-4 w-4" />}
        />
        <StatsCard
          title={"Total Tags"}
          value={stats?.tags}
          subTitle={"Tags"}
          icon={<FaTags className="h-4 w-4" />}
        />
        <StatsCard
          title={"Total UpVotes"}
          value={stats?.totalUpVote}
          subTitle={"UpVotes"}
          icon={<BiSolidUpvote className="h-4 w-4" />}
        />
        <StatsCard
          title={"Total DawnVotes"}
          value={stats?.totalDawnVote}
          subTitle={"DawnVotes"}
          icon={<BiSolidDownvote className="h-4 w-4" />}
        />
      </div>

      {/* Custom chart  */}

      <div className=" grid grid-cols-1 lg:grid-cols-2 gap-5 ">
        {/* chart -1  */}
        <div className="p-5 border-2 bg-white shadow-sm border-[#e5e7eb] dark:bg-[#20293d] dark:border-none rounded-lg mt-10">
          <CustomChart stats={stats} isLoading={isLoading} />
        </div>

        {/* chart -2 */}
        <div className="p-5 border-2 bg-white shadow-sm border-[#e5e7eb] dark:bg-[#20293d] dark:border-none rounded-lg mt-10">
          <VotesCharts stats={stats} isLoading={isLoading} />
        </div>
      </div>

      <div className="grid grid-cols-1  lg:grid-cols-2 gap-5 mt-10 justify-center">
        {/* pie chart  */}

       <div className="bg-white  dark:bg-[#20293d]">
         <PieChartt stats={stats} isLoading={isLoading} />
       </div>
        {/* add tags  */}
        <div className="border-2 shadow-sm bg-white border-[#e5e7eb] dark:bg-[#20293d] dark:border-none rounded-lg ">
          <div>
            <AddTags></AddTags>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
