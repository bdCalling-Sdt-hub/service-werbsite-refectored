"use client";

import BusinessCart from "@/components/BusinessCart";
import LoaderWraperComp from "@/components/LoaderWraperComp";
import React, { use, useEffect, useState } from "react";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
if (!apiUrl) throw new Error("API URL is not defined");

export default function BusinessList({
  searchParams,
}: {
  searchParams: { service: string; suburb: string; postcode: string };
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState<number | null>(null);
  const [business, setBusiness] = useState<{ [key: string]: any }[]>([]);

  useEffect(() => {
    fetch(
      `${apiUrl}businesses?serviceId=${searchParams.service}&postalCode=${searchParams.postcode}&suburb=${searchParams.suburb}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          setBusiness(data.data);
          setPage(data.pagination.nextPage);
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
      })
      .catch((e) => {
        setIsLoading(false);
        console.log(e);
      });
  }, []);
  const handleSeemore = async () => {
    try {
      const res = await fetch(
        `${apiUrl}businesses?serviceId=${searchParams.service}&postalCode=${searchParams.postcode}&suburb=${searchParams.suburb}&page=${page}`
      );
      const result = await res.json();
      if (result.data) {
        setBusiness([...business, ...result.data]);
        setPage(result.pagination.nextPage);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!searchParams.service || !searchParams.postcode || !searchParams.suburb)
    return (
      <h2 className="text-2xl font-medium text-center">No services found</h2>
    );
  return (
    <LoaderWraperComp isLoading={isLoading} isError={false} height='h-[80vh]' dataEmpty={!business.length}>
      <section className="flex flex-col gap-8 lg:px-36 lg:py-16 px-2 py-4 min-h-screen ">
        {business.map((singleBusines, indx) => (
          <BusinessCart key={indx} data={singleBusines} />
        ))}
        {page && (
          <button
            onClick={handleSeemore}
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
    </LoaderWraperComp>
  );
}
