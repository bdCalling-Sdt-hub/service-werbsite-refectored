import React from "react";
import Image from "next/image";
import profileDemo from "../../assets/images/profile-demo.jpg";
import Link from "next/link";
import { TUniObject } from "@/types";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/features/users/authSlice";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
if (!apiUrl) throw new Error("API URL is not defined");

const JobCard = ({ job }: { job: TUniObject }) => {
  const { user } = useAppSelector(selectCurrentUser);
//   console.log(user);
  return (
    <div className="my-8 p-6 border space-y-5 hover:bg-gray-50 hover:shadow transition-all">
      {user?.type === "PROVIDER" ? (
        <div className="space-y-3 flex-1">
          <div className="flex justify-between gap-4">
            <h1 className="text-2xl font-semibold">{job?.title}</h1>
            <p className="text-sm">
              {new Date(job.createdAt).toLocaleString()}
            </p>
          </div>
          <div
            className="text-gray-800"
            dangerouslySetInnerHTML={{ __html: job?.description }}
          />
        </div>
      ) : (
        <>
          <div className="flex justify-start gap-4">
            <div className="max-w-20 w-full h-full overflow-hidden">
              <Image
                src={
                  job.business?.user?.image
                    ? apiUrl + "/" + job.business?.user?.image
                    : profileDemo
                }
                width={500}
                height={500}
                className="w-full h-full object-cover rounded"
                alt=""
              />
            </div>
            <div className="flex-1 space-y-3  mt-3.5">
              <div className="flex justify-between gap-4">
                <p className="font-semibold">{job.business?.name || "N/A"} </p>
                <p className="text-sm">
                  {new Date(job.createdAt).toLocaleString()}
                </p>
              </div>
              <p className="">{job.business?.address || "N/A"} </p>
            </div>
          </div>
          <div className="flex justify-start gap-4">
            <div className={`max-w-20 w-full h-full`}></div>
            <div className="space-y-3 flex-1">
              <h1 className="text-2xl font-semibold">{job?.title}</h1>
              <div
                className="text-gray-800"
                dangerouslySetInnerHTML={{ __html: job?.description }}
              />
              <div className="pt-5">
                <Link href={`/jobs/${job?.id}`}>
                  <button className=" bg-green-500 active:bg-green-600 disabled:cursor-not-allowed w-40 px-8 py-3 text-white rounded-md font-light outline-non disabled:bg-green-500 flex justify-center items-center gap-2">
                    Apply Now
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default JobCard;
