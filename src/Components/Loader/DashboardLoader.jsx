import DashboardMainLoader from "./DashboardMainLoader";

const DashboardLoader = () => {
  return (
    <div className="flex flex- md:flex-row min-h-screen">
      {/* Sidebar Skeleton */}
      <div className="hidden md:flex w-full md:w-[220px] bg-gray-100 dark:bg-gray-800  p-4 flex-col">
        <div className="space-y-6">
          {/* Header */}
          <div className="h-10 w-full skeleton bg-gray-200 dark:bg-gray-700 p-2"></div>

          {/* Dashboard Menu */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3 mt-1 pl-2">
              <div className="w-6 h-6 bg-gray-200 dark:bg-gray-700 skeleton animate-shimmer rounded-lg" />
              <div className="w-2/5 h-4 bg-gray-200 dark:bg-gray-700 skeleton animate-shimmer" />
            </div>
            <div className="flex items-center gap-3 pl-2">
              <div className="w-6 h-6 bg-gray-200 dark:bg-gray-700 skeleton animate-shimmer rounded-lg" />
              <div className="w-3/5 h-4 bg-gray-200 dark:bg-gray-700 skeleton animate-shimmer" />
            </div>
            <div className="flex items-center gap-3 pl-2">
              <div className="w-6 h-6 bg-gray-200 dark:bg-gray-700 skeleton animate-shimmer rounded-lg" />
              <div className="w-4/6 h-4 bg-gray-200 dark:bg-gray-700 skeleton animate-shimmer" />
            </div>
            <div className="flex items-center gap-3 pl-2">
              <div className="w-6 h-6 bg-gray-200 dark:bg-gray-700 skeleton animate-shimmer rounded-lg" />
              <div className="w-3/5 h-4 bg-gray-200 dark:bg-gray-700 skeleton animate-shimmer" />
            </div>
            <div className="flex items-center gap-3 pl-2">
              <div className="w-6 h-6 bg-gray-200 dark:bg-gray-700 skeleton animate-shimmer rounded-lg" />
              <div className="w-2/5 h-4 bg-gray-200 dark:bg-gray-700 skeleton animate-shimmer" />
            </div>
            <div className="divider w-3/5 mx-auto"></div>
          </div>
        </div>

        {/* Main Menu */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3 mt-1 pl-2">
            <div className="w-1/5 h-4 bg-gray-200 dark:bg-gray-700 skeleton animate-shimmer" />
          </div>
          <div className="flex items-center gap-3 pl-2">
            <div className="w-2/5 h-4 bg-gray-200 dark:bg-gray-700 skeleton animate-shimmer" />
          </div>
          <div className="flex items-center gap-3 pl-2">
            <div className="w-3/6 h-4 bg-gray-200 dark:bg-gray-700 skeleton animate-shimmer" />
          </div>
        </div>

        {/* User Menu */}
        <div className="flex items-center gap-2 mt-4 absolute bottom-4">
          <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-700 skeleton"></div>
          <div>
            <div className="h-4 w-24 bg-gray-300/50 dark:bg-gray-700 skeleton"></div>
            <div className="h-3 w-32 bg-gray-200 dark:bg-gray-700 rounded skeleton mt-1"></div>
          </div>
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="flex-1 p-7 space-y-4 bg-white dark:bg-gray-800">
        <div className="h-full w-full skeleton bg-gray-50 dark:bg-gray-700">
        <DashboardMainLoader />
        </div>
      </div>
    </div>
  );
};

export default DashboardLoader;