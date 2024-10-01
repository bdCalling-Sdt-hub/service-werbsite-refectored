"use client";
import { useState, useContext } from "react";
import Link from "next/link";
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
  searchParams: { [key: string]: string };
}) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [show, setShow] = useState(false);
  const [credential, setCredential] = useState({ email: "", password: "" });

  // console.log(searchParams?.redirect_path?.split("-").join("/"));
  async function handelSubmit(e: React.FormEvent<HTMLFormElement>) {
    setIsLoading(true);
    try {
      e.preventDefault();
      const res = await fetch(apiUrl + "auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credential.email,
          password: credential.password,
        }),
      });
      const result = await res.json();
      if (result.statusCode === 401) {
        setIsLoading(false);
        router.push("/verify?id=" + result.data?.id);
        return;
      }
      if (result.ok) {
        // console.log(result);
        setIsLoading(false);
        Cookies.set("token", result.data.token);
        dispatch(setUser({ user: result.data?.user, isLoading: false }));
        if (searchParams?.redirect_path) {
          router.push(
            searchParams?.redirect_path?.split("-").join("/") +
              window.location.hash 
          );
          return;
        }
        // console.log(result)
        if (result.data.user.type === "PROVIDER") {
          if (result.data.user.business) {
            router.push("/dashboard");
            return;
          } else {
            router.push("/register-business");
            return;
          }
        } else {
          router.push("/profile");
        }
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
  // console.log("/" + searchParams?.redirect_path.split("-").join("/"));
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
          <h2 className="text-4xl font-medium">Login</h2>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={credential.email}
            onChange={(e) =>
              setCredential({ ...credential, email: e.target.value })
            }
            required
            className="p-3 w-full border border-black-500 rounded-md focus:outline-none"
          />
          <div className="relative flex items-center">
            <input
              type={show ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={credential.password}
              onChange={(e) =>
                setCredential({ ...credential, password: e.target.value })
              }
              required
              className="p-3 w-full border border-black-500 rounded-md focus:outline-none"
            />
            {show ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20px"
                height="20px"
                viewBox="0 0 24 24"
                fill="none"
                className="absolute right-3"
                onClick={() => setShow((prev) => !prev)}
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
                onClick={() => setShow((prev) => !prev)}
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
          <div className="flex justify-between items-center text-sm lg:text-base">
            <div className="flex items-center">
              <input
                type="checkbox"
                name="remember"
                className="cursor-pointer w-5 h-5"
              />
              <label htmlFor="remember" className="ml-2">
                Remember me
              </label>
            </div>
            <Link href="/forgot" className="text-green-500">
              forget password?
            </Link>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="bg-green-500 active:bg-green-600 disabled:cursor-not-allowed p-3 text-white rounded-md col-span-2 font-light outline-non disabled:bg-green-500 flex justify-center items-center gap-2"
          >
            Login
            {isLoading && <CustomSpinner />}
          </button>
          <p className="text-center">
            Don&lsquo;t have an account?{" "}
            <Link href="/register" className="text-green-500">
              Register
            </Link>
          </p>
        </form>
        <HomeBackButton />
      </div>
    </div>
  );
}
