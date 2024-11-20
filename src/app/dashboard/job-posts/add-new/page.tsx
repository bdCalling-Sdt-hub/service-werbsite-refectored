"use client";
import { useRouter } from "next/navigation";
import "react-quill/dist/quill.snow.css";
import { CustomSpinner } from "@/components/CustomSpinner";
import { usePostBitMutation } from "@/redux/features/bits/bitsApi";
import Swal from "sweetalert2";
import { useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/features/users/authSlice";
import { usePostJobMutation } from "@/redux/features/jobs/jobsApi";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
if (!apiUrl) throw new Error("API URL is not defined");

export default function AddJob() {
  const router = useRouter();
  const [description, setDescription] = useState("");
  const { user } = useAppSelector(selectCurrentUser);
  // console.log(user);
  const [mutaion, { isLoading: muLoading }] = usePostJobMutation();
  async function handelSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    var object: { [key: string]: any } = {};
    formData.forEach(function (value, key) {
      object[key] = value;
    });
    try {
      const res = await mutaion({ ...object, description }).unwrap();
      if (res.ok) {
        router.back();
        Swal.fire({
          icon: "success",
          text: res.message || "Posting successful!",
          timer: 1000,
        });
      } else {
        Swal.fire({
          icon: "error",
          text: res.message,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        text:
          (error as any).data.message ||
          "Something went wrong. Please try again later.",
      });
    }
  }
  return (
    <div className="flex items-center justify-center lg:px-10">
      <div className=" min-h-screen w-full flex flex-col justify-center items-start  px-3 py-10">
        <form
          className=" rounded-2xl border-green-500 mx-auto border py-16 px-7 lg:px-11 grid grid-cols-1 gap-6 mt-10 "
          onSubmit={handelSubmit}
        >
          <h2 className="text-2xl lg:text-4xl font-medium text-center mb-6">
            Post Job
          </h2>
          {/* <div className="flex justify-end items-center gap-2">
            <label className="col-span-2">Date : </label>
            <div className="relative col-span-8">
              <input
                type="date"
                name="date"
                // onChange={(e) => {

                // }}
                className="px-3 py-1 w-full border border-black-500 rounded text-sm"
              />
            </div>
          </div> */}
          <div className="grid grid-cols-10 gap-4 items-center">
            <label className="col-span-2">Job Title : </label>
            <div className="relative col-span-8">
              <input
                type="text"
                name="title"
                placeholder="Title"
                autoComplete="off"
                // onChange={(e) => {

                // }}
                // value={searchQuery?.postalCode || ""}
                required
                className="p-3 w-full border border-black-500 rounded"
              />
            </div>
          </div>
          <div className="grid grid-cols-10 gap-4 items-center">
            <label className="col-span-2">Phone : </label>
            <div className="relative col-span-8">
              <input
                type="text"
                name="phone"
                defaultValue={user?.business?.mobile}
                placeholder="+15 45678***5"
                autoComplete="off"
                // onChange={(e) => {

                // }}
                // value={searchQuery?.postalCode || ""}
                required
                className="p-3 w-full border border-black-500 rounded"
              />
            </div>
          </div>
          <div className="grid grid-cols-10 gap-4 items-center">
            <label className="col-span-2">Email : </label>
            <div className="relative col-span-8">
              <input
                type="email"
                name="email"
                defaultValue={user?.email}
                placeholder="jon@gmail.com"
                autoComplete="off"
                // onChange={(e) => {

                // }}
                // value={searchQuery?.postalCode || ""}
                required
                className="p-3 w-full border border-black-500 rounded"
              />
            </div>
          </div>
          <div className="grid grid-cols-10 gap-4">
            <label className="col-span-2 mt-1">Description :</label>
            <div className="col-span-8 h-60  border border-black-500 rounded">
              <ReactQuill
                theme="snow"
                value={description}
                onChange={(value) => setDescription(value)}
                className="h-3/4 custom-quill"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={muLoading}
            className="ml-auto bg-mastard-500 active:bg-mastard-600 disabled:cursor-not-allowed w-40 px-8 py-3 text-green-500 rounded-md font-light outline-non disabled:bg-green-500 disabled:text-white flex justify-center items-center gap-2"
          >
            Submit
            {muLoading && <CustomSpinner />}
          </button>
        </form>
      </div>
    </div>
  );
}
