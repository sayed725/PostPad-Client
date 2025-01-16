import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";


const SearchBar = () => {

    const [search, setSearch] = useState('')


    console.log(search)



  return (
    <div className="p-5 shadow-lg bg-white ">
      <div className="flex flex-col items-center justify-center text-white">
        <div className="relative w-full">
          <input
            type="text"
            name='search'
            onChange={e => setSearch(e.target.value)}
            value={search}
            placeholder="Search by tags...."
            className="w-full bg-[#f5f5f5]  text-black rounded-full py-3 px-5 pl-12 outline-none focus:ring-2 focus:ring-blue-500"
          />
          <FaSearch className="absolute left-4 top-3 text-blue-500 text-xl" />
        </div>
        <div className="mt-4 text-sm flex">
          <span className="text-gray-700">Most Popular tags: </span>
          <p onClick={()=>setSearch('Helpdesk')}  className="text-blue-400 hover:underline mx-1">
            Helpdesk
          </p>
          <p
            
            className="text-blue-400 hover:underline mx-1"
          >
            Introduction
          </p>
          <p  className="text-blue-400 hover:underline mx-1">
            Payment
          </p>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
