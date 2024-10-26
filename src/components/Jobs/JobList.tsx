"use client";
import { useGetjobsQuery } from "@/redux/features/jobs/jobsApi";
import React, { useState } from "react";
import LoaderWraperComp from "../LoaderWraperComp";
import Pagination from "../Pagination";
import JobCard from "./JobCard";

const JobList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, isError } = useGetjobsQuery([
    {
      name: "limit",
      value: 15,
    },
    {
      name: "page",
      value: currentPage,
    },
    // {
    //   name: "businessId",
    //   value: "",
    // },
  ]);
  console.log(data);

  return (
    <LoaderWraperComp isLoading={isLoading} isError={isError}>
      <div className="px-[32px] py-[32px] space-y-6">
        {data?.data?.map((job: any, index: number) => (
          <JobCard job={job} key={index} />
        ))}
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
    </LoaderWraperComp>
  );
};

export default JobList;
