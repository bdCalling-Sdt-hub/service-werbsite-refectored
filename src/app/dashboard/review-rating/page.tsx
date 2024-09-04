"use client";

import React from "react";
import ReviewCart from "@/components/business/ReviewCart";
import LoaderWraperComp from "@/components/LoaderWraperComp";
import { useGetReviewQuery } from "@/redux/features/review/reviewApi";
import { useAppSelector } from "@/redux/hooks";

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
    <div className="min-h-[80vh] px-4 py-10 lg:px-[150px] lg:py-16">
      <h2 className="font-medium text-xl my-5">Your business review</h2>
      <LoaderWraperComp
        isError={reviewError}
        isLoading={reviewLoading || isLoading}
        dataEmpty={data?.data?.length < 1}
        height="h-[80vh]"
      >
        <div className="flex flex-col gap-6">
          {data?.data?.reviews.map((review: any, index: number) => (
            <ReviewCart key={index} reviewData={review} />
          ))}
        </div>
      </LoaderWraperComp>
    </div>
  );
};

export default ReviewRating;
