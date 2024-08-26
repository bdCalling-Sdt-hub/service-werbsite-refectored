import React, { ReactNode } from "react";
import { ImSpinner3 } from "react-icons/im";

const LoaderWraperComp = ({
  isLoading,
  isError,
  height,
  dataEmpty = false,
  children,
}: {
  isLoading?: boolean;
  isError?: boolean;
  height?: string;
  dataEmpty?: boolean;
  children: ReactNode;
}) => {
  if (isLoading || isError || dataEmpty) {
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
        ) : isError ? (
          <h1 className="text-red-400">Something want wrong!</h1>
        ) : (
          <h1 className="text-green-400">
            {isError ? isError : "Empty data!"}
          </h1>
        )}
      </div>
    );
  }
  return children;
};

export default LoaderWraperComp;
