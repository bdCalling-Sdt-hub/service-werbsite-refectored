"use client";
import "react-quill/dist/quill.snow.css";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";
import profileDemo from "../../../assets/images/profile-demo.jpg";
import BusinessRegisterSuggation from "@/components/BusinessRegisterSuggation";
import Swal from "sweetalert2";
import { CustomSpinner } from "@/components/CustomSpinner";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
if (!apiUrl) throw new Error("API URL is not defined");

export default function Page() {
  const router = useRouter();
  const { user, isLoading: userDataLoading } = useAppSelector(
    (state) => state.auth
  );
  const [userData, setUserData] = useState<{ [key: string]: string }>({});
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageFile, setImageFile] = useState<File>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setUserData({
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      mobile: user?.mobile || "",
    });
  }, [user]);

  // if (!userDataLoading && !user) router.push("/login");

  async function handelEdit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const token = Cookies.get("token");
      const formData = new FormData();
      if (imageFile) {
        formData.append("image", imageFile);
      }
      for (const [key, value] of Object.entries(userData)) {
        formData.append(key, value);
      }
      const res = await fetch(apiUrl + "users/" + user?.id, {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + token,
        },
        body: formData,
      });
      const result = await res.json();
      if (result.ok) {
        setIsLoading(false);
        Swal.fire({
          icon: "success",
          text: "Updating successful!",
        });
      } else {
        setIsLoading(false);
        Swal.fire({
          icon: "error",
          text: result.message,
        });
      }
    } catch (error) {
      setIsLoading(false);
      Swal.fire({
        icon: "error",
        text: "Something went wrong. Please try again later.",
      });
    }
    // console.log({ user, businessData });
  }

  return (
    <section className="rounded-2xl p-8 lg:p-14 max-w-4xl lg:max-w-5xl mx-auto">
      <h1 className="font-medium text-2xl lg:text-4xl">My profile</h1>
      <form className=" flex flex-col gap-8" onSubmit={handelEdit}>
        {/* profile information */}
        <div className="space-y-7">
          <div className="my-10 flex items-center gap-4 relative">
            <Image
              src={
                imageFile
                  ? URL.createObjectURL(imageFile)
                  : user?.image
                  ? apiUrl + "/" + user?.image
                  : profileDemo
              }
              alt="profile"
              className="rounded-full w-[120px] h-[120px] border"
              width={120}
              height={120}
            />
            <div>
              <input
                type="file"
                accept="image/*"
                multiple={false}
                name="profileImage"
                className="hidden"
                ref={fileInputRef}
                onChange={(e) => {
                  if (e.target.files) {
                    setImageFile(e.target.files[0]);
                  }
                }}
              />
              <button
                type="button"
                onClick={() => fileInputRef?.current?.click()}
                className="rounded-t-[3px] border-[.5px] border-b-2 py-2 px-3 border-white bg-mastard-500 text-green-500 font-light"
              >
                Upload
              </button>
            </div>
          </div>
          <div className="w-full flex flex-col">
            <label className="font-medium text-black-500">First Name</label>
            <input
              type="text"
              name="name"
              value={userData.firstName}
              onChange={(e) =>
                setUserData({ ...userData, firstName: e.target.value })
              }
              required
              className="h-12 focus:outline-none p-3 rounded border-[#343333] border font-medium mt-2"
              placeholder="Name"
            />
          </div>
          <div className="w-full flex flex-col">
            <label className="font-medium text-black-500">Last Name</label>
            <input
              type="text"
              name="name"
              required
              onChange={(e) =>
                setUserData({ ...userData, lastName: e.target.value })
              }
              value={userData.lastName}
              className="h-12 focus:outline-none p-3 rounded border-[#343333] border font-medium mt-2"
              placeholder="Name"
            />
          </div>
          <div className="w-full flex flex-col">
            <label className="font-medium text-black-500">Email</label>
            <input
              type="text"
              name="email"
              required
              readOnly
              value={user?.email}
              className="h-12 focus:outline-none p-3 rounded border-[#343333] border font-medium mt-2"
              placeholder="Email"
            />
          </div>
          <div className="w-full flex flex-col relative">
            <label className="font-medium text-black-500">Mobile Number</label>
            <span className="absolute left-2.5 top-11">+61</span>
            <input
              type="text"
              name="mobile"
              value={userData.mobile ?? ""}
              onChange={(e) =>
                setUserData({ ...userData, mobile: e.target.value })
              }
              className="h-12 focus:outline-none pl-10 p-3 rounded border-[#343333] border font-medium mt-2"
              placeholder="Your Number"
            />
          </div>
       
        </div>
        <div className="mt-3 flex justify-center lg:justify-start">
          <button
            disabled={isLoading}
            className="w-[220px] bg-mastard-500 active:bg-mastard-600 disabled:cursor-not-allowed p-3 text-white rounded-md col-span-2 font-light outline-non disabled:bg-green-500 disabled:text-white flex justify-center items-center gap-2"
          >
            Save Changes {isLoading && <CustomSpinner />}
          </button>
        </div>
      </form>
      {user?.type === "PROVIDER" && !user.business && (
        <BusinessRegisterSuggation />
      )}
    </section>
  );
}
