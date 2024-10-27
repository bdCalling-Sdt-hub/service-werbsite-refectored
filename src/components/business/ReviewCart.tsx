import React from "react";
import generateStars from "./generateStar";
import Image from "next/image";
import profileLogo from "@/assets/images/profile-demo.jpg";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
if (!apiUrl) throw new Error("API URL is not defined");

export default function ReviewCart({ reviewData }: any) {
  return (
    <div className="rounded p-4 lg:p-6 flex justify-start gap-4 border">
      <div className="min-w-[50px] w-[60px] lg:min-w-[70px] lg:w-[70px] h-[50px] lg:h-[70px] border border-blue-500/10 rounded-full">
        <Image
          src={
            reviewData?.user?.image
              ? apiUrl + reviewData?.user?.image
              : profileLogo
          }
          alt={"review"}
          className="rounded-full h-full w-full object-cover"
          width={100}
          height={100}
          priority
        />
      </div>
      <div className="space-y-2">
        <h5 className="text-lg lg:text-xl font-medium">
          {reviewData?.user?.firstName} {" "}
          {reviewData?.user?.lastName}
        </h5>
        <div className="flex items-center gap-1 pb-2">
          {generateStars(reviewData?.rating)}
        </div>
        <p className="text-gray-600">{reviewData?.message}</p>
      </div>
    </div>
  );
}
