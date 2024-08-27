"use client";
import Link from "next/link";
import React, { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { CustomSpinner } from "@/components/CustomSpinner";
import HomeBackButton from "@/components/HomeBackButton";
import Image from "next/image";
import authUndraw from "@/assets/images/auth-undraw.png";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
if (!apiUrl) throw new Error("API URL is not defined");

export default function Page({
  searchParams,
}: {
  searchParams: { provider?: string };
}) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const [passShow, setPassShow] = useState(false);
  const [conPassShow, setConPassShow] = useState(false);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    mobile: "",
    confirmPassword: "",
  });

  const isProvider = searchParams.provider === "true";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    try {
      e.preventDefault();
      if (data.password !== data.confirmPassword) {
        Swal.fire({
          icon: "error",
          text: "Password does not match!!",
        });
        return;
      }
      if (!isProvider && !data.mobile) {
        Swal.fire({
          icon: "error",
          text: "Please enter a valid phone number!!",
        });
        return;
      }
      setIsLoading(true);
      const res = await fetch(apiUrl + "auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          password: data.password,
          type: isProvider ? "PROVIDER" : "CUSTOMER",
          ...(isProvider ? {} : { mobile: data.mobile }),
        }),
      });
      // console.log(res)
      const result = await res.json();
      if (result.ok) {
        setIsLoading(false);
        router.push("/verify?id=" + result.data.id);
      } else {
        setIsLoading(false);
        Swal.fire({
          icon: "error",
          text: result.message,
        });
      }
    } catch (error) {
      // console.error(error);
      setIsLoading(false);
      Swal.fire({
        icon: "error",
        text: "Something went wrong. Please try again later.",
      });
    }
  }

  return (
    <div className="flex items-center justify-center lg:px-10">
      <div className="w-3/4 lg:w-3/6 pl-6 hidden lg:block">
        <Image
          src={authUndraw}
          alt="authentication"
          width={1000}
          height={1000}
        />
      </div>
      <div className="min-h-screen w-full flex flex-col justify-center items-center px-3 py-10">
        <form
          className="max-w-screen-md w-full rounded-2xl border-green-500 mx-auto border p-11 grid grid-cols-2 gap-8"
          onSubmit={handleSubmit}
        >
          <h2 className="text-4xl font-medium col-span-2">Sign Up</h2>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={data.firstName}
            onChange={(e) => setData({ ...data, firstName: e.target.value })}
            required
            className="mt-1 p-3 w-full border border-black-500 rounded col-span-2 lg:col-span-1"
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={data.lastName}
            onChange={(e) => setData({ ...data, lastName: e.target.value })}
            required
            className="mt-1 p-3 w-full border border-black-500 rounded col-span-2 lg:col-span-1"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            required
            className={`mt-1 p-3 w-full border border-black-500 rounded col-span-2 ${
              isProvider ? "" : "lg:col-span-1"
            }`}
          />
          {!isProvider && (
            <div className="relative col-span-2 lg:col-span-1">
              <span className="absolute left-2 top-4 font-semibold">+61</span>
              <input
                type="tel"
                placeholder="Mobile"
                value={data.mobile}
                onChange={(e) => setData({ ...data, mobile: e.target.value })}
                required
                className="mt-1 p-3 w-full border border-black-500 rounded pl-10"
              />
            </div>
          )}

          <div className="relative flex items-center col-span-2">
            <input
              type={passShow ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              required
              className="mt-1 p-3 w-full border border-black-500 rounded"
            />
            {passShow ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20px"
                height="20px"
                viewBox="0 0 24 24"
                fill="none"
                className="absolute right-3"
                onClick={() => setPassShow((prev) => !prev)}
              >
                <path
                  d="M14.83 9.17999C14.2706 8.61995 13.5576 8.23846 12.7813 8.08386C12.0049 7.92926 11.2002 8.00851 10.4689 8.31152C9.73758 8.61453 9.11264 9.12769 8.67316 9.78607C8.23367 10.4444 7.99938 11.2184 8 12.01C7.99916 13.0663 8.41619 14.08 9.16004 14.83"
                  stroke="#000000"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 16.01C13.0609 16.01 14.0783 15.5886 14.8284 14.8384C15.5786 14.0883 16 13.0709 16 12.01"
                  stroke="#000000"
                  strokeWidth="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M17.61 6.39004L6.38 17.62C4.6208 15.9966 3.14099 14.0944 2 11.99C6.71 3.76002 12.44 1.89004 17.61 6.39004Z"
                  stroke="#000000"
                  strokeWidth="1.5"
                  stroke-linecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M20.9994 3L17.6094 6.39"
                  stroke="#000000"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6.38 17.62L3 21"
                  stroke="#000000"
                  strokeWidth="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M19.5695 8.42999C20.4801 9.55186 21.2931 10.7496 21.9995 12.01C17.9995 19.01 13.2695 21.4 8.76953 19.23"
                  stroke="#000000"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20px"
                height="20px"
                viewBox="0 0 24 24"
                fill="none"
                className="absolute right-3"
                onClick={() => setPassShow((prev) => !prev)}
              >
                <path
                  d="M12 16.01C14.2091 16.01 16 14.2191 16 12.01C16 9.80087 14.2091 8.01001 12 8.01001C9.79086 8.01001 8 9.80087 8 12.01C8 14.2191 9.79086 16.01 12 16.01Z"
                  stroke="#000000"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 11.98C8.09 1.31996 15.91 1.32996 22 11.98"
                  stroke="#000000"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M22 12.01C15.91 22.67 8.09 22.66 2 12.01"
                  stroke="#000000"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </div>

          <div className="relative flex items-center col-span-2">
            <input
              type={conPassShow ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={data.confirmPassword}
              onChange={(e) =>
                setData({ ...data, confirmPassword: e.target.value })
              }
              required
              className="mt-1 p-3 w-full border border-black-500 rounded"
            />
            {conPassShow ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20px"
                height="20px"
                viewBox="0 0 24 24"
                fill="none"
                className="absolute right-3"
                onClick={() => setConPassShow((prev) => !prev)}
              >
                <path
                  d="M14.83 9.17999C14.2706 8.61995 13.5576 8.23846 12.7813 8.08386C12.0049 7.92926 11.2002 8.00851 10.4689 8.31152C9.73758 8.61453 9.11264 9.12769 8.67316 9.78607C8.23367 10.4444 7.99938 11.2184 8 12.01C7.99916 13.0663 8.41619 14.08 9.16004 14.83"
                  stroke="#000000"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 16.01C13.0609 16.01 14.0783 15.5886 14.8284 14.8384C15.5786 14.0883 16 13.0709 16 12.01"
                  stroke="#000000"
                  strokeWidth="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M17.61 6.39004L6.38 17.62C4.6208 15.9966 3.14099 14.0944 2 11.99C6.71 3.76002 12.44 1.89004 17.61 6.39004Z"
                  stroke="#000000"
                  strokeWidth="1.5"
                  stroke-linecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M20.9994 3L17.6094 6.39"
                  stroke="#000000"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6.38 17.62L3 21"
                  stroke="#000000"
                  strokeWidth="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M19.5695 8.42999C20.4801 9.55186 21.2931 10.7496 21.9995 12.01C17.9995 19.01 13.2695 21.4 8.76953 19.23"
                  stroke="#000000"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20px"
                height="20px"
                viewBox="0 0 24 24"
                fill="none"
                className="absolute right-3"
                onClick={() => setConPassShow((prev) => !prev)}
              >
                <path
                  d="M12 16.01C14.2091 16.01 16 14.2191 16 12.01C16 9.80087 14.2091 8.01001 12 8.01001C9.79086 8.01001 8 9.80087 8 12.01C8 14.2191 9.79086 16.01 12 16.01Z"
                  stroke="#000000"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 11.98C8.09 1.31996 15.91 1.32996 22 11.98"
                  stroke="#000000"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M22 12.01C15.91 22.67 8.09 22.66 2 12.01"
                  stroke="#000000"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="bg-green-500 active:bg-green-600 disabled:cursor-not-allowed p-3 text-white rounded-md col-span-2 font-light outline-non disabled:bg-green-500 flex justify-center items-center gap-2"
          >
            Sign Up
            {isLoading && <CustomSpinner />}
          </button>
          <p className="text-center col-span-2">
            Already have an account? 
            <Link href="/login" className="text-green-500">
              Log In
            </Link>
          </p>
        </form>
        <HomeBackButton />
      </div>
    </div>
  );
}
