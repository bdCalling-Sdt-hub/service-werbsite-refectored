import { TBit } from "@/types";
import Image from "next/image";
import React from "react";
import profileDemo from "../assets/images/profile-demo.jpg";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
if (!apiUrl) throw new Error("API URL is not defined");

const BitCard = ({ data }: { data: TBit }) => {
  const { description, image, communicationPreference, user, service } = data;
  //   console.log(data);
  return (
    <div className="my-8 p-6 flex justify-start gap-4 hover:bg-gray-50 hover:shadow transition-all">
      <div className="max-w-20 w-full h-full overflow-hidden">
        <Image
          src={user.image ? apiUrl + "/" + user.image : profileDemo}
          width={500}
          height={500}
          className="w-full h-full object-cover rounded-full"
          alt=""
        />
      </div>
      <div className="flex-1 space-y-5 ">
        <div className="space-y-2">
          <div className="w-full flex justify-between gap-3">
            <p className="font-semibold">
              {user.firstName} {user?.lastName}
            </p>
            <p className="text-gray-600 text-sm">
              {new Date(data?.createdAt).toDateString()}
            </p>
          </div>
          <p>
            {communicationPreference === "call" ? "Phone" : "Email"} :
            {communicationPreference === "call" ? (
              <a href={`tel:+61${user.mobile}`} className="hover:text-blue-500">
                {" "}
                {user.mobile}
              </a>
            ) : (
              <a href={`mailto:${user.email}`} className="hover:text-blue-500">
                {" "}
                {user.email}
              </a>
            )}
          </p>
        </div>
        <div className="space-y-3">
          {/* <p>
            Service : <span className="text-gray-600">{service.name}</span>
          </p>
          <p>
            Created At :{" "}
            <span className="text-gray-600">
              {new Date(data.createdAt).toLocaleString()}
            </span>
          </p> */}
          <p>
            Description : <span className="text-gray-600">{description}</span>
          </p>
          {!!image && (
            <div className=" max-w-60 w-full h-full overflow-hidden">
              <Image
                src={apiUrl + "/" + image}
                width={500}
                height={500}
                className="w-full h-full object-cover"
                alt=""
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BitCard;
