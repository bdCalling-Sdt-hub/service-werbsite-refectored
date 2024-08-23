import { useEffect, useState } from "react";
import generateStars from "./generateStar";
import ReviewCart from "./ReviewCart";

function Review({ providerId }: { providerId: string }) {
    const [reviews, setReviews] = useState<any[]>([]);
    useEffect(() => {
    //   findReviewsByProviderId(providerId).then((res) => {
    //     if (res.data) {
    //       setReviews(res.data);
    //     }
    //   });
    }, [providerId]);
  
    const totalRating =
      reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
  
    return (
      <div>
        <div className="flex flex-col-reverse lg:flex-row">
          <div className="pt-5 pr-8 ">
            {/* <p className="font-medium text-xl ">Reviews ({reviews.length})</p> */}
            <p className="font-medium text-xl ">
              {reviews.length} Customer review
            </p>
            <div className="flex items-center my-4">
              {generateStars(totalRating).map((star, index) => (
                <span key={index}>{star}</span>
              ))}
              <span className="ml-2">
                ({isNaN(totalRating) ? 0 : totalRating}/5)
              </span>
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
        <div className="flex flex-col gap-8">
          {reviews.length === 0 && (
            <h2 className="text-2xl font-medium text-center">No review found</h2>
          )}
          {reviews.map((review, index) => (
            <ReviewCart
              key={index}
              date={review.createdAt}
              location={review.location}
              name={review.name}
              rating={review.rating}
              review={review.review}
            />
          ))}
        </div>
      </div>
    );
  }