import React from "react";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaLayerGroup } from "react-icons/fa6";
import { MdGroups } from "react-icons/md";
import { FaComments } from "react-icons/fa";
import { RiArrowUpDownFill } from "react-icons/ri";
import { TbMessageReportFilled } from "react-icons/tb";
// import { PieChart, Pie, Cell,  Legend } from "recharts";
import { Cell, PieChart, Pie, Legend } from "recharts";
import AddTags from "./AddTags";
import { Helmet } from "react-helmet-async";

const AdminHome = () => {
  const axiosSecure = useAxiosSecure();

  const { user } = useAuth();

  const { data: stats = {} } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-stats");
      return res.data;
    },
  });

  console.log(stats)

  // custom shape for the pie chart
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  //   console.log(stats);
  const chartData = [
    { name: "Users", value: stats.users },
    { name: "Posts", value: stats.posts },
    { name: "Comments", value: stats.comments },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

  return (
    <div className="min-h-screen">
       <Helmet> <title>PostPad | Admin | Home </title></Helmet>


       {/* Admin Profile  */}

        <div className="w-full border shadow-sm border-[#e5e7eb] dark:border-none dark:bg-[#20293d] rounded-lg">
      <div className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-shrink-0">
           <div className="avatar h-32 w-32 rounded-md">
  <div className="ring-primary ring-offset-base-100 w-24 rounded-md ring-2 ring-offset-2">
    <img src="https://img.daisyui.com/images/profile/demo/spiderperson@192.webp" />
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
              Welcome to the admin dashboard. Here you can manage users, posts,
              comments, and site settings. Use the navigation menu to access
              different sections of the admin panel.
            </p>
            <p className=" w-full md:w-11/12 lg:w-10/12 xl:w-9/12">
             You can add new tags for posts and manage existing ones using the "Add Tags" section below.
            </p>
          </div>
        </div>
      </div>
    </div>


    {/* stats card  */}


     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">

       <div className="border-2 shadow-sm border-[#e5e7eb] dark:bg-[#20293d] dark:border-none rounded-lg">
           <div className="p-6 flex justify-between items-center">
           <div>
             <div className=" dark:text-white">Total Posts</div>
            <div className="text-3xl text-[#005694] mt-3">{stats.posts}</div>
           </div>
             <div className="text-[#005694]">
              <FaLayerGroup className="text-4xl" />
            </div>
           </div>
        </div>

         <div className="border-2 shadow-sm border-[#e5e7eb] dark:bg-[#20293d] dark:border-none rounded-lg">
           <div className="p-6 flex justify-between items-center">
           <div>
             <div className=" dark:text-white">All Comments</div>
            <div className="text-3xl text-[#005694] mt-3">{stats.comments}</div>
           </div>
             <div className="text-[#005694]">
              <FaComments  className="text-4xl" />
            </div>
           </div>
        </div>

         <div className="border-2 shadow-sm border-[#e5e7eb] dark:bg-[#20293d] dark:border-none rounded-lg">
           <div className="p-6 flex justify-between items-center">
           <div>
             <div className=" dark:text-white">Total Votes</div>
            <div className="text-3xl text-[#005694] mt-3">{stats.totalVotes}</div>
           </div>
             <div className="text-[#005694]">
              <RiArrowUpDownFill className="text-4xl" />
            </div>
           </div>
        </div>

         <div className="border-2 shadow-sm border-[#e5e7eb] dark:bg-[#20293d] dark:border-none rounded-lg">
           <div className="p-6 flex justify-between items-center">
           <div>
             <div className=" dark:text-white">Total Users</div>
            <div className="text-3xl text-[#005694] mt-3">{stats.users}</div>
           </div>
             <div className="text-[#005694]">
              <MdGroups className="text-4xl" />
            </div>
           </div>
        </div>

         <div className="border-2 shadow-sm border-[#e5e7eb] dark:bg-[#20293d] dark:border-none rounded-lg">
           <div className="p-6 flex justify-between items-center">
           <div>
             <div className=" dark:text-white">Total Reports</div>
            <div className="text-3xl text-[#005694] mt-3">{stats.reports}</div>
           </div>
             <div className="text-[#005694]">
              <TbMessageReportFilled className="text-4xl" />
            </div>
           </div>
        </div>
       
       

      
     </div>


    

      <div className="w-full h-96 flex flex-col sm:flex-row gap-5 sm:gap-0 justify-around items-center">
        <PieChart width={300} height={300}>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Legend></Legend>
        </PieChart>
      <AddTags></AddTags>
      </div>
     
      
    </div>
  );
};

export default AdminHome;
