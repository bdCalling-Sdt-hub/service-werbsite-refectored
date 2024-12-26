"use client";

import PageHeading from "@/components/PageHeading";
import { useGetReferralsQuery } from "@/redux/features/referral/referallApi";
import Image from "next/image";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
if (!apiUrl) throw new Error("API URL is not defined");

export default function Page() {
  const {
    data,
  }: {
    data?: {
      data: {
        id: string;
        userId: string;
        businessId: string;
        name: string;
        email: string;
        phone: string;
        createdAt: string;
        updatedAt: string;
        user: {
          lastName: string;
          firstName: string;
          image: string;
        };
      }[];
    };
  } = useGetReferralsQuery([
    // {
    //   name: "page",
    //   value: 1,
    // }
  ]);

  return (
    <div className="min-h-screen">
      <div className="bg-grayground min-h-[82vh] rounded-lg">
        <div className="px-[32px] py-[32px] border-b border-[#b7b6b6c9]">
          <PageHeading title={"Referrals"} backPath="/dashboard" />
        </div>
        <div className="p-10 flex flex-col gap-5">
          {data?.data.map(
            (
              { businessId, email, id, name, phone, userId, user, createdAt },
              index
            ) => (
              <div key={index} className="border-b border-gray-300 py-4">
                <div className="flex items-center gap-4">
                  <Image
                    src={user.image ? apiUrl + "/" + user.image : "/user.png"}
                    alt="User profile"
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-lg font-semibold">
                      {user.firstName} {user.lastName}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="mt-4 ml-14 p-4 border border-gray-300 rounded-lg bg-gray-50">
                  <h6 className="text-2xl font-medium text-gray-900 border-b pb-2 mb-3">
                    Referred Customer
                  </h6>
                  <p className="text-xl font-medium text-gray-800">{name}</p>
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Email:</span> {email}
                  </p>
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Phone:</span> {phone}
                  </p>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
