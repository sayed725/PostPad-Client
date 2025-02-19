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
      <div>
        <div className="stats shadow dark:bg-[#20293d] dark:text-white w-full my-10 flex flex-col sm:grid">
          <div className="stat">
            <div className="stat-figure text-secondary">
              <div className="avatar">
                <div className="w-16 rounded-full">
                  <img src={user && user?.photoURL} />
                </div>
              </div>
            </div>
            <div className="stat-value">{user && user?.displayName}</div>
            <div className="stat-title dark:text-white">{user && user?.email}</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-primary">
              <FaLayerGroup className="text-4xl" />
            </div>
            <div className="stat-title dark:text-white">Total Posts</div>
            <div className="stat-value text-primary">{stats.posts}</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
              <FaComments className="text-4xl" />
            </div>
            <div className="stat-title dark:text-white">All Comments</div>
            <div className="stat-value text-secondary">{stats.comments}</div>
          </div>
          <div className="stat">
            <div className="stat-figure text-secondary">
              <RiArrowUpDownFill className="text-4xl" />
            </div>
            <div className="stat-title dark:text-white">Total Votes</div>
            <div className="stat-value text-secondary">{stats.totalVotes}</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
              <MdGroups className="text-4xl" />
            </div>
            <div className="stat-title dark:text-white">Total Users</div>
            <div className="stat-value text-secondary">{stats.users}</div>
          </div>
          <div className="stat">
            <div className="stat-figure text-secondary">
              <TbMessageReportFilled className="text-4xl" />
            </div>
            <div className="stat-title dark:text-white">Total Reports</div>
            <div className="stat-value text-secondary">{stats.reports}</div>
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
