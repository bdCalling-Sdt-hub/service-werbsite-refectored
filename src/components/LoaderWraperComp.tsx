import React, { ReactNode } from "react";
import { ImSpinner3 } from "react-icons/im";

const LoaderWraperComp = ({
  isLoading,
  isError,
  height,
  children,
}: {
  isLoading: boolean;
  isError: boolean;
  height?: string;
  children: ReactNode;
}) => {
  if (isLoading || isError) {
    return (
      <div
        className={` ${
          height ? height : "h-[50vh]"
        } w-full flex flex-col justify-center items-center`}
      >
        {isLoading ? (
          <>
            <ImSpinner3 size={40} className="animate-spin transition-all" />
            <span className="text-sm text-gray-300">Loading...</span>
          </>
        ) : (
          //   <MagnifyingGlass
          //     visible={true}
          //     height="100"
          //     width="100"
          //     ariaLabel="magnifying-glass-loading"
          //     wrapperStyle={{
          //       animation: "0 spin 0.8s linear infinite", // Adjust speed here
          //     }}
          //     wrapperClass="magnifying-glass-wrapper"
          //     glassColor="#FFFFFF"
          //     color="#9610FF"
          //   />
          <h1 className="text-red-400">
            {isError ? isError : "Something want wrong!"}
          </h1>
        )}
      </div>
    );
  }
  return children;
};

export default LoaderWraperComp;
