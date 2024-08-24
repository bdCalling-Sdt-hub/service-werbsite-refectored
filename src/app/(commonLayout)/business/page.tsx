"use client";
import { useGetBunsinessQuery } from "@/redux/features/business/businessApi";
import React, { useEffect, useState } from "react";

export default function BusinessList({
  searchParams,
}: {
  searchParams: { service: string; suburb: string; postcode: string };
}) {
  const [business, setBusiness] = useState<{ [key: string]: any }[]>([]);
  const { data, isLoading, isError } = useGetBunsinessQuery([
    { name: "serviceId", value: searchParams.service },
    { name: "postalCode", value: searchParams.postcode },
    { name: "suburb", value: searchParams.suburb },
  ]);
  useEffect(() => {
    setBusiness(c=> ([...c, data?.data]))
  }, [data?.data]);

  if (!searchParams.service || !searchParams.postcode || !searchParams.suburb)
    return (
      <h2 className="text-2xl font-medium text-center">No services found</h2>
    );

  //   if (providers.length === 0)
  //     return (
  //       <h2 className="text-2xl font-medium text-center">No result found</h2>
  //     );

  return (
    <section className="flex flex-col gap-8 lg:px-36 lg:py-16 px-2 py-4">
      {/* {providers.map((service) => (
        <BusinessCart
          key={service._id.toString()}
          data={{
            id: service.userId._id.toString(),
            description: service.cleanAbout,
            image: service.userId.image,
            name: service.businessName,
            email: service.userId.email,
            mobile: service.userId.mobile,
            providerId: service._id.toString(),
          }}
        />
      ))} */}
      fdklfjdslk
    </section>
  );
}
