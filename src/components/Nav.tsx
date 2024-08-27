"use client";
import React, { useContext, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setUser } from "@/redux/features/users/authSlice";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
if (!apiUrl) throw new Error("API URL is not defined");

export default function Nav() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = React.useState(false);
  const { user } = useAppSelector((state) => state.auth);
  return (
    <nav className="flex items-center justify-between lg:px-10 lg:py-[12px] px-2 py-2 bg-green-900 fixed z-30 w-full text-white">
      <Link href="/">
        <Image
          src="/LOGO.png"
          alt="logo"
          className="w-36 lg:w-56"
          width={1000}
          height={1000}
          priority
        />
      </Link>

      {user ? (
        <div className="flex items-center gap-7">
          <ul className="flex items-center gap-7">
            {user.type === "PROVIDER" ? (
              <>
                {user.business ? (
                  <Link
                    href="/dashboard"
                    className="font-medium hover:text-green-400 transition-all lg:block hidden"
                  >
                    Dashboard
                  </Link>
                ) : (
                  <Link
                    href="/register-business"
                    className="font-medium hover:text-green-500 transition-all lg:block hidden"
                  >
                    Business Registration
                  </Link>
                )}
              </>
            ) : (
              <></>
            )}
          </ul>
          <div
            className="flex items-center justify-center gap-2 relative cursor-pointer"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <p className="font-medium">{user.firstName}</p>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M14.7071 12.7071C14.3166 13.0976 13.6834 13.0976 13.2929 12.7071L10 9.41421L6.70711 12.7071C6.31658 13.0976 5.68342 13.0976 5.29289 12.7071C4.90237 12.3166 4.90237 11.6834 5.29289 11.2929L9.29289 7.29289C9.68342 6.90237 10.3166 6.90237 10.7071 7.29289L14.7071 11.2929C15.0976 11.6834 15.0976 12.3166 14.7071 12.7071Z"
                  fill="#FFF"
                />
              ) : (
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5.29289 7.29289C5.68342 6.90237 6.31658 6.90237 6.70711 7.29289L10 10.5858L13.2929 7.29289C13.6834 6.90237 14.3166 6.90237 14.7071 7.29289C15.0976 7.68342 15.0976 8.31658 14.7071 8.70711L10.7071 12.7071C10.3166 13.0976 9.68342 13.0976 9.29289 12.7071L5.29289 8.70711C4.90237 8.31658 4.90237 7.68342 5.29289 7.29289Z"
                  fill="#FFF"
                />
              )}
            </svg>
            <div className="w-[60px] h-[60px] rounded-full overflow-hidden">
              <Image
                src={user.image ? apiUrl + user.image : "/user.png"}
                alt="user"
                width={60}
                height={60}
                className="rounded-full w-full h-full select-none object-cover"
              />
            </div>
            {isOpen ? (
              <ul className="absolute bg-[#D9D9D9] rounded-md py-2 top-[70px] right-0 cursor-default flex flex-col z-10 text-black">
                <Link href="/profile" className="py-2 px-6 hover:bg-[#E8E8E8]">
                  Profile
                </Link>
                <Link
                  href="/notifications"
                  className="py-2 px-6 hover:bg-[#E8E8E8]"
                >
                  Notifications
                </Link>
                {user.type === "PROVIDER" && (
                  <>
                    <Link
                      href="/dashboard"
                      className="py-2 px-6 hover:bg-[#E8E8E8] block lg:hidden"
                    >
                      Dashboard
                    </Link>
                    <Link
                      href="/portfolio"
                      className="py-2 px-6 hover:bg-[#E8E8E8]"
                    >
                      Portfolio
                    </Link>
                    <Link
                      href="/subscription"
                      className="py-2 px-6 hover:bg-[#E8E8E8]"
                    >
                      Subscription
                    </Link>
                  </>
                )}
                <li
                  className="py-2 px-6 text-green-600 hover:bg-[#E8E8E8] cursor-pointer"
                  onClick={() =>
                    Swal.fire({
                      text: "Are you sure you want to logout?",
                      showCancelButton: true,
                      confirmButtonText: "Logout",
                      cancelButtonText: "Close",
                      showConfirmButton: true,
                      confirmButtonColor: "#DC2626",
                    }).then((res) => {
                      if (res.isConfirmed) {
                        dispatch(setUser({ user: null, isLoading: false }));
                        Cookies.remove("token");
                        router.push("/");
                      }
                    })
                  }
                >
                  Logout
                </li>
              </ul>
            ) : null}
          </div>
        </div>
      ) : (
        <div className="flex justify-between lg:gap-6 gap-2 text-green-600 font-medium ">
          <Link
            href="/login"
            className="flex items-center gap-2 rounded-t-[3px] border-[.5px] border-b-2 py-2 px-3 border-green-600 bg-green-50"
          >
            Login{" "}
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.75 16.25L16.25 3.75M16.25 3.75H6.875M16.25 3.75V13.125"
                stroke="#05763A"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
          <Link
            href="/register?provider=true"
            className="flex items-center gap-2 rounded-t-[3px] border-[.5px] border-b-2 py-2 px-3 border-green-600 bg-green-50"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 9C11.6569 9 13 7.65685 13 6C13 4.34315 11.6569 3 10 3C8.34315 3 7 4.34315 7 6C7 7.65685 8.34315 9 10 9Z"
                fill="#058240"
              />
              <path
                d="M3 18C3 14.134 6.13401 11 10 11C13.866 11 17 14.134 17 18H3Z"
                fill="#058240"
              />
            </svg>
            <span className="lg:block hidden">Join as a Professional</span>
            <span className="lg:hidden block">Join</span>
          </Link>
        </div>
      )}
    </nav>
  );
}
