"use client";

import PageHeading from "@/components/PageHeading";
import { useGetReferralsQuery } from "@/redux/features/referral/referallApi";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
if (!apiUrl) throw new Error("API URL is not defined");

export default function Page() {
  const {data, isLoading, isError} = useGetReferralsQuery([
    // {
    //   name: "page",
    //   value: 1,
    // }
  ]);
  console.log(data)
  return (
    <div className="min-h-screen">
      <div className="bg-grayground min-h-[82vh] rounded-lg">
        <div className="px-[32px] py-[32px] border-b border-[#b7b6b6c9]">
          <PageHeading title={"Referrals"} backPath="/dashboard" />
        </div>
      </div>
    </div>
  );
}
