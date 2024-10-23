"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa6";

const PageHeading = ({ title, backPath }: {title: string; backPath?: string}) => {
  const router = useRouter();
  return (
    <div className=" text-primary flex items-center gap-1 pt-4">
      {/* <button
        className="outline-none px-2"
        onClick={() => router.push(backPath || "/")}
      >
        <FaArrowLeft size={22} />
      </button> */}
      <h1 className="text-[24px] font-medium">{title}</h1>
    </div>
  );
};

export default PageHeading;
