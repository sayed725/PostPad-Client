import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import LoadingSpinner from "./LoadingSpinner";

const Tags = () => {

    const axiosSecure = useAxiosSecure()


    // const tags = [  '#love', '#instagood', '#fashion', '#photooftheday', '#photography', '#art', '#beautiful', '#nature', '#travel', '#fitness']

    const { data: tags = [], isLoading } = useQuery({
        queryKey: ['tags'],
        queryFn: async() => {
            const res = await axiosSecure.get('/tags');
            return res.data;
        }
    })






   if(isLoading){
    return <LoadingSpinner></LoadingSpinner>
   }


    


    return (
        <div className="bg-white shadow-lg dark:bg-[#20293d] dark:text-white">
            <div className="p-5">
            <h2 className='text-xl font-semibold border-b-2 border-[#005694] pb-1 w-[120px] '>Popular Tags</h2>


            <div className="mt-5 flex flex-col gap-3 overflow-y-auto h-[400px]">
            
            {
                tags.map((tag,index)=> <p className="hover:underline" key={index}>{tag.tagname}</p>)
            }
            </div>

        </div>
        </div>
    );
};

export default Tags;