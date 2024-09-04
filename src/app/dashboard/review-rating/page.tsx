"use client";

import React from "react";
import ReviewCart from "@/components/business/ReviewCart";
import LoaderWraperComp from "@/components/LoaderWraperComp";
import { useGetReviewQuery } from "@/redux/features/review/reviewApi";
import { useAppSelector } from "@/redux/hooks";
import PageHeading from "@/components/PageHeading";

const ReviewRating = () => {
  const { user, isLoading } = useAppSelector((state) => state.auth);
  const {
    data,
    isLoading: reviewLoading,
    isError: reviewError,
  } = useGetReviewQuery(
    [
      {
        name: "businessId",
        value: user?.business?.id,
      },
    ],
    { skip: !user?.business?.id }
  );
  return (
    <div className="min-h-[80vh]">
      <div className="px-[32px] py-[32px] border-b border-[#b7b6b6c9]">
        <PageHeading title={"Your business review"} backPath="/dashboard" />
      </div>
      {/* <h2 className="font-medium text-xl my-5"></h2> */}
      <LoaderWraperComp
        isError={reviewError}
        isLoading={reviewLoading || isLoading}
        dataEmpty={data?.data?.reviews?.length < 1}
        height="h-[80vh]"
      >
        <div className="flex flex-col gap-6 space-y-[12px] px-4 py-8 lg:px-8 lg:py-10">
          {data?.data?.reviews.map((review: any, index: number) => (
            <ReviewCart key={index} reviewData={review} />
          ))}
        </div>
      </LoaderWraperComp>
    </div>
  );
};

export default ReviewRating;
