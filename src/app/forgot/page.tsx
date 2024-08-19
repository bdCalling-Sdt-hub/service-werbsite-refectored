"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
if (!apiUrl) throw new Error("API URL is not defined");

export default function Page() {
  const [email, setEmail] = React.useState("");
  const router = useRouter();

  async function handelSubmit(e: React.FormEvent) {
    try {
      e.preventDefault();
      if (!email || !email.includes("@") || !email.includes(".")) {
        alert("Please enter your email address");
        return;
      }

      const res = await fetch(apiUrl + "auth/forgot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      }).then((res) => res.json());

      if (res.ok) {
        router.push("/verify");
      } else {
        Swal.fire({
          icon: "error",
          text: res.message,
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        text: "Something went wrong. Please try again later.",
      });
    }
  }

  return (
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
        className="w-full bg-green-500 p-3 text-white rounded-md"
      >
        Send OTP
      </button>
    </form>
  );
}
