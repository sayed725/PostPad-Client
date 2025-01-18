import React from "react";
import {
  FaMapMarkerAlt,
  FaSun,
  FaCloudShowersHeavy,
  FaBolt,
} from "react-icons/fa";

const Add = () => {
  return (
    <div className="bg-white">
      <div className="p-5 text-start shadow-lg">
        <h2 className="text-xl font-semibold border-b-2 border-[#005694] pb-1 w-[150px] ">
          Advertisements
        </h2>

        {/* add start  */}
        <div className="flex flex-col gap-10 py-5">
          <div>
            <img src="/add1.gif" alt="" className="h-[300px] w-full object-contain lg:object-fill" />
          </div>

          <div> 
            <h2 className="text-xl font-semibold border-b-2 border-[#005694] pb-1 w-[150px] ">
              Weather Today
            </h2>
            <div className="mx-auto bg-blue-500 text-white rounded-lg shadow-lg p-6 mt-5">
              <div className="text-center">
                <div className="text-6xl font-bold">71&deg;</div>
                <FaSun className="text-5xl mx-auto my-2" />
                <div className="text-2xl">Sunny</div>
                <div className="text-sm mt-2">
                  Real Feel: 78&deg; &nbsp; | &nbsp; Rain Chance: 5%
                </div>
              </div>
              <div className="flex justify-around lg:justify-between items-center mt-6">
                <div className="text-center">
                  <div>MON</div>
                  <FaSun className="text-2xl" />
                  <div>69&deg;</div>
                </div>
                <div className="text-center">
                  <div>TUE</div>
                  <FaBolt className="text-2xl" />
                  <div>74&deg;</div>
                </div>
                <div className="text-center">
                  <div>WED</div>
                  <FaCloudShowersHeavy className="text-2xl" />
                  <div>73&deg;</div>
                </div>
                <div className="text-center">
                  <div>THU</div>
                  <FaSun className="text-2xl" />
                  <div>68&deg;</div>
                </div>
              </div>
              <div className="text-center mt-6">
                <div className="text-lg">Sunday, 18th 2018</div>
                <div className="text-sm flex items-center justify-center mt-1">
                  <FaMapMarkerAlt className="mr-1" /> Los Angeles, CA
                </div>
              </div>
            </div>
          </div>

          {/* add no 2  */}

          <div>
          <h2 className="text-xl font-semibold border-b-2 border-[#005694] pb-1 w-[150px] ">
          Advertisements
            </h2>
            <img src="/add2.jpg" alt="" className="h-[300px] w-full object-contain mt-5" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add;
