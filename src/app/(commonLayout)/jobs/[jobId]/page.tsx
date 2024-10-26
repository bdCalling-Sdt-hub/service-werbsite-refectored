import { TUniObject } from "@/types";
import React from "react";

const Page = ({ params }: { params: TUniObject }) => {
  const { jobId } = params;
  return <div className="min-h-[90vh]">Page : {jobId}</div>;
};

export default Page;
