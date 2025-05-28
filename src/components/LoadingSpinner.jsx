const LoadingSpinner = () => {
  return (
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-red-500/30 rounded-full animate-spin">
            <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-red-500 rounded-full animate-spin"></div>
          </div>
        </div>
        <p className="text-white text-xl font-medium">Loading ...</p>
      </div>
  );
};
export default LoadingSpinner;