"use client";
import { TSideItem } from "@/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { createElement, ReactNode, useState } from "react";
import { FaUserTie } from "react-icons/fa";
import { FaCloudArrowUp, FaMoneyBillTrendUp } from "react-icons/fa6";
import { GrMoney } from "react-icons/gr";
import { HiMenuAlt3, HiOutlineSpeakerphone } from "react-icons/hi";
import { IoMdArrowDropdown, IoMdNotificationsOutline } from "react-icons/io";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { MdCurrencyBitcoin, MdPreview } from "react-icons/md";
import { RiDashboard2Line } from "react-icons/ri";

export const sidevarMenus: TSideItem[] = [
  {
    name: "Business Information",
    icon: RiDashboard2Line,
    path: "/dashboard",
  },
  {
    name: "Portfolios",
    icon: FaUserTie,
    path: "/dashboard/portfolios",
  },
  {
    name: "Notification",
    icon: IoMdNotificationsOutline,
    path: "/dashboard/notification",
  },
  {
    name: "Review & Rating",
    icon: MdPreview,
    path: "/dashboard/review-rating",
  },
  {
    name: "Upgrade Plan",
    icon: FaCloudArrowUp,
    path: "/dashboard/upgrade-plane",
  },
  {
    name: "Job Posts",
    icon: HiOutlineSpeakerphone,
    path: "/dashboard/job-posts",
  },
  {
    name: "Bids from Customers",
    icon: MdCurrencyBitcoin,
    path: "/dashboard/bits",
  },
  {
    name: "Promotion",
    icon: IoShieldCheckmarkOutline,
    path: "/dashboard/promotion",
  },
  {
    name: "Account",
    icon: GrMoney,
    path: "/dashboard/account",
  },
];

const ResponsiveSidebar = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [toggle, setToggle] = useState<{ [key: string]: string }>({});
  const pathname = usePathname();
  const hangleSidebar = () => {
    setOpenDrawer(!openDrawer);
    setToggle({});
  };

  return (
    <div className="">
      {/* main content overlay */}
      {openDrawer && (
        <div
          onClick={hangleSidebar}
          className="fixed inset-0 z-20 w-full min-h-screen bg-[#13131ac0]"
        />
      )}
      <div
        className={`pt-24 bg-green-900 h-screen fixed left-0 top-0 z-20 duration-300 lg:px-[24px] ${
          openDrawer ? "w-[280px]" : "w-[60px]"
        } lg:w-[326px]`}
      >
        <div className="flex justify-end">
          <button
            className="lg:hidden cursor-pointer active:bg-gray-600 rounded outline-none text-white"
            onClick={hangleSidebar}
          >
            <HiMenuAlt3 size={27} />
          </button>
        </div>
        <div className="w-full flex flex-col gap-y-1 mt-4 relative">
          {sidevarMenus.map(({ childrens, name, icon, path }, index) => (
            <div
              key={index}
              className={`lg:text-lg font-medium rounded select-none relative lg:overflow-hidden`}
            >
              <div
                onClick={() => {
                  setToggle({
                    [name]: toggle[name] === name ? "" : name,
                    pathName: path,
                  });
                }}
              >
                <Link href={childrens ? childrens[0].subPath : path}>
                  <div
                    className={`flex items-center gap-3 py-3 lg:py-4 px-5 lg:px-7 hover:bg-white hover:text-green-900 transition-all group ${
                      pathname === path
                        ? " bg-white text-primary"
                        : " text-white"
                    }`}
                  >
                    <div>{createElement(icon, { size: "20" })}</div>
                    <h2
                      className={`whitespace-pre transition-all ${
                        !openDrawer
                          ? "translate-x-28 lg:translate-x-0 overflow-hidden"
                          : "translate-x-0 overflow-hidden"
                      } `}
                    >
                      {name}
                    </h2>
                    {childrens && (
                      <IoMdArrowDropdown
                        size={21}
                        className={`ml-auto text-lg mt-[2px] ${
                          toggle[name] !== name && "-rotate-90"
                        }`}
                      />
                    )}
                    {!openDrawer && (
                      <h2
                        className={`
                              lg:hidden absolute left-48 bg-gray-50 font-sans whitespace-pre z-30
                           text-gray-900 rounded-md drop-shadow-md px-0 py-0 w-0 overflow-hidden group-hover:px-2 
                            group-hover:py-1 group-hover:left-16 group-hover:w-fit group-hover:duration-500`}
                      >
                        {name}
                      </h2>
                    )}
                  </div>
                </Link>
              </div>
              {childrens && toggle[name] && (
                <div
                  className={`bg-blue-100 py-1 text-gray-700 space-y-1.5 text-base ${
                    openDrawer
                      ? "shadow-xl relative lg:relative "
                      : " absolute lg:relative left-16 lg:left-0 top-0.5 "
                  }`}
                >
                  {childrens.map((child, i) => (
                    <Link
                      key={i}
                      href={child.subPath}
                      className={`flex items-center gap-3 px-4 py-1 hover:bg-green-500 hover:text-white 
                          ${
                            pathname === child.subPath &&
                            " bg-green-500 text-white"
                          }`}
                    >
                      <div>{createElement(child.subIcon, { size: "20" })}</div>
                      <h2 className={`whitespace-pre`}>{child.subName}</h2>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResponsiveSidebar;
