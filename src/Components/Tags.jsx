import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import LoadingSpinner from "./LoadingSpinner";

const Tags = () => {
  const axiosSecure = useAxiosSecure();

  // const tags = [  '#love', '#instagood', '#fashion', '#photooftheday', '#photography', '#art', '#beautiful', '#nature', '#travel', '#fitness']

  const { data: tags = [], isLoading } = useQuery({
    queryKey: ["tags"],
    queryFn: async () => {
      const res = await axiosSecure.get("/tags");
      return res.data;
    },
  });

  return (
    <div className=" shadow-lg ">
      <div className="p-5">
        <h2 className="text-xl font-semibold border-b-2 border-[#005694] pb-1 w-[120px] ">
          Popular Tags
        </h2>

        <div className="mt-5 flex flex-col gap-3 overflow-y-auto h-[400px]">


        {
            isLoading ?   [1, 2, 3, 4, 5, 6,7,8,9,10].map((_, index) => (
                <div key={index} className="h-4 bg-gray-300 dark:bg-gray-700 animate-shimmer skeleton rounded w-1/3" />
              )) : 
                tags.map((tag, index) => (
                    <p className="hover:underline" key={index}>
                      {tag.tagname}
                    </p>
                  ))
            
        }




         
        </div>
      </div>
    </div>
  );
};

export default Tags;
