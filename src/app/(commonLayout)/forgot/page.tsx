"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import HomeBackButton from "@/components/HomeBackButton";
import Image from "next/image";
import authUndraw from "@/assets/images/auth-undraw.png";
import { CustomSpinner } from "@/components/CustomSpinner";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
if (!apiUrl) throw new Error("API URL is not defined");

export default function Page() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = React.useState("");

  async function handelSubmit(e: React.FormEvent) {
    try {
      e.preventDefault();
      setIsLoading(true);
      const res = await fetch(apiUrl + "auth/forgot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      }).then((res) => res.json());
      if (res.ok) {
        setIsLoading(false);
        router.push(`/verify?id=${res?.data?.id}`);
      } else {
        setIsLoading(false);
        Swal.fire({
          icon: "error",
          text: res.message,
        });
      }
    } catch (error) {
      setIsLoading(false);
      // console.error(error);
      Swal.fire({
        icon: "error",
        text: "Something went wrong. Please try again later.",
      });
    }
  }

  return (
    <div className="flex items-center justify-center lg:px-20">
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
          className="max-w-screen-md rounded-2xl border-green-500 mt-20 mx-auto border lg:p-11 p-5 flex flex-col gap-7"
          onSubmit={handelSubmit}
        >
          <h2 className="text-4xl font-medium">Forgot Password</h2>
          <p className="text-black-400">
            Please enter your Email Address to reset your password.
          </p>
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="p-3 w-full border border-black-500 rounded-md focus:outline-none"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="bg-mastard-500 active:bg-mastard-600 disabled:cursor-not-allowed p-3 text-green-500 rounded-md col-span-2 font-light outline-non disabled:bg-green-500 disabled:text-white flex justify-center items-center gap-2"
          >
            Send OTP
            {isLoading && <CustomSpinner />}
          </button>
        </form>
        <HomeBackButton />
      </div>
    </div>
  );
}
