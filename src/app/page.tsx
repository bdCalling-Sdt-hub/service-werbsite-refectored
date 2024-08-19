import React from "react";
import Header from "@/components/Header";
import ReviewCart from "@/components/ClientReview";
import Services from "@/components/Services";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
if (!apiUrl) throw new Error("API URL is not defined");

export default async function page() {
  return (
    <>
      <Header />
      <Services />
      <section className="lg:px-[150px] lg:py-[30px] px-2 py-4 pb-[156px] bg-mastard-50 flex flex-col items-center">
        <h2 className="uppercase font-semibold text-5xl">Client Review</h2>
        <p className="font-Montserrat pt-4">
          Best Affordable services Provider
        </p>
        {/* <div className="grid lg:grid-cols-3 2xl:grid-cols-4 gap-6 mt-12">
          {reviewsWithProvider.map((review) => (
            <ReviewCart
              key={review._id.toString()}
              businessName={review.provider.businessName}
              review={review.review}
              image={review.userId.image}
              name={review.userId.name}
              address={review.userId.address}
              date={review.createdAt.toString().slice(0, 10)}
            />
          ))}
        </div> */}
      </section>
    </>
  );
}
