import AddNewButton from "@/components/AddNewButton";
import PageHeading from "@/components/PageHeading";
import React from "react";

const JobPosts = () => {
  return (
    <div className="min-h-[90vh]">
      <div className="px-[32px] py-[32px] border-b border-[#b7b6b6c9] flex justify-between items-center">
        <PageHeading title={"Job Posts"} backPath="/dashboard" />
        <AddNewButton target="job-posts/add-new" />
      </div>
    </div>
  );
};

export default JobPosts;
