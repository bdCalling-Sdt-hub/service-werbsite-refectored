"use client";

import BusinessCart from "@/components/BusinessCart";
import LoaderWraperComp from "@/components/LoaderWraperComp";
import React, { useEffect, useState } from "react";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
if (!apiUrl) throw new Error("API URL is not defined");

export default function BusinessList({
  searchParams,
}: {
  searchParams: {
    service: string;
    service_name: string;
    suburb: string;
    longitude: string;
    latitude: string;
  };
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [page, setPage] = useState<number | null>(null);
  const [business, setBusiness] = useState<{ [key: string]: any }[]>([]);

  useEffect(() => {
    fetch(
      `${apiUrl}businesses?serviceId=${searchParams.service}&longitude=${searchParams.longitude}&latitude=${searchParams.latitude}`
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log(data.ok);
        if (data.ok) {
          setBusiness(data.data);
          setPage(data.pagination.nextPage);
          setIsLoading(false);
        } else {
          setIsError(true);
          setIsLoading(false);
        }
      })
      .catch((e) => {
        setIsError(true);
        setIsLoading(false);
        // console.log(e);
      });
  }, []);
  
  const handleSeemore = async () => {
    try {
      const res = await fetch(
        `${apiUrl}businesses?serviceId=${searchParams.service}&page=${page}&longitude=${searchParams.longitude}&latitude=${searchParams.latitude}`
      );
      const result = await res.json();
      if (result.ok) {
        setBusiness([...business, ...result.data]);
        setPage(result.pagination.nextPage);
      } else {
        setIsError(true);
      }
    } catch (error) {
      setIsError(true);
      // console.log(error);
    }
  };

  // console.log(business);
  // if (!searchParams.service || !searchParams.suburb)
  //   return (
  //     <h2 className="text-2xl font-medium text-center">No services found</h2>
  //   );
  return (
    <div className="px-2 lg:px-36 py-4 lg:py-16 min-h-screen ">
      <h1 className="text-lg lg:text-2xl ">
        Search result for{" "}
        <span className="font-medium">{searchParams.service_name}</span> in{" "}
        <span className="font-medium">{searchParams.suburb}</span>.
      </h1>
      <LoaderWraperComp
        isLoading={isLoading}
        isError={isError}
        height="h-[80vh]"
        dataEmpty={business?.length < 1}
      >
        <section className="flex flex-col gap-8 mt-5">
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
    </div>
  );
}
