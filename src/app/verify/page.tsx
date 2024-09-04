"use client";
import { useState, useRef, useContext } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import OTPInput from "react-otp-input";
import { CustomSpinner } from "@/components/CustomSpinner";
import HomeBackButton from "@/components/HomeBackButton";
import Image from "next/image";
import authUndraw from "@/assets/images/auth-undraw.png";
import { setUser } from "@/redux/features/users/authSlice";
import { useAppDispatch } from "@/redux/hooks";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
if (!apiUrl) throw new Error("API URL is not defined");

export default function Page({
  searchParams,
}: {
  searchParams: { id?: string };
}) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // if (!searchParams.id) {
  //   router.push("/login");
  // }

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
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await fetch(apiUrl + "auth/otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: searchParams.id,
          code: otp,
        }),
      });
      const result = await res.json();
      if (res.ok) {
        setIsLoading(false);
        Cookies.set("token", result.data.token);
        dispatch(setUser({ user: result.data?.user, isLoading: false }));
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
      <div className=" min-h-screen w-full flex flex-col justify-center items-center  px-3 py-10">
        <form
          className="max-w-screen-md  rounded-2xl border-green-500 mt-20 mx-auto border lg:p-11 p-5 flex flex-col gap-7"
          onSubmit={handelSubmit}
        >
          <h2 className="text-4xl font-medium">Verify Account</h2>
          <p className="text-black-400">
            Enter the 4-digit code sent to your emile address
          </p>
          <div className="text-4xl font-medium px-[5%]">
            <OTPInput
              value={otp}
              onChange={setOtp}
              numInputs={4}
              inputStyle={{
                height: "90px",
                width: "20%",
                margin: "4%",
                background: "#E6F3EC",
                border: "1px solid #058240",
                marginRight: "10px",
                outline: "none",
                borderRadius: "20px",
                color: "#4E4E4E",
              }}
              renderSeparator={<span> </span>}
              renderInput={(props) => <input {...props} />}
            />
          </div>
          <div className="flex items-center justify-between">
            <p className="text-black-400">Didn’t receive code?</p>
            <span
              className="text-green-500 cursor-pointer"
              onClick={handelResend}
            >
              Resend
            </span>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="bg-green-500 active:bg-green-600 disabled:cursor-not-allowed p-3 text-white rounded-md col-span-2 font-light outline-non disabled:bg-green-500 flex justify-center items-center gap-2"
          >
            Verify Number
            {isLoading && <CustomSpinner />}
          </button>
        </form>
        <HomeBackButton />
      </div>
    </div>
  );
}
