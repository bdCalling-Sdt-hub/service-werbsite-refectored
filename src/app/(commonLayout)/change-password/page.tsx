"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { CustomSpinner } from "@/components/CustomSpinner";
import HomeBackButton from "@/components/HomeBackButton";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/features/users/authSlice";
import authUndraw from "@/assets/images/auth-undraw.png";
import Image from "next/image";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
if (!apiUrl) throw new Error("API URL is not defined");

export default function Page({
  searchParams,
}: {
  searchParams: { id?: string; from?: string };
}) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [show, setShow] = useState({
    oldPassword: false,
    newPassword: false,
    rePass: false,
  });
  const [credential, setCredential] = useState({
    oldPassword: "",
    newPassword: "",
    rePass: "",
  });

  async function handelSubmit(e: React.FormEvent<HTMLFormElement>) {
    setIsLoading(true);
    try {
      e.preventDefault();
      if (credential.newPassword !== credential.rePass) {
        setIsLoading(false);
        return Swal.fire({
          icon: "error",
          text: "New password and confirm password not matched",
        });
      }
      const token = Cookies.get("token");
      const res = await fetch(apiUrl + `users/${searchParams.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(credential),
      });
      const result = await res.json();
      if (result.statusCode === 200) {
        setIsLoading(false);
        Cookies.set("token", JSON.stringify(null));
        dispatch(setUser({ user: null, isLoading: false }));
        Swal.fire({
          icon: "success",
          text: result.message,
        });
        router.push("/login");
        return;
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
  }
  // console.log(hash);
  return (
    <div className="flex items-center justify-center lg:px-10">
      <div className="w-3/5 lg:w-3/6 pl-6 hidden lg:block">
        <Image
          src={authUndraw}
          alt="authentication"
          width={1000}
          height={1000}
        />
      </div>
      <div className="min-h-screen flex flex-col justify-center items-center px-3 py-10 w-full">
        <form
          className="max-w-screen-md w-full rounded-2xl mt-20 border-green-500 mx-auto border lg:p-11 p-5 flex flex-col gap-7"
          onSubmit={handelSubmit}
        >
          <h2 className="text-4xl font-medium">Set New Password</h2>

          {searchParams.from === "nav" && (
            <div className="relative flex items-center">
              <input
                type={show.newPassword ? "text" : "password"}
                name="oldPassword"
                placeholder="Current Password"
                value={credential?.oldPassword}
                onChange={(e) =>
                  setCredential({
                    ...credential,
                    [e.target.name]: e.target.value,
                  })
                }
                required
                className="p-3 w-full border border-black-500 rounded-md focus:outline-none"
              />
              {!show.oldPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20px"
                  height="20px"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="absolute right-3"
                  onClick={() =>
                    setShow((prev) => ({
                      ...prev,
                      oldPassword: !prev.oldPassword,
                    }))
                  }
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
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M17.61 6.39004L6.38 17.62C4.6208 15.9966 3.14099 14.0944 2 11.99C6.71 3.76002 12.44 1.89004 17.61 6.39004Z"
                    stroke="#000000"
                    strokeWidth="1.5"
                    strokeLinecap="round"
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
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M19.5695 8.42999C20.4801 9.55186 21.2931 10.7496 21.9995 12.01C17.9995 19.01 13.2695 21.4 8.76953 19.23"
                    stroke="#000000"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
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
                  onClick={() =>
                    setShow((prev) => ({
                      ...prev,
                      oldPassword: !prev.oldPassword,
                    }))
                  }
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
          )}
          <div className="relative flex items-center">
            <input
              type={show.newPassword ? "text" : "password"}
              name="newPassword"
              placeholder="New Password"
              value={credential?.newPassword}
              onChange={(e) =>
                setCredential({
                  ...credential,
                  [e.target.name]: e.target.value,
                })
              }
              required
              className="p-3 w-full border border-black-500 rounded-md focus:outline-none"
            />
            {!show.newPassword ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20px"
                height="20px"
                viewBox="0 0 24 24"
                fill="none"
                className="absolute right-3"
                onClick={() =>
                  setShow((prev) => ({
                    ...prev,
                    newPassword: !prev.newPassword,
                  }))
                }
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
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M17.61 6.39004L6.38 17.62C4.6208 15.9966 3.14099 14.0944 2 11.99C6.71 3.76002 12.44 1.89004 17.61 6.39004Z"
                  stroke="#000000"
                  strokeWidth="1.5"
                  strokeLinecap="round"
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
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M19.5695 8.42999C20.4801 9.55186 21.2931 10.7496 21.9995 12.01C17.9995 19.01 13.2695 21.4 8.76953 19.23"
                  stroke="#000000"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
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
                onClick={() =>
                  setShow((prev) => ({
                    ...prev,
                    newPassword: !prev.newPassword,
                  }))
                }
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

          <div className="relative flex items-center">
            <input
              type={show.rePass ? "text" : "password"}
              name="rePass"
              placeholder="Confirm Password"
              value={credential.rePass}
              onChange={(e) =>
                setCredential({
                  ...credential,
                  [e.target.name]: e.target.value,
                })
              }
              required
              className="p-3 w-full border border-black-500 rounded-md focus:outline-none"
            />
            {!show.rePass ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20px"
                height="20px"
                viewBox="0 0 24 24"
                fill="none"
                className="absolute right-3"
                onClick={() =>
                  setShow((prev) => ({ ...prev, rePass: !prev.rePass }))
                }
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
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M17.61 6.39004L6.38 17.62C4.6208 15.9966 3.14099 14.0944 2 11.99C6.71 3.76002 12.44 1.89004 17.61 6.39004Z"
                  stroke="#000000"
                  strokeWidth="1.5"
                  strokeLinecap="round"
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
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M19.5695 8.42999C20.4801 9.55186 21.2931 10.7496 21.9995 12.01C17.9995 19.01 13.2695 21.4 8.76953 19.23"
                  stroke="#000000"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
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
                onClick={() =>
                  setShow((prev) => ({ ...prev, rePass: !prev.rePass }))
                }
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
            className="bg-mastard-500 active:bg-mastard-600 text-green-500 disabled:cursor-not-allowed p-3 rounded-md col-span-2 font-light outline-non disabled:bg-green-500 disabled:text-white flex justify-center items-center gap-2"
          >
            Change Password
            {isLoading && <CustomSpinner />}
          </button>
        </form>
        <HomeBackButton />
      </div>
    </div>
  );
}
