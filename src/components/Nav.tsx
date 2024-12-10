"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout } from "@/redux/features/users/authSlice";
import profileDemo from "@/assets/images/profile-demo.jpg";
import { MdOutlineLogout } from "react-icons/md";
import { BsKey } from "react-icons/bs";
import { LuUserCheck2 } from "react-icons/lu";
import { RiArrowDownSLine } from "react-icons/ri";
import { sidevarMenus } from "./ResponsiveSidebar";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
if (!apiUrl) throw new Error("API URL is not defined");

export default function Nav() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = React.useState(false);
  const { user } = useAppSelector((state) => state.auth);
  const containerRef = useRef<any>(null);
  const handleOutsideClick = (e: any) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(e.target as Node)
    ) {
      setIsOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <>
    <nav className="select-none lg:flex items-center justify-between lg:px-10 lg:py-[12px] px-2 py-2 fixed z-30 w-full bg-slate-100 shadow-lg hidden">
      <Link href="/">
        <Image
          src="/LOGO.png"
          alt="logo"
          className="w-28 lg:w-40"
          width={200}
          height={1000}
          priority
        />
      </Link>
      <div className="group">
        <button className="lg:font-medium text-sm lg:text-base px-4">
          For Customers{" "}
          <RiArrowDownSLine
            size={19}
            className="text-gray-300 group-hover:text-gray-400 mt-0.5 inline-block transition-all"
          />
        </button>
        <div className="hidden group-hover:block absolute z-50 pt-5 lg:pt-6">
          <div className="flex flex-col items-start gap-0.5 bg-white px-4 py-4 min-w-[150px] w-fit rounded shadow">
            <Link
              href="/add-bit-wallet"
              className="hover:text-blue-800 transition-all w-full py-1.5"
            >
              Bid
            </Link>
          </div>
        </div>
      </div>
      <div
        className=" group"
        // onClick={() => setIsOpen((prev) => !prev)}
      >
        <button className="text-sm lg:text-base lg:font-medium">
          For Service Provider{" "}
          <RiArrowDownSLine
            size={19}
            className="text-gray-300 group-hover:text-gray-400 mt-0.5 inline-block transition-all"
          />
        </button>
        <div className="hidden group-hover:block absolute z-50 pt-6">
          <div className="flex flex-col items-start gap-0.5 bg-white px-4 py-4 min-w-[150px] w-fit rounded shadow">
            {[
              { name: "Dashboard", path: "/dashboard" },
              { name: "Plans", path: "/dashboard/upgrade-plane" },
            ].map((item, index) => (
              <Link
                key={index}
                href={item.path}
                className="hover:text-blue-800 transition-all w-full py-1.5"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Link href="/jobs" className="font-medium">
        Search Jobs
      </Link>
      <Link href="/referral" className="font-medium">
        Referral
      </Link>
      {user ? (
        <div className="flex items-center gap-7">
          <ul className="flex items-center gap-7">
            {user.type === "PROVIDER" ? (
              <>
                {user.business ? (
                  <></>
                ) : (
                  // <Link
                  //   href="/dashboard"
                  //   className="font-medium hover:text-green-400 transition-all lg:block hidden"
                  // >
                  //   Dashboard
                  // </Link>
                  <Link
                    href="/register-business"
                    className="flex items-center gap-2 rounded-t-[3px] border-[.5px] border-b-2 py-2 px-3 text-green-600 bg-mastard-500"
                  >
                    <span className="lg:block hidden">
                      Business Registration
                    </span>
                    <span className="lg:hidden block">Join</span>
                  </Link>
                )}
              </>
            ) : (
              <>
                {/* <Link
                  href="/jobs"
                  className="font-medium hover:text-green-400 transition-all lg:block hidden"
                >
                  Jobs
                </Link>
                <Link
                  href="/add-bit-wallet"
                  className="font-medium hover:text-green-400 transition-all lg:block hidden"
                >
                  Bid
                </Link> */}
              </>
            )}
          </ul>
          <div
            className="flex items-center justify-center gap-2 cursor-pointer"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <p className="font-medium hidden lg:block">{user.firstName}</p>
            <svg
              className="hidden lg:block"
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
            <div className="w-11 h-11 rounded-full overflow-hidden">
              <Image
                src={user.image ? apiUrl + user.image : profileDemo}
                alt="user"
                width={44}
                height={44}
                className="rounded-full w-full h-full select-none object-cover"
              />
            </div>
            {isOpen ? (
              <ul
                ref={containerRef}
                className="absolute bg-gray-200 rounded-sm py-2 top-[66px] lg:top-[74px] right-0 cursor-default flex flex-col z-10 text-black max-w-72 w-full shadow-xl divide-y-[0.2px] divide-emerald-400"
              >
                <li
                  className="py-4 px-4 hover:text-green-500 hover:bg-gray-100 cursor-pointer flex justify-start items-center whitespace-pre gap-4 text-lg font-medium"
                  onClick={() => router.push("/profile")}
                >
                  <div className="bg-gray-300 p-2 rounded-full">
                    <LuUserCheck2 size={22} />
                  </div>
                  <div className="flex flex-col">
                    <span>
                      {user.firstName} {user.lastName}
                    </span>
                    <span className="text-sm font-normal text-gray-500">
                      {user.email}
                    </span>
                  </div>
                </li>
                <li
                  className="py-4 px-4 hover:text-green-500 hover:bg-gray-100 cursor-pointer flex justify-start items-center whitespace-pre gap-4 text-lg font-medium border-b"
                  onClick={() =>
                    router.push(`/change-password?id=${user.id}&from=nav`)
                  }
                >
                  <div className="bg-gray-300 p-2 rounded-full">
                    <BsKey size={22} />
                  </div>
                  Change Password
                </li>
                <li
                  className="py-4 px-4 text-red-500 hover:bg-gray-100 cursor-pointer flex justify-start items-center gap-4 text-lg font-medium border-b"
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
                        dispatch(logout());
                        Cookies.remove("token");
                        router.push("/");
                      }
                    })
                  }
                >
                  <div className="bg-red-200 p-2 rounded-full">
                    <MdOutlineLogout size={22} />
                  </div>
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
            className="flex items-center gap-2 rounded-t-[3px] border-[.5px] border-b-2 py-2 px-3 bg-mastard-500"
          >
            Login{" "}
          </Link>
          <Link
            href="/register?provider=true"
            className="flex items-center gap-2 rounded-t-[3px] border-[.5px] border-b-2 py-2 px-3  bg-mastard-500"
          >
            <span className="lg:block hidden">Join as a Professional</span>
            <span className="lg:hidden block">Join</span>
          </Link>
        </div>
      )}
    </nav>
    <nav className="select-none  items-center justify-between lg:px-10 lg:py-[12px] px-2 py-2 fixed z-30 w-full bg-slate-100 shadow-lg lg:hidden">
      
      <div className="flex items-center justify-between">
        <Link href="/">
        <Image
          src="/LOGO.png"
          alt="logo"
          className="w-28 lg:w-40"
          width={200}
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
                  <></>
                ) : (
                  // <Link
                  //   href="/dashboard"
                  //   className="font-medium hover:text-green-400 transition-all lg:block hidden"
                  // >
                  //   Dashboard
                  // </Link>
                  <Link
                    href="/register-business"
                    className="flex items-center gap-2 rounded-t-[3px] border-[.5px] border-b-2 py-2 px-3 text-green-600 bg-mastard-500"
                  >
                    <span className="lg:block hidden">
                      Business Registration
                    </span>
                    <span className="lg:hidden block">Join</span>
                  </Link>
                )}
              </>
            ) : (
              <>
                {/* <Link
                  href="/jobs"
                  className="font-medium hover:text-green-400 transition-all lg:block hidden"
                >
                  Jobs
                </Link>
                <Link
                  href="/add-bit-wallet"
                  className="font-medium hover:text-green-400 transition-all lg:block hidden"
                >
                  Bid
                </Link> */}
              </>
            )}
          </ul>
          <div
            className="flex items-center justify-center gap-2 cursor-pointer"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <p className="font-medium hidden lg:block">{user.firstName}</p>
            <svg
              className="hidden lg:block"
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
            <div className="w-11 h-11 rounded-full overflow-hidden">
              <Image
                src={user.image ? apiUrl + user.image : profileDemo}
                alt="user"
                width={44}
                height={44}
                className="rounded-full w-full h-full select-none object-cover"
              />
            </div>
            {isOpen ? (
              <ul
                ref={containerRef}
                className="absolute bg-gray-200 rounded-sm py-2 top-[66px] lg:top-[74px] right-0 cursor-default flex flex-col z-10 text-black max-w-72 w-full shadow-xl divide-y-[0.2px] divide-emerald-400"
              >
                <li
                  className="py-4 px-4 hover:text-green-500 hover:bg-gray-100 cursor-pointer flex justify-start items-center whitespace-pre gap-4 text-lg font-medium"
                  onClick={() => router.push("/profile")}
                >
                  <div className="bg-gray-300 p-2 rounded-full">
                    <LuUserCheck2 size={22} />
                  </div>
                  <div className="flex flex-col">
                    <span>
                      {user.firstName} {user.lastName}
                    </span>
                    <span className="text-sm font-normal text-gray-500">
                      {user.email}
                    </span>
                  </div>
                </li>
                <li
                  className="py-4 px-4 hover:text-green-500 hover:bg-gray-100 cursor-pointer flex justify-start items-center whitespace-pre gap-4 text-lg font-medium border-b"
                  onClick={() =>
                    router.push(`/change-password?id=${user.id}&from=nav`)
                  }
                >
                  <div className="bg-gray-300 p-2 rounded-full">
                    <BsKey size={22} />
                  </div>
                  Change Password
                </li>
                <li
                  className="py-4 px-4 text-red-500 hover:bg-gray-100 cursor-pointer flex justify-start items-center gap-4 text-lg font-medium border-b"
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
                        dispatch(logout());
                        Cookies.remove("token");
                        router.push("/");
                      }
                    })
                  }
                >
                  <div className="bg-red-200 p-2 rounded-full">
                    <MdOutlineLogout size={22} />
                  </div>
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
            className="flex items-center gap-2 rounded-t-[3px] border-[.5px] border-b-2 py-2 px-3 bg-mastard-500"
          >
            Login{" "}
          </Link>
          <Link
            href="/register?provider=true"
            className="flex items-center gap-2 rounded-t-[3px] border-[.5px] border-b-2 py-2 px-3  bg-mastard-500"
          >
            <span className="lg:block hidden">Join as a Professional</span>
            <span className="lg:hidden block">Join</span>
          </Link>
        </div>
      )}
      </div>
      <div className="flex items-center justify-between gap-2 mt-4">
      <div className="group">
        <button className="lg:font-medium text-sm lg:text-base">
          For Customers{" "}
          <RiArrowDownSLine
            size={19}
            className="text-gray-300 group-hover:text-gray-400 mt-0.5 inline-block transition-all"
          />
        </button>
        <div className="hidden group-hover:block absolute z-50 pt-5 lg:pt-6">
          <div className="flex flex-col items-start gap-0.5 bg-white px-4 py-4 min-w-[150px] w-fit rounded shadow">
            <Link
              href="/add-bit-wallet"
              className="hover:text-blue-800 transition-all w-full py-1.5"
            >
              Bid
            </Link>
          </div>
        </div>
      </div>
      <div
        className=" group"
        // onClick={() => setIsOpen((prev) => !prev)}
      >
        <button className="text-sm lg:text-base lg:font-medium">
          For Service Provider{" "}
          <RiArrowDownSLine
            size={19}
            className="text-gray-300 group-hover:text-gray-400 mt-0.5 inline-block transition-all"
          />
        </button>
        <div className="hidden group-hover:block absolute z-50 pt-6">
          <div className="flex flex-col items-start gap-0.5 bg-white px-4 py-4 min-w-[150px] w-fit rounded shadow">
            {[
              { name: "Dashboard", path: "/dashboard" },
              { name: "Plans", path: "/dashboard/upgrade-plane" },
            ].map((item, index) => (
              <Link
                key={index}
                href={item.path}
                className="hover:text-blue-800 transition-all w-full py-1.5"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Link href="/jobs">
        Search Jobs
      </Link>
      <Link href="/referral">
        Referral
      </Link>
      </div>
    </nav>
    </>
  );
}
