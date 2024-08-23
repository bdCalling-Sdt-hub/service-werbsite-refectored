"use client";
import React from "react";
import { useRouter } from "next/navigation";
import PortfolioCart from "@/components/Portfolios/PortfolioCart";
import { useGetPortfoliosQuery } from "@/redux/features/portfolio/portfolioApi";
import { useAppSelector } from "@/redux/hooks";
import { BsFillCloudPlusFill } from "react-icons/bs";
import LoaderWraperComp from "@/components/LoaderWraperComp";

export default function Page() {
  const router = useRouter();
  const { user, isLoading: userLoading } = useAppSelector(
    (state) => state.auth
  );
  const { data, isLoading, isError } = useGetPortfoliosQuery(
    user?.business?.id,
    { skip: !user?.business?.id }
  );
  // console.log({ data, isLoading, isError } )
  return (
    <section className="min-h-screen px-4 py-8 lg:px-8 lg:py-10">
      <h1 className="text-black-500 text-2xl font-medium mb-8">My Portfolio</h1>
      <LoaderWraperComp isError={isError} isLoading={isLoading || userLoading}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  2xl:grid-cols-6 gap-6">
          {data?.data.map(
            (portfolio: { [key: string]: string }, indx: number) => (
              <PortfolioCart key={indx} provider data={portfolio} />
            )
          )}
          <button
            className="w-full bg-green-500 rounded-md flex flex-col items-center justify-center text-white h-[275px] gap-2"
            onClick={() => router.push("portfolios/add-portfolio")}
          >
            <BsFillCloudPlusFill size={34} />
            Add New
          </button>
        </div>
      </LoaderWraperComp>
    </section>
  );
}
