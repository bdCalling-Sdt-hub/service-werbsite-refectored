import React, { useState } from "react";
import Bu from "./Button";
import { FaCheck } from "react-icons/fa";
import { IoMdCheckmark } from "react-icons/io";

const SubscriptionCard = ({ data }: { data: { [key: string]: any } }) => {
  // console.log(data);
  return (
    <div className="rounded-3xl p-9 bg-white items-start text-start lg:w-[387px] lg:min-h-[400px] flex flex-col justify-between gap-5">
      <div className="space-y-5">
        <h5 className="text-3xl text-black-500">{data.name}</h5>
        <ul className="flex flex-col gap-6">
          {data?.benefits?.map((feature: any, index: any) => (
            <li key={index} className={`flex items-center gap-2`}>
              <IoMdCheckmark size={20} /> {feature}
            </li>
          ))}
        </ul>
        {/* <p className="text-gray-400 font-sans">
          Mimum need {data.minimumStart} stars
        </p> */}
      </div>
      <div className="w-full space-y-5">
        <p className="text-black-200">
          <span className="text-3xl font-bold text-black-500">
            ${data.price}
          </span>
          /Month
        </p>
        <Bu id={data?.id} minimumStar={data.minimumStart} />
      </div>
    </div>
  );
};

export default SubscriptionCard;
