import { useEffect, useState } from "react";
import generateStars from "./generateStar";
import ReviewCart from "./ReviewCart";
import { TBusiness } from "@/redux/features/users/authSlice";
import { useGetReviewQuery } from "@/redux/features/review/reviewApi";
import LoaderWraperComp from "../LoaderWraperComp";

function Review({
  businesDetails,
  isLoading,
  isError,
}: {
  businesDetails: TBusiness;
  isLoading: boolean;
  isError: boolean;
}) {
  const [page, setPage] = useState<number | null>(1);
  const {
    data,
    isLoading: reviewLoading,
    isError: reviewError,
  } = useGetReviewQuery(
    [
      {
        name: "businessId",
        value: businesDetails?.id,
      },
    ],
    { skip: !businesDetails?.id }
  );
  return (
    <LoaderWraperComp
      isError={isError || reviewError}
      isLoading={isLoading || reviewLoading}
    >
      <div className="flex flex-col-reverse lg:flex-row">
        <div className="pt-5 pr-8 ">
          <p className="font-medium text-xl ">
            {data?.pagination?.totalData || 0} Customer review
          </p>
          <div>
            {data?.data?.ratings?.map((rate: any, indx: number) => (
              <div key={indx} className="flex items-center my-4">
                {generateStars(rate.star || 0)}
                <span className="ml-2">
                  [{isNaN(rate?.total) ? 0 : rate?.total}]
                </span>
              </div>
            ))}
          </div>
          {/* <BusinessContact email="sadf" number="sdfl"/> */}
        </div>
        {/* <ul className="py-5 lg:pl-8 lg:border-l border-b-2 lg:border-b-0 hidden lg:flex flex-col gap-3">
            {[1, 2, 3, 4, 5].map((count, index) => (
              <li key={index} className="flex gap-2 text-lg items-center">
                {count}
                <div className="flex items-center gap-1">
                  {generateStars(count).map((star, index) => (
                    <span key={index}>{star}</span>
                  ))}
                </div>
                (20)
              </li>
            ))}
          </ul> */}
      </div>
      <h2 className="font-medium text-xl my-5">Top Review</h2>
      <div className="flex flex-col gap-6">
        {data?.data?.reviews?.length === 0 && (
          <h2 className="text-2xl font-medium text-center">No review found</h2>
        )}
        {data?.data?.reviews.map((review: any, index: number) => (
          <ReviewCart key={index} reviewData={review} />
        ))}
      </div>
    </LoaderWraperComp>
  );
}

export default Review;
