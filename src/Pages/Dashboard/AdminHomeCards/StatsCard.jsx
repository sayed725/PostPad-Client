import React from 'react'

const StatsCard = ({title, value, icon}) => {
  return (
     <div className="border-2 shadow-sm border-[#e5e7eb] dark:bg-[#20293d] dark:border-none rounded-lg">
               <div className="p-6 flex justify-between items-center">
               <div>
                 <div className=" dark:text-white">{title}</div>
                <div className="text-3xl text-[#005694] mt-3">{value}</div>
               </div>
                 <div className="text-[#005694] text-4xl">
                    {icon}
                </div>
               </div>
            </div>
  )
}

export default StatsCard