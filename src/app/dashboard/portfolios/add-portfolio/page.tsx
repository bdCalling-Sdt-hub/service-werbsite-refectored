"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { CustomSpinner } from "../../../../components/CustomSpinner";
import { usePostPortfolioMutation } from "@/redux/features/portfolio/portfolioApi";

export default function AddPortfolio() {
  const router = useRouter();
  const [postPortfolio, { isLoading }] = usePostPortfolioMutation();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const formData = new FormData(e.target as HTMLFormElement);
      const res = await postPortfolio(formData);
      if (res?.data?.ok) {
        Swal.fire({
          icon: "success",
          text: res.data.message,
        });
        router.back();
      } else {
        Swal.fire({
          icon: "error",
          text: "Internal Server Error!!",
          // text: res.error?.data.message ,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: "Something went wrong. Please try again later.",
      });
    }
  }

  return (
    <div className="min-h-[80vh] flex justify-center lg:items-center  ">
      <div className="bg-white w-full max-w-screen-md p-7 rounded-lg text-lg text-black-500 font-medium text-center my-6">
        <div className="flex items-center gap-3">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="cursor-pointer"
            onClick={() => router.back()}
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M11.647 20.0481C11.1783 20.5168 10.4185 20.5168 9.94991 20.0481L2.74991 12.8481C2.28128 12.3795 2.28128 11.6197 2.74991 11.1511L9.94991 3.95108C10.4185 3.48245 11.1783 3.48245 11.647 3.95108C12.1156 4.41971 12.1156 5.17951 11.647 5.64814L6.49549 10.7996H20.3984C21.0612 10.7996 21.5984 11.3369 21.5984 11.9996C21.5984 12.6624 21.0612 13.1996 20.3984 13.1996L6.49549 13.1996L11.647 18.3511C12.1156 18.8197 12.1156 19.5795 11.647 20.0481Z"
              fill="#222222"
            />
          </svg>
          <h3 className="text-3xl">Add new Portfolio</h3>
        </div>
        <form
          className="flex flex-col gap-4 text-lg items-start mt-8"
          onSubmit={handleSubmit}
        >
          <label htmlFor="">Portfolio name</label>
          <input
            type="text"
            name="name"
            required
            className="border border-black-500 rounded-md p-4 w-full"
            placeholder="Enter Portfolio name"
          />
          <label htmlFor="">Upload image</label>
          <input
            type="file"
            name="image"
            required
            className="border border-black-500 rounded-md p-4 w-full"
            placeholder="Image"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-green-500 active:bg-green-600 disabled:cursor-not-allowed p-3 text-white rounded-md font-light outline-non disabled:bg-green-500 flex justify-center items-center gap-2"
          >
            Add Portfolio
            {isLoading && <CustomSpinner />}
          </button>
        </form>
      </div>
    </div>
  );
}
