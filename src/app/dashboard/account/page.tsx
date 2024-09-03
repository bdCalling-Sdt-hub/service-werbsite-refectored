"use client";
import LoaderWraperComp from "@/components/LoaderWraperComp";
import PageHeading from "@/components/PageHeading";
import Pagination from "@/components/Pagination";
import { useGetPaymentsQuery } from "@/redux/features/payment/paymentApi";
import React, { useState } from "react";

const Account = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, isError } = useGetPaymentsQuery([
    {
      name: "limit",
      value: 15,
    },
    {
      name: "page",
      value: currentPage,
    },
  ]);

  console.log(data);
  return (
    <LoaderWraperComp isLoading={isLoading} isError={isError} height="h-[80vh]">
      <div className="min-h-[80vh] pt-1">
        <div className="px-[32px] py-[32px] border-b border-[#b7b6b6c9]">
          <PageHeading title={"Payments list"} backPath="/dashboard" />
        </div>
        <div className="max-w-full overflow-x-hidden">
          <div className="w-[600px] lg:w-full">
            <div className="grid grid-cols-12 gap-3 px-4 lg:px-10 py-3 bg-green-200 font-medium text-start">
              <p className="col-span-2">#SI</p>
              <p className="col-span-2">Subscription</p>
              <p className="col-span-2 text-center">Amount</p>
              <p className="col-span-3">Transaction Id</p>
              <p className="col-span-3 ">Date</p>
            </div>
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
                <p className="col-span-2">{item.subscription?.name}</p>
                <p className="col-span-2 text-center">$ {item.amount}</p>
                <p className="col-span-3 truncate">{item.transactionId}</p>
                <p className="col-span-3">{item.createdAt.split("T")[0]}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-4">
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={
                data?.pagination?.totalPage > 1
                  ? data?.pagination?.totalPage
                  : 0
              }
            />
          </div>
        </div>
      </div>
    </LoaderWraperComp>
  );
};

export default Account;
