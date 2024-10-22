import SubscriptionCard from "@/components/SubscriptionCard";
import React, { cache } from "react";
import { cookies } from 'next/headers';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
if (!apiUrl) throw new Error("API URL is not defined");

const UpgradePlane = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value;
  const res = await fetch(`${apiUrl}subscriptions?limit=100`, {
    cache: "no-store",
  });
  const { data: subscriptionData } = await res.json();
  const starRes = await fetch(`${apiUrl}businesses/star`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      
    },
    method: "GET",
    cache: "no-store",
  });
  const { data: starData } = await starRes.json();
  // console.log(starData)
  return (
    <div className="bg-green-50 ">
      <section className="lg:px-36 lg:py-16 px-2 py-3 text-center min-h-screen">
        <h1 className="text-3xl font-semibold text-green-800">
          The Right Plan for Your Business
        </h1>
        <p className="text-black-500 mt-2">
          We have several powerful plans to showcase your business and get
          discovered
          <br />
          as a creative entrepreneurs. Everything you need.
        </p>
        <div className="flex flex-col lg:flex-row justify-center gap-4 mt-8">
          {subscriptionData?.map(
            (plan: { [key: string]: any }, index: number) => (
              <SubscriptionCard key={index} data={plan} starQty={starData.totalStar || 0} />
            )
          )}
        </div>
      </section>
    </div>
  );
};

export default UpgradePlane;
