import BitCard from "@/components/BitCard";
import PageHeading from "@/components/PageHeading";
import { cookies } from "next/headers";
import React from "react";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
if (!apiUrl) throw new Error("API URL is not defined");

const Bits = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;
  const res = await fetch(`${apiUrl}bits?limit=100`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    method: "GET",
    cache: "no-store",
  });
  if (!res.ok) {
    return <div>Something went wrong</div>;
  }
  
  const { data } = await res.json();

  return (
    <div className="min-h-screen">
      <div className="px-[32px] py-[32px] border-b border-[#b7b6b6c9]">
        <PageHeading title={"All Bits"} backPath="/dashboard" />
      </div>
      <section className="lg:px-8 lg:py-4 px-2 py-3 min-h-screen">
        {data.map((bit: any, index: number) => (
          <BitCard key={index} data={bit} />
        ))}
      </section>
    </div>
  );
};

export default Bits;
