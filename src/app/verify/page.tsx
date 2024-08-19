"use client";
import { useState, useRef, useContext } from "react";
import { useRouter } from "next/navigation";
import { context } from "../Context";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
if (!apiUrl) throw new Error("API URL is not defined");

export default function Page({
  searchParams,
}: {
  searchParams: { id?: string };
}) {
  const appContext = useContext(context);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const router = useRouter();

  if (!searchParams.id) {
    router.push("/login");
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = e.target;
    if (isNaN(Number(value))) {
      return;
    }
    if (value.length <= 1) {
      setOtp((prev) => {
        const newArr = [...prev];
        newArr[index] = value;
        return newArr;
      });
      if (value && index < otp.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handelResend = async () => {
    try {
      const res = await fetch(
        apiUrl + "auth/otp?userId=" + searchParams.id
      ).then((res) => res.json());

      Swal.fire({
        icon: res.ok ? "success" : "error",
        text: res.message,
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        text: "Something went wrong. Please try again later.",
      });
    }
  };

  async function handelSubmit(e: React.FormEvent<HTMLFormElement>) {
    try {
      e.preventDefault();
      const otpValue = otp.join("");

      const res = await fetch(apiUrl + "auth/otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: searchParams.id,
          code: otpValue,
        }),
      }).then((res) => res.json());

      if (res.ok) {
        Cookies.set("token", res.data.token);
        appContext?.setUserData({
          id: res.data.id,
          email: res.data.email,
          type: res.data.type,
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          image: res.data.image,
          isVerified: res.data.isVerified,
          mobile: res.data.mobile,
          Businesses: res.data.Businesses,
        });

        if (res.data.user.type === "PROVIDER") {
          if (res.data.user.business) {
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
      <h2 className="text-4xl font-medium">Verify Account</h2>
      <p className="text-black-400">
        Enter the 4-digit code sent to your emile address
      </p>
      <div className="flex items-center justify-center gap-6">
        {otp.map((_, index) => (
          <input
            key={index}
            type="number"
            value={otp[index]}
            ref={(el) => {
              if (el) {
                inputRefs.current[index] = el;
              }
            }}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className="lg:px-11 px-4 py-5 bg-green-50 rounded-2xl border border-green-500 focus:outline-none lg:text-4xl lg:w-[113px] w-12 font-bold text-xl"
          />
        ))}
      </div>
      <div className="flex items-center justify-between">
        <p className="text-black-400">Didn’t receive code?</p>
        <span className="text-green-500 cursor-pointer" onClick={handelResend}>
          Resend
        </span>
      </div>
      <button
        type="submit"
        className="w-full bg-green-500 p-3 text-white rounded-md"
      >
        Verify Number
      </button>
    </form>
  );
}
