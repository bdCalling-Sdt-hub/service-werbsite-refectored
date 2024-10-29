"use client";

import React, { use, useState } from "react";
import { TUniObject } from "@/types";
import { useGetApplicationByJobIdQuery } from "@/redux/features/jobs/jobsApi";
import LoaderWraperComp from "@/components/LoaderWraperComp";
import PageHeading from "@/components/PageHeading";
import Pagination from "@/components/Pagination";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
if (!apiUrl) throw new Error("API URL is not defined");

const ApplicationList = ({ params }: { params: TUniObject }) => {
  const { jobId } = params;
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, isError } = useGetApplicationByJobIdQuery(jobId, {
    skip: !jobId,
  });
  //   console.log(data);
  return (
    <div className="min-h-[85vh] pt-1">
      <div className="px-[32px] py-[32px] border-b border-[#b7b6b6c9]">
        <PageHeading title={"Application list"} backPath="/dashboard" />
      </div>
      <div className="max-w-full overflow-x-hidden mt-4">
        <div className="w-[600px] lg:w-full">
          <div className="grid grid-cols-12 gap-3 px-4 lg:px-10 py-3 bg-green-200 font-medium text-start">
            <p className="col-span-2">#SI</p>
            <p className="col-span-2 ">Date</p>
            <p className="col-span-2">Applicant/User</p>
            <p className="col-span-2">Email</p>
            <p className="col-span-2">Phone</p>
            <p className="col-span-2 text-center">Rsume/CV</p>
          </div>
          <LoaderWraperComp
            isLoading={isLoading}
            isError={isError}
            dataEmpty={data?.data?.length < 1}
            height="h-[80vh]"
          >
            {data?.data.map((item: any, index: number) => (
              <div
                key={index}
                className={`grid grid-cols-12 gap-3 px-4 lg:px-10 py-5 ${
                  index % 2 !== 0 && " bg-gray-50"
                }`}
              >
                <p className="col-span-2">
                  {index < 10 ? "0" + ++index : ++index}
                </p>
                <p className="col-span-2">
                  {new Date(item.createdAt).toLocaleString()}
                </p>
                <p className="col-span-2">
                  {item.user?.firstName} {item.user?.lastName}
                </p>
                <p className="col-span-2">{item.user.email || "N/A"}</p>
                <p className="col-span-2">{item.user.mobile || "N/A"}</p>
                <div className="col-span-2 text-center flex justify-center gap-2 items-center">
                  {/* <button className="text-blue-500 hover:text-blue-700 hover:bg-gray-100 rounded-lg outline-none px-3 py-1 hover:underline">
                    View
                  </button> */}
                  <a
                    href={apiUrl + item.resume}
                    // target="_blank"
                    className="text-blue-500 hover:text-blue-700 hover:bg-gray-100 rounded-lg outline-none px-3 py-1 hover:underline"
                  >
                    View
                  </a>
                </div>
              </div>
            ))}
          </LoaderWraperComp>
        </div>
        <div className="flex justify-center mt-4">
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={
              data?.pagination?.totalPage > 1 ? data?.pagination?.totalPage : 0
            }
          />
        </div>
      </div>
    </div>
  );
};

export default ApplicationList;
