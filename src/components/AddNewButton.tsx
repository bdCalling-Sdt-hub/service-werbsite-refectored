"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { PiPlus } from "react-icons/pi";

const AddNewButton = ({target}: {target?: string}) => {
    const router = useRouter();
  return (
    <button
      onClick={() => router.push(target || "add-new")}
      type="submit"
      className="bg-green-500 active:bg-green-600 disabled:cursor-not-allowed py-3 px-6  text-white rounded-md font-light outline-non disabled:bg-green-500 flex justify-center items-center gap-2"
    >
      <PiPlus size={17} /> Add New
    </button>
  );
};

export default AddNewButton;
