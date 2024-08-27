
import Image from "next/image";
import React from "react";
import businessLogo from "@/assets/images/profile-demo.jpg";
import { IoIosNotificationsOutline } from "react-icons/io";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
if (!apiUrl) throw new Error("API URL is not defined");

const NotificationCart = ({ data, index }: { data: { [key: string]: any }, index: number }) => {
//   console.log(data);
  return (
    <div className={`flex items-center justify-start gap-4 px-[24px] py-[8px] cursor-pointer hover:shadow-md ${index !== 0 && "hover:border-t border-gray-50"} duration-300` }>
      <div className="w-[70px] h-[70px] relative">
        <Image
          src={data.user?.image ? apiUrl + data?.user?.image : businessLogo}
          alt={data.name}
          className="rounded-full w-full h-full border p-0.5 content-evenly "
          width={150}
          height={150}
          priority
        />
        {/* {data.user?.image ? (
        ) : (
          <IoIosNotificationsOutline
            style={{ cursor: "pointer" }}
            className={`text-green-300 bg-playground w-[60px] h-[60px] rounded-lg p-2 shadow-sm transition-all`}
          />
        )} */}
      </div>
      <div className="space-y-2">
        <h6 className="text-[#181414] ">
          You have received{" "}
          <span className="font-medium">{data.message}</span> from{" "}
          {data?.user?.firstName}.
        </h6>
        <div className="flex items-center gap-0.5">
          <small className="text-[12px] text-lightgreen">{new Date(data?.createdAt).toLocaleString()}</small>
          <IoIosNotificationsOutline className={`text-green-300`} size={13} />
        </div>
      </div>
    </div>
  );
};

export default NotificationCart;
