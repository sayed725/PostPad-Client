import React from "react";


const Add2 = () => {


  return (
    <div className="bg-white dark:bg-[#20293d] dark:text-white">
      <div className="p-5 text-start shadow-lg">
        <h2 className="text-xl font-semibold border-b-2 border-[#005694] pb-1 w-[150px] ">
          Advertisements
        </h2>

        {/* add start  */}
        <div className="flex flex-col gap-10 py-5">
          <div>
            <img src="/ad-widget.gif" alt="" className="h-[300px] w-full object-contain lg:object-fill" />
          </div>


        </div>
      </div>
    </div>
  );
};

export default Add2;
