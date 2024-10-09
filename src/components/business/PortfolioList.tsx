import { useEffect, useState } from "react";
import PortfolioCart from "../Portfolios/PortfolioCart";
import LoaderWraperComp from "../LoaderWraperComp";
import { useGetPortfoliosQuery } from "@/redux/features/portfolio/portfolioApi";

function PortfolioList({ businessId }: { businessId: string }) {
  const { data, isLoading, isError } = useGetPortfoliosQuery(businessId, {
    skip: !businessId,
  });
  if (data?.data?.length === 0)
    return (
      <h2 className="text-2xl font-medium text-center mt-4">
        No portfolio found
      </h2>
    );

  return (
    <LoaderWraperComp isError={isError} isLoading={isLoading}>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
        {data?.data.map(
          (portfolio: { [key: string]: string }, indx: number) => (
            <PortfolioCart key={indx} provider data={portfolio} />
          )
        )}
      </div>
    </LoaderWraperComp>
  );
}

export default PortfolioList;
