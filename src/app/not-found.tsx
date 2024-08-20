"use client"

import { useRouter } from "next/navigation";
import React from "react";
import { IoArrowBackSharp } from "react-icons/io5";

const NotFoundPage = () => {
  const router = useRouter();
  return (
    <div className=" min-h-screen flex flex-col justify-center items-center gap-5 ">
      <h1 className="text-red-500 text-2xl">404 !!! Not Found!! </h1>

      <button
        onClick={() => router.push("/")}
        className="outline-none flex justify-center items-center gap-1 font-medium text-lg"
      >
        <IoArrowBackSharp size={21} />
        Back
      </button>
    </div>
  );
};

export default NotFoundPage;
