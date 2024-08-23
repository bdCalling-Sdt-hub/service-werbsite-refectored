"use client"

import { useRouter } from 'next/navigation';
import React from 'react'
import { IoArrowBackSharp } from 'react-icons/io5';

const HomeBackButton = () => {
    const router = useRouter();
  return (
    <button
    onClick={() => router.push("/")}
    className="outline-none text-gray-600 hover:text-black flex justify-center items-center gap-1 font-medium mt-10"
  >
    <IoArrowBackSharp size={18} />
    Back Home
  </button>
  )
}

export default HomeBackButton