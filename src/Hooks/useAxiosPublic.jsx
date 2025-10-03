import axios from "axios";

const axiosPublic = axios.create({
    // baseURL: 'https://a-12-post-pad-server.vercel.app'
     baseURL: 'http://localhost:5001'
})


const useAxiosPublic = ()=>{
    return axiosPublic;
}

export default useAxiosPublic;