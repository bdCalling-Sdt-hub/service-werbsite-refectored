"use client";
import { useGetSingleBunsinessQuery } from "@/redux/features/business/businessApi";
import Image from "next/image";
import { useState, useEffect } from "react";
import cateLogo from "@/assets/images/cate-logo.png";
import BusinessDetails from "@/components/business/BusinessDetails";
import PortfolioList from "@/components/business/PortfolioList";
import Review from "@/components/business/Review";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
if (!apiUrl) throw new Error("API URL is not defined");

export default function Page({ params }: { params: { businessId: string } }) {
  const tabs = ["Business Details", "Portfolio", "Review"];
  const [activeTab, setActiveTab] = useState("Business Details");
  const { data, isLoading, isError } = useGetSingleBunsinessQuery(
    params.businessId,
    { skip: !params.businessId }
  );
  // console.log(params)
  // console.log(data, isLoading, isError);
  return (
    <section className="min-h-screen px-4 py-10 lg:px-[150px] lg:py-16 lg:grid grid-cols-12 gap-12 space-y-10 lg:space-y-0 relative">
      <div className="w-full col-span-3 text-center lg:sticky top-5">
        <div className="w-[200px] h-[200px] mx-auto shadow-inner border border-blue-500/10 rounded-full">
          <Image
            src={
              data?.data?.user?.image
                ? apiUrl + data?.data?.user?.image
                : cateLogo
            }
            alt={data?.data?.name}
            className="rounded-full h-full w-full object-cover"
            width={1000}
            height={1000}
            priority
          />
        </div>
        <h1 className="text-2xl font-bold mt-5">{data?.data.name}</h1>
      </div>
      <div className="w-full col-span-9 space-y-5 lg:space-y-6">
        <div className="relative">
          <div className="flex items-center justify-between lg:justify-normal font-medium lg:text-xl lg:gap-32 w-full px-2 lg:px-4">
            {tabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(tab)}
                className={`outline-none group`}
              >
                {tab}
                <div
                  className={`h-[2.5px] lg:h-[3.6px] group-hover:w-full mx-auto bg-green-600 delay-75 ease-in duration-100 group-hover:shadow-md mt-1 ${
                    tab === activeTab ? "w-full" : "w-0"
                  }`}
                />
              </button>
            ))}
          </div>
          <div className="w-full h-[3.2px] bg-[#E6F3EC] -mt-[3px] lg:-mt-[3px]" />
        </div>
        {
          {
            "Business Details": (
              <BusinessDetails
                businesDetails={data?.data}
                isLoading={isLoading}
                isError={isError}
              />
            ),
            Portfolio: <PortfolioList businessId={params.businessId} />,
            Review: (
              <Review
              businesDetails={data?.data}
              isLoading={isLoading}
              isError={isError}
              />
            ),
          }[activeTab]
        }
      </div>
    </section>
  );
}
