"use client";
import BusinessCart from "@/components/BusinessCart";
import { useGetBunsinessQuery } from "@/redux/features/business/businessApi";
import React, { useEffect, useState } from "react";

export default function BusinessList({
  searchParams,
}: {
  searchParams: { service: string; suburb: string; postcode: string };
}) {
  const [page, setPage] = useState<number | null>(1);
  const [business, setBusiness] = useState<{ [key: string]: any }[]>([]);
  if (!searchParams.service || !searchParams.postcode || !searchParams.suburb)
    return (
      <h2 className="text-2xl font-medium text-center">No services found</h2>
    );
  const { data, isLoading, isError } = useGetBunsinessQuery([
    { name: "serviceId", value: searchParams.service },
    { name: "postalCode", value: searchParams.postcode },
    { name: "suburb", value: searchParams.suburb },
    { name: "page", value: page },
  ]);
  useEffect(() => {
    if (data?.data) {
      setBusiness((c) => [...c, data?.data]);
      setPage(data.pagination.nextPage);
    }
  }, [data?.data]);
  return (
    <section className="flex flex-col gap-8 lg:px-36 lg:py-16 px-2 py-4">
      {business.map((busines, indx) => (
        <BusinessCart key={indx} data={busines} />
      ))}
      {page && (
        <button
          // onClick={business.}
          className="flex items-center gap-2 rounded-t-[3px] border-[.5px] border-b-2 py-3 px-5 border-white bg-green-600 text-white  mx-auto"
        >
          See more{" "}
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.75 16.25L16.25 3.75M16.25 3.75H6.875M16.25 3.75V13.125"
              stroke="#FFFFFF"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}
    </section>
  );
}
