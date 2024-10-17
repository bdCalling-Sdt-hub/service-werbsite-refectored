import SubscriptionCard from "@/components/SubscriptionCard";
import Cookies from "js-cookie";
import React from "react";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
if (!apiUrl) throw new Error("API URL is not defined");

const UpgradePlane = async () => {
  const res = await fetch(`${apiUrl}subscriptions?limit=100`, {
    cache: "no-store",
  });
  const { data: subscriptionData } = await res.json();

  const currentSubscriptionResponse = await fetch(
    `${apiUrl}subscriptions/current`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    }
  );

  const { data: currentSubscriptionData } =
    await currentSubscriptionResponse.json();

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
              <SubscriptionCard
                key={index}
                data={plan}
                currentSubscriptionId={currentSubscriptionData?.data?.id}
              />
            )
          )}
        </div>
      </section>
    </div>
  );
};

export default UpgradePlane;
