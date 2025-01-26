import React from "react";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaLayerGroup } from "react-icons/fa6";
import { MdGroups } from "react-icons/md";
import { FaComments } from "react-icons/fa";
import { RiArrowUpDownFill } from "react-icons/ri";
import { TbMessageReportFilled } from "react-icons/tb"

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

    //   console.log(stats);



  return (
    <div className="min-h-screen">
      <div className="stats shadow w-full my-10 flex flex-col sm:grid">


      <div className="stat">
          <div className="stat-figure text-secondary">
            <div className="avatar">
              <div className="w-16 rounded-full">
                <img src={user && user?.photoURL} />
              </div>
            </div>
          </div>
          <div className="stat-value">{user && user?.displayName}</div>
          <div className="stat-title">{user && user?.email}</div>
          
        </div>




        <div className="stat">
          <div className="stat-figure text-primary">
           <FaLayerGroup className="text-4xl"/>
          </div>
          <div className="stat-title">Total Posts</div>
          <div className="stat-value text-primary">{stats.posts}</div>
          
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <FaComments className="text-4xl"/>
          </div>
          <div className="stat-title">All Comments</div>
          <div className="stat-value text-secondary">{stats.comments}</div>
         
        </div>
        <div className="stat">
          <div className="stat-figure text-secondary">
            <RiArrowUpDownFill className="text-4xl"/>
          </div>
          <div className="stat-title">Total Votes</div>
          <div className="stat-value text-secondary">{stats.totalVotes}</div>
         
        </div>




        <div className="stat">
          <div className="stat-figure text-secondary">
          <MdGroups className="text-4xl"/>
          </div>
          <div className="stat-title">Total Users</div>
          <div className="stat-value text-secondary">{stats.users}</div>
          
        </div>
        <div className="stat">
          <div className="stat-figure text-secondary">
            <TbMessageReportFilled className="text-4xl"/>
          </div>
          <div className="stat-title">Total Reports</div>
          <div className="stat-value text-secondary">{stats.reports}</div>
         
        </div>

       
      </div>
    </div>
  );
};

export default AdminHome;
