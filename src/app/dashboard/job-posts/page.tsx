import React from "react";
import AddNewButton from "@/components/AddNewButton";
import JobList from "@/components/Jobs/JobList";
import PageHeading from "@/components/PageHeading";

const Page = () => {
  return (
    <div className="min-h-[90vh]">
      <div className="px-[32px] py-[32px] border-b border-[#b7b6b6c9] flex justify-between items-center">
        <PageHeading title={"Job Posts"} backPath="/dashboard" />
        <AddNewButton target="job-posts/add-new" />
      </div>
      <JobList />
    </div>
  );
};

export default Page;
