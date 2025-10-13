import React from 'react';

const DashboardPostCardSkeleton = () => {
  return (
    <div className="shadow-sm w-full rounded-lg dark:bg-[#20293d] animate-pulse">
      {/* Card Header: Image and Dropdown */}
      <div className="relative">
        <div className="h-[220px] w-full bg-gray-300 dark:bg-gray-700 rounded-t-lg"></div>
        <div className="absolute top-2 right-2">
          <div className="bg-gray-200 dark:bg-gray-600 p-1 rounded border border-gray-300 dark:border-gray-600 w-8 h-8"></div>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <div className="h-6 w-16 bg-gray-300 dark:bg-gray-700 rounded"></div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-8 w-20 bg-gray-300 dark:bg-gray-700 rounded"></div>
            <div className="h-8 w-20 bg-gray-300 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
        <div className="h-6 w-3/4 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
        <div className="h-4 w-full bg-gray-300 dark:bg-gray-700 rounded mb-1"></div>
        <div className="h-4 w-5/6 bg-gray-300 dark:bg-gray-700 rounded"></div>
      </div>

      {/* Card Footer: Author */}
      <div className="p-4 flex items-center">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
          <div className="h-4 w-24 bg-gray-300 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPostCardSkeleton;